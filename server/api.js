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
const aniID = '600243bf1f3776002240d3ec'

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

router.get("/poll/delete", (req, res) => {
  if (!(req.query.admin || req.user)) {
    return res.status(208).send({});
  }
  if(!req.query.id){
    return res.status(208).send("No id provided");
  }
  console.log("POLL DELETE")
  const user_id = req?.user?._id || aniID
  const poll_id = req.query.id
  Poll.deleteOne({_id:poll_id, owner:user_id}, function (err) {
    if(err){
      return res.status(404).send(err);
    }
    return res.send("Deleted")
  });

})

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/poll", (req, res) => {
  if (!(req.query.admin || req.user)) {
    return res.send({});
  }
  const user_id = req?.user?._id || aniID
  console.log("GOT POLL", user_id)
  Poll.findOneAndUpdate({_id:req.query.id},{ $addToSet: user_id } ,{new: true}, (err, doc)=>{
    if(doc){
      res.send(doc)
      if(req.user && req.user._id != doc.owner ){
        const time = Math.floor(Date.now()/1000)
        User.findOneAndUpdate({_id: user_id}, { $addToSet: doc._id }, (err, doc)=>{})
      }
    }
    else{
      res.status(404).send("Not Found")
    }
  })
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
    Poll.findOneAndUpdate({_id:req.body.id}, req.body, {new: true}, (err, doc)=>{
      if(doc){
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
      _id: id
    }
    Poll.create(poll, function(err, doc) {
      if(err){
        console.error(err);
      }
      // console.log(doc)
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
  res.send(poll)
});

router.post("/poll/addOption", async (req, res) => {
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
  if(!poll){
    return res.status(404).send("Not Found")
  }
  console.log(option, user_id)
  poll.options.push({
    text: option,
    adder: user_id
  })
  await poll.save()
  res.send(poll);
});

router.post("/edit/icon", async (req, res) => {
});

router.post("/edit/username", async (req, res) => {
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
          name: doc.displayName
      })
    }
    else{
      res.status(404).send("Not Found")
    }
  })
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
