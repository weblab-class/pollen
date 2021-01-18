import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "708938922173-9p5lthpd7oftf05k6ocmjibea819ra8c.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container">

        <div className="NavBar-linkContainer u-inlineBlock">
          {/* <Link to="/chat/" className="NavBar-link">
            Chat
          </Link> */}
          {this.props.userId ? (
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
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
        <div className="NavBar-title u-inlineBlock">
          <Link to="/" className="NavBar-link">
            pollen
          </Link>
        </div>
        <div className="NavBar-linkContainer u-inlineBlock">
            {/* <Link to="/" className="NavBar-link">
              Home
            </Link> */}
            {this.props.userId && (
              <Link to={"/profile/"} className="NavBar-link">
                profile
              </Link>
            )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
