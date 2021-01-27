/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const shortid = require('shortid');

// import models so we can interact with the database
const User = require("./models/user");
// debug only
const aniID = '6010e587aab4c63658c97ef3'

const Poll = require("./models/poll");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/poll/delete", async (req, res) => {
  if (!(req.query.admin || req.user)) {
    return res.status(208).send({});
  }
  if(!req.query.id){
    return res.status(208).send("No id provided");
  }
  //console.log("POLL DELETE")
  const user_id = req?.user?._id || aniID
  const poll_id = req.query.id
  const poll = await Poll.findOne({_id:poll_id})
  poll.deleted = true
  if(poll.owner == user_id){
    res.send(poll)
  }
  else{
    res.send("Hey that's not yours")
  }
  poll.save();

  let actives = socketManager.getAllConnectedUsers();
  actives = actives.map((obj) => {return obj._id; });

  for (const viewer_id of poll.viewers)
  {
    //console.log("VIEWER 1", viewer_id)
    //console.log("ACTIVES", actives)

    let activeViewer = false;
    for (const active_id of actives)
    {
      if (viewer_id == active_id)
      {
        activeViewer = true;
        break;
      }
    }
    if (activeViewer)
    {
      const dataObj = {id: user_id, poll: poll}; // id: person doing the action
      socketManager.getSocketFromUserID(viewer_id).emit("pollend", dataObj);
    }
  }
})

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/poll/quick", async (req, res) => {
  if (!(req.query.admin || req.user)) {
    return res.send({});
  }
  const poll_id = req.query?.id;
  if(!poll_id){
    return res.status(208).send("No poll id")
  }
  const poll = await Poll.findOne({_id:poll_id})
  if(!poll){
    return res.status(404).send("Poll not found")
  }
  return res.send(poll)
});

router.get("/poll", async (req, res) => {
  if (!(req.query.admin || req.user)) {
    return res.send({});
  }
  const poll_id = req.query?.id;
  if(!poll_id){
    return res.status(208).send("No poll id")
  }
  const user_id = req?.user?._id || aniID
  const time = Math.floor(Date.now()/1000)
  const poll = await Poll.findOne({_id:poll_id})
  if(!poll){
    return res.status(404).send("Poll not found")
  }
  let foundIndex = -1;
  //console.log(poll.viewers)
  for(const index in poll.viewers){
    if(poll.viewers[index] == user_id){
      foundIndex = index;
      break;
    }
  }
  if(foundIndex<0){
    poll.viewers.push(user_id)
    poll.save();
  }
  res.send(poll)

  if(user_id != poll.owner){
    const user = await User.findOne({_id:user_id});
    if(!user)
      return
    foundIndex = -1;
    for(const index in user.sharedPolls){
      if(user.sharedPolls[index]._id==poll_id){
        foundIndex = index;
        break;
      }
    }
    if(foundIndex>=0){
      user.sharedPolls[foundIndex].last_visited = time
    }
    else{
      user.sharedPolls.push({
        _id: poll_id,
        last_visited: time
      })
    }
    user.save();
  }

});

// Requires higher permissions to edit
// Can only be modified by owner
router.post("/poll", (req, res) => {
  if (!(req.body.admin || req.user)) {
    return res.send({});
  }
  // Ani's id when admin is true, good for postman
  const user_id = req?.user?._id || aniID
  const time = Math.floor(Date.now()/1000)
  // if id was provided try to update
  if(req.body.id){
    const is_admin = req.body.admin
    delete req.body.admin
    req.body.last_edited = (Date.now())/1000
    req.body.last_edited_by = user_id
    if(req.body.deleted){
      delete req.body.deleted;
    }
    Poll.findOneAndUpdate({_id:req.body.id}, req.body, {new: true}, (err, doc)=>{
      if(doc)
      {
        if (!doc.open)
        {
          let poll = doc;
          let actives = socketManager.getAllConnectedUsers();
          actives = actives.map((obj) => {return obj._id; });
        
          for (const viewer_id of poll.viewers)
          {        
            let activeViewer = false;
            for (const active_id of actives)
            {
              if (viewer_id == active_id)
              {
                activeViewer = true;
                break;
              }
            }
            if (activeViewer)
            {
              const dataObj = {id: user_id, poll: poll}; // id: person doing the action
              socketManager.getSocketFromUserID(viewer_id).emit("pollend", dataObj);
            }
          }
        }
        res.send(doc)
      }
      else{
        res.status(404).send("Not Found")
      }
    })
  }
  else{
    const id = shortid.generate()
    for(index in req.body.options){
      req.body.options[index].adder = user_id
    }
    const poll = {
      question: req.body.question || 'Untitled Question',
      description: req.body.description || '',
      options: req.body.options || [],
      votes: new Map(),
      owner: user_id,
      tags: req.body.tags || [],
      open: true,
      addable: req.body.addable || false,
      time_created: time,
      last_edited: time,
      last_edited_by: user_id,
      deleted: false,

      _id: id
    }

    Poll.create(poll, function(err, doc) {
      if(err){
        console.error(err);
      }
      // //console.log(doc)
      res.send(doc)
    })
    const myPoll = {_id:id, last_visited:time}
    User.findOneAndUpdate({_id: user_id}, { $push: {myPolls:myPoll} }, (err, doc)=>{
      if(err){
        console.error(err);
      }
    })

  }
})

router.post("/poll/vote", async (req, res) => {
  if (!(req.body.admin || req.user)) {
    return res.send({});
  }
  if(!req.body.option_id){
    return res.send("No Option provided");
  }
  if(!req.body.id){
    return res.send("No ID provided");
  }
  const user_id = req?.user?._id || aniID
  const option_id = req.body.option_id

  const poll = await Poll.findOne({_id:req.body.id})
  if(!poll){
    return res.status(404).send("Not Found")
  }
  if(poll.votes.has(user_id)){
    const old_value = poll.votes.get(user_id)
    let found = false
    for(const cur_option of poll.options){
      if(cur_option._id == option_id){
        found = true
        break
      }
    }
    if(!found){
      return res.status(404).send("Not an option")
    }

    if(old_value.includes(option_id)){
      return res.status(208).send("Already voted for that")
    }
    const new_arr = []
    for(item of old_value)
      new_arr.push(item)
    new_arr.push(option_id)
    poll.votes.set(user_id, new_arr)
  }
  else{
    poll.votes.set(user_id, [option_id])
  }
  await poll.save()

  let actives = socketManager.getAllConnectedUsers();
  actives = actives.map((obj) => {return obj._id; });

  for (const viewer_id of poll.viewers)
  {
    //console.log("VIEWER 1", viewer_id)
    //console.log("ACTIVES", actives)

    let activeViewer = false;
    for (const active_id of actives)
    {
      if (viewer_id == active_id)
      {
        activeViewer = true;
        break;
      }
    }
    if (activeViewer)
    {
      const dataObj = {id: user_id, poll: poll}; // id: person doing the action
      //console.log("POSTED VOTE", poll)
      socketManager.getSocketFromUserID(viewer_id).emit("message", dataObj);
    }
  }

  res.send(poll)
});

router.post("/poll/unvote", async (req, res) => {
  if (!(req.body.admin || req.user)) {
    return res.send({});
  }
  if(!req.body.option_id){
    return res.send("No Option provided");
  }
  if(!req.body.id){
    return res.send("No ID provided");
  }
  const user_id = req?.user?._id || aniID
  const option_id = req.body.option_id

  const poll = await Poll.findOne({_id:req.body.id})
  if(!poll){
    return res.status(404).send("Not Found")
  }
  if(poll.votes.has(user_id)){
    let found = false
    for(const cur_option of poll.options){
      if(cur_option._id == option_id){
        found = true
        break
      }
    }

    const user_votes = poll.votes.get(user_id)

    const new_arr = []
    for(item of user_votes)
      if(item!==option_id)
        new_arr.push(item)

    if(new_arr.length == user_votes.length){
      return res.status(208).send("Did not vote for that yet")
    }

    poll.votes.set(user_id, new_arr)
  }
  else{
    res.status(404).send("User not found")
  }
  await poll.save()

  let actives = socketManager.getAllConnectedUsers();
  actives = actives.map((obj) => {return obj._id; });

  for (const viewer_id of poll.viewers)
  {
    //console.log("VIEWER 1", viewer_id)
    //console.log("ACTIVES", actives)

    let activeViewer = false;
    for (const active_id of actives)
    {
      if (viewer_id == active_id)
      {
        activeViewer = true;
        break;
      }
    }
    if (activeViewer)
    {
      const dataObj = {id: user_id, poll: poll}; // id: person doing the action
      socketManager.getSocketFromUserID(viewer_id).emit("message", dataObj);
    }
  }

  res.send(poll)
});

router.post("/poll/addOption", async (req, res) => {
  //console.log("==================================================")
  if (!(req.body.admin || req.user)) {
    return res.send({});
  }
  if(!req.body.option){
    return res.send("No Option provided");
  }
  if(!req.body.id){
    return res.send("No ID provided");
  }
  const user_id = req?.user?._id || aniID
  const option = req.body.option
  const poll = await Poll.findOne({_id:req.body.id})

  if(!poll)
  {
    return res.status(404).send("Not Found")
  }

  poll.options.push({
    text: option,
    adder: user_id
  })
  await poll.save()

  // is this right?
  let actives = socketManager.getAllConnectedUsers();
  actives = actives.map((obj) => {return obj._id; });

  for (const viewer_id of poll.viewers)
  {
    //console.log("VIEWER 1", viewer_id)
    //console.log("ACTIVES", actives)

    let activeViewer = false;
    for (const active_id of actives)
    {
      if (viewer_id == active_id)
      {
        activeViewer = true;
        break;
      }
    }
    if (activeViewer)
    {
      const dataObj = {id: user_id, poll: poll}; // id: person doing the action
      socketManager.getSocketFromUserID(viewer_id).emit("message", dataObj);
    }
  }

  res.send(poll);
});

// debug only
router.get("/user/self", (req, res) => {
  if (!(req.query.admin || req.user)) {
    return res.send({});
  }
  const user_id = req?.user?._id || aniID
  User.findOne({_id:user_id}, (err, doc)=>
  {
    if(doc){
      res.send(doc)
    }
    else{
      res.status(404).send("Not Found")
    }
  })
});

router.post("/user/self", async (req, res) => {
  if (!(req.query.admin || req.user)) {
    return res.send({});
  }
  const user_id = req?.user?._id || aniID
  const user = await User.findOneAndUpdate({_id:user_id}, req.body, {new: true})
  if(user){
    res.send(user)
  }
  else{
    res.status(404).send("Update failed")
  }
});

router.get("/user/info", (req, res) => {
  if (!(req.query.admin || req.user)) {
    return res.send({});
  }
  res.set('Cache-control', 'public, max-age=10')
  const user_id = req.query.id || aniID
  User.findOne({_id:user_id}, (err, doc)=>{
    if(doc){
      res.send({
          tag: doc.userTag,
          name: doc.displayName,
          picture_link: doc.picture_link,
          border_color: doc.border_color,
      })
    }
    else{
      res.status(404).send("Not Found")
    }
  })
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  //console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
