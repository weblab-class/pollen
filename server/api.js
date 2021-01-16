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

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/poll", (req, res) => {
  if (!(req.body.admin || req.user)) {
    return res.send({});
  }
  Poll.findOne({_id:req.body.id}, (err, doc)=>{
    console.log(doc)
    if(doc){
      res.send(doc)
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
    const poll = {
      question: req.body.question,
      description: req.body.description,
      options: req.body.options,
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
    console.log(myPoll)
    User.findOneAndUpdate({_id: user_id}, { $push: {myPolls:myPoll} }, (err, doc)=>{
      if(err){
        console.error(err);
      }
    })

  }
})

router.post("/vote", async (req, res) => {
  if (!(req.body.admin || req.user)) {
    return res.send({});
  }
  if(!req.body.option){
    return res.send("No Option provided");
  }
  const user_id = req?.user?._id || aniID
  const option = req.body.option
  console.log(option)
  const poll = await Poll.findOne({_id:req.body.id})
  if(!poll){
    return res.status(404).send("Not Found")
  }
  console.log("BEFORE", poll)
  if(poll.votes.has(user_id)){
    const old_value = poll.votes.get(user_id)
    if(old_value.includes(option)){
      return res.send("Already voted for that")
    }
    old_value.append(option)
    poll.votes.set(user_id, old_value)
  }
  else{
    poll.votes.set(user_id, [option])
  }
  await poll.save()
  res.send(poll);
});

router.post("/addOption", (req, res) => {
  if (!req.user) {
    return res.send({});
  }

  res.send({});
});

// debug only
router.get("/user", (req, res) => {
  if (!(req.body.admin || req.user)) {
    return res.send({});
  }
  User.findOne({_id:req.body.id}, (err, doc)=>{
    if(doc){
      res.send(doc)
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
