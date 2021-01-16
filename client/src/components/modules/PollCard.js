import React, { Component } from "react";
import Poll from "../pages/Poll.js";

import "./PollCard.css";
import "../../utilities.css";
import { get, post } from "../../utilities.js";

/** 
 * Proptypes
 * @param {string} _id
 * @param {number} last_visited
*/

class PollCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poll: {},
        };
    }

    componentDidMount() {
        get('/api/poll', {id: this.props._id}).then((pollObj) => {
            this.setState({
                poll: pollObj,
            });
        });
    }

    render() {
        let poll = this.state.poll;
        const infoStyle = {
            color: "gray",
            fontSize: "x-small",
            padding: "0px",
            margin: "0px"
        };
        let statusTag = poll.open ? 
            (<div className="PollCard-tag" style={{backgroundColor: "#bbd059ff"}} >open</div>) : 
            (<div className="PollCard-tag" style={{backgroundColor: "#e06666ff"}} >closed</div>);
        return (
            <div className="PollCard-container">
            <div className="PollCard-namebanner u-textCenter">@{poll.ownerID}</div>
            <div className="PollCard-body">
                {statusTag}
                <p>{poll.question}</p>
                <p className="u-textRight" style={infoStyle} >{poll.votes.length} votes</p>
                <p className="u-textRight" style={infoStyle} >{poll.options.length} options</p>
            </div>
            </div>
        )
    }
}

export default PollCard;
