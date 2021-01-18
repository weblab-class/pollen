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
        <button type="button" class="share-button" onclick={()=>{
          alert("Send this link to your friends " + this.state.href);
        }}> + Share </button>
      );
  }
}

export default ShareButton;
