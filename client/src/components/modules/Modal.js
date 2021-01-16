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

      this.state = {
          question: "",
      };
  }

  
  handleQuestionChange = (event) =>
  {
      this.setState({
          question: event.target.value,
      });
  };

  handleTagsChange = (event) =>
  {
    this.setState({
        question: event.target.value,
    });
  }

  addPoll = (poll) =>
  {
    
  };

  handleSubmit = (event) =>
  {
    event.preventDefault();
    this.addPoll(this.state.question);
    this.setState({
        question: "",
    });   
  }

  render() 
  {
    return (
        <>
            <div className="u-flex Modal-box">
                <div>
                    <input
                        type="text"
                        placeholder="your question..."
                        value={this.state.question}
                        onChange={this.handleQuestionChange}
                        className="Modal-input"
                    />   
                </div>
                <div> 
                    <button
                        type="submit"
                        value="Add New Option"
                        onClick={this.handleSubmit}
                        className="Modal-submit u-pointer"
                    > create a poll </button>
                </div>
            </div>

            <div className = "u-flex Modal-box">
                <button className="Modal-close" onClick={this.props.closeCreator}>Close</button>
            </div>
        </>
      );
  }
}

export default Modal;
