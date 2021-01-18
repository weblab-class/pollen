import React, { Component } from "react";
import { get, post } from "../../utilities";
import "./Modal.css";
import "../../utilities.css";

/*
    props:
    this.props.tagname 
    this.props.handleTagsChange
*/
class ModalTag extends Component 
{
  constructor(props) 
  {
      super(props);
  }

  handleChange = (event) =>
  {
    const value = event.target.checked;
    this.props.handleTagsChange(this.props.tagname, value);
  }

  render() 
  {
      return (
        <li className="Modal-Tag">
            <input type="checkbox"
                checked={this.props.checked}
                onChange={this.handleChange}/>
            <span>{this.props.tagname}</span>
        </li>
      );
  }
}

export default ModalTag;
