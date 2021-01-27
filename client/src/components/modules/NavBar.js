import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import ShareButton from "./ShareButton.js";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "372400085928-8o463krp4me6mghktgvdn782gneprseo.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const url_path = window.location.pathname;
    // if(url_path == '/' || url_path == '/welcome'){}
    // else{
    //   if(!(this.props.userId || sessionStorage.getItem("LoggedIn") === "true")){
    //     this.props.handleLogin(url_path)
    //   }
    // }

    return (
      <nav className="NavBar-container">

          <Link to="/" className="NavBar-link NavBar-title">
            pollen
          </Link>

          {this.props.userId && (
            <Link to={"/profile/"} className="NavBar-link">
              profile
            </Link>
          )}

        <div className="NavBar-share">
          {/* { window.location.pathname.startsWith("/poll") && (
                <ShareButton href={window.location.href} >
                </ShareButton>
          )} */}
        </div>

        <div className="NavBar-login">
          {/* <Link to="/chat/" className="NavBar-link">
            Chat
          </Link> */}
          { this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="login"
              onSuccess={this.props.handleLogin(url_path)}
              onFailure={console.log}
              className="NavBar-link NavBar-login"
            />
          )}



        </div>

      </nav>
    );
  }
}

export default NavBar;
