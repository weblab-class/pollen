import React, { Component } from "react";
import "./Modal.css";

/*
    props:
    this.props.show
    this.props.closeCreator

*/
class Modal extends Component 
{
  constructor(props) 
  {
      super(props);
  }


  handleSubmit = (event) =>
  {

  }
  
  render() 
  {
    return (
        <div className="u-flex">
            <input
                type="text"
                placeholder={this.props.default}
                value={this.state.content}
                onChange={this.handleChange}
                className="NewOption-input"
            />    
            <button
                type="submit"
                value="Add New Option"
                onClick={this.handleSubmit}
                className="Modal-submit u-pointer"
            > create a poll </button>
            <button onClick={this.props.closeCreator}>Close</button>
        </div>
      );
  }
}

export default Modal;
