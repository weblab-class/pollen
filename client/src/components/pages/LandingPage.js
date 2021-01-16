import React, { Component } from "react";
import "./LandingPage.css";

import background from "../modules/landing.svg";
import title from "../modules/title_img.svg"

/*
    props: none
*/

class LandingPage extends Component 
{
  constructor(props) 
  {
      super(props);
  }

  render() 
  {
      return (
        <>
            <div className="LandingPage-container u-textCenter" style={{ 
                backgroundImage: `url(${background})` 
            }}>
            <img className="title-image" src={title} alt = "pollen" />
            <button type="submit" value="start buzzin'" className="LandingPage-button u-pointer"> start buzzin' </button>           </div> 
        </>
      );
  }
}

export default LandingPage;
