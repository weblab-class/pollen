import React, { Component } from "react";
import "./Modal.css";

import ModalTag from "./ModalTag.js";

/*
    props:
    this.props.show
    this.props.closeCreator
    this.props.addNewPoll
    this.props.tagColors

*/
class Modal extends Component
{
  constructor(props)
  {
      super(props);

      let tag_checked = {};
      for (const tag in this.props.tagColors)
      {
          tag_checked[tag] = false;
      }
      this.state = {
          question: "",
          tag_checked: tag_checked,
      };
  }


  handleQuestionChange = (event) =>
  {
      this.setState({
          question: event.target.value,
      });
  };

  handleTagsChange = (tagname, value) =>
  {
    let new_checked = this.state.tag_checked;
    new_checked[tagname] = value;
    this.setState({
        tag_checked: new_checked,
    });
  }

  handleSubmit = (event) =>
  {
    event.preventDefault();
    
    let checked_tags = [];
    for (const tag in this.state.tag_checked)
    {
        if (this.state.tag_checked[tag])
        {
            checked_tags.push(tag);
        }
    }

    this.props.addNewPoll(this.state.question, checked_tags)
    .then((poll)=>{
      window.location.href = '/poll/'+poll._id;
    })
    this.setState({
        question: "",
    });
  }

  render()
  {
    let tagList = [];
    let i = 0;
    for (const tag in this.props.tagColors)
    {
        tagList.push(<ModalTag key={i} 
                                tagname={tag} 
                                checked={this.state.tag_checked[tag]}
                                handleTagsChange={this.handleTagsChange}/>);
        i++;
    }

    return (
        <>
            <div className="u-flex Modal-box Modal-topbox">
                <input
                    type="text"
                    placeholder="your question..."
                    value={this.state.question}
                    onChange={this.handleQuestionChange}
                    className="Modal-input"
                    style={{borderRadius: "var(--xs)"}}
                />
            </div>
            <div className = "u-flex Modal-box">
                <div className="u-bold"> Tag your poll! </div>
                <ul className="Modal-list">
                    {tagList}
                </ul>
            </div>
            <div className = "u-flex Modal-box">
                <button
                    type="submit"
                    value="Add New Option"
                    onClick={this.handleSubmit}
                    className="Modal-submit u-pointer"
                    style={{borderRadius: "var(--xs) 0 0 var(--xs)", marginRight: "1px"}}
                > Create poll </button>
                <button 
                    className="Modal-close" 
                    onClick={this.props.closeCreator}
                    style={{borderRadius: "0 var(--xs) var(--xs) 0", marginLeft: "1px"}}
                > Close </button>
            </div>
            
        </>
      );
  }
}

export default Modal;
