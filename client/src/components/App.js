import React, { Component } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Poll from "./pages/Poll.js";
import Profile from './pages/Profile.js';
import LandingPage from "./pages/LandingPage.js";

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

class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
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
            <NotFound default />
            <Skeleton path="/skeleton" />
          </Router>

      </>
    );
  }
}

export default App;
