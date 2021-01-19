import React, { Component } from "react";

import "./ShareButton.css";

/*
    props:
    this.props.content
*/
class ShareButton extends Component
{
  constructor(props)
  {
      super(props);
      this.state = {
        href : props.href
      }
  }

  render()
  {
      return (
        <button type="button" className="share-button" onClick={() => {alert("NEED A MODAL HERE")}}> + Share </button>
      );
  }
}

export default ShareButton;
