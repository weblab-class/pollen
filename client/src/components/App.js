import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Poll from "./pages/Poll.js";
import Profile from './pages/Profile.js';
import EditProfile from './pages/EditProfile.js';
import LandingPage from "./pages/LandingPage.js";
import HowTo from "./pages/HowTo.js";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */

const tagColors = {
  "food": "#cee079ff",
  "travel": "#ea9999ff",
  "games": "#9fbde8ff",
  "relationships": "#cfa7d6ff",
  "other": "#da9fc5ff"
};

const beeIcons = [
  "/images/defaultpfp.svg",
  "/images/pfp2.svg",
  "/images/pfp3.svg",
  "/images/pfp4.svg",
  "/images/pfp5.svg",
  "/images/pfp6.svg",
  "/images/bee_family.svg",
  "/images/bee_food.svg",
  "/images/bee_games.svg",
  "/images/bee_random.svg",
  "/images/bee_title.svg",
  "/images/bee_trav.svg",
];

class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/user/self").then((user) => {
      if (user._id) {
        console.log(user._id)
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken}).then((user) => {
      console.log("Posted to login, response:", user)

      this.setState({ userId: user._id });

      console.log("USERID",this.state.userId)

      window.location.href = '/profile'
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    window.location.href = '/'
    post("/api/logout");
  };

  render() {
    return (
      <>
        <NavBar
          userId={this.state.userId}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
          <Router>
            <LandingPage path="/" handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
            <Poll tagColors={tagColors} userId={this.state.userId} path="/poll/:_id"/>
            <Profile tagColors={tagColors} userId={this.state.userId} path="/profile"/>
            <EditProfile beeIcons={beeIcons} userId={this.state.userId} path="/profile/edit" />
            <HowTo path="/welcome" />
            <NotFound default />
            {/* <Skeleton path="/skeleton" /> */}
          </Router>

      </>
    );
  }
}

export default App;
