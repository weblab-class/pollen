import React, { Component } from "react";
import "./LandingPage.css";

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
                backgroundImage: `url("/images/landing.svg")`
            }}>
                <img className="title-image" src="images/title_bee.svg" alt = "pollen" />
                <button 
                    type="submit" 
                    value="start buzzin'" 
                    onClick={() => {window.location.href = "/welcome";}}
                    className="LandingPage-button u-pointer"> 
                    start buzzin' 
                </button>           
            </div>
        </>
      );
  }
}

export default LandingPage;
