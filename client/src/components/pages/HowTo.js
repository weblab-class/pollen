import React, { Component } from "react";
// import "./HowTo.css";
import "../../utilities.css";
import "../App.css";
import "./EditProfile.css";

class HowTo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App-container">
        <br/>
        <h1 className="u-textCenter">What's all this buzz about?</h1>
        <h3 className="u-textCenter" >Welcome to <em>pollen</em>, your new beehive of casual decision-making activity! 
          From picking a movie or restaurant to brainstorming for a project, <em>pollen</em> is all 
          about propagating ideas and choices.</h3>
        <br/>
        <h2>We're all allergic to this scenario...</h2>
        <h4><i>What do you want to do?</i></h4>
        <h4><i>I don't know, what do you want to do?</i></h4>
        <h4><i>I'm fine with anything you want.</i></h4>
        <br/>
        <p>Gone are the days of joining a video call with your friends and spending 
          half an hour trying to decide which game to play. There's always some Friend A 
          with a very strong opinion, a Friend B with an even stronger opposing opinion, 
          and the rest of the group, who maybe slightly prefer Codenames but not enough 
          to risk getting caught in the Friend-A-Friend-B crossfire. Someone sends a 
          Messenger poll, which everyone but Friend A and B ignores because they don't 
          even care what game they choose, they just want to do something.</p>
        <br/>
        <p>Decision-making dread is the bane of your friend group's virtual hangouts, 
          and you know it. We made <em>pollen</em> to quell those qualms. By turning polling 
          into its own enjoyable mini-activity rather than a necessary evil every time 
          your friends want to watch a movie together, we're intending to make indecision obsolete.</p>
        <br/>
        <h2>Features</h2>
        <ul>
          <li>Ability to vote, and unvote, for multiple options</li>
          <li>Ability to add your own option if you're not satisfied with the available choices</li>
          <li>Ability to see everyone's votes, because anonymity and secrecy have no place in casual settings</li>
          <li>At-a-glance grid view of all your polls, with information about their tags and number of votes and options</li>
          <li>Ability to add one or more tags to categorize your poll (e.g. food, travel, games)</li>
          <li>Color-coordination by tag</li>
          <li>Irresistably cute, bee-themed interface</li>
        </ul>
        <br/>
        <h2>How to Use</h2>
        <p>You'll need a Google account to use <em>pollen</em>. Once you're logged in, 
        you can either vote on poll links from your friends or create your own! 
        See polls you've viewed and voted on in the "shared with me" profile view!</p>
        <br/>
        <h2>Ready to get pollin' with <em>pollen</em>?</h2>
        <p>Login with your Google account in the top right corner!</p>
        <br/>
      </div>
    );
  }
}

export default HowTo;
