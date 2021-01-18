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
            poll: {
                open: true,
                question: "",
                votes: [],
                options: [],
                tags: [],
            },
            owner: {
                name: "",
            }
        };
    }

    componentDidMount() {
        get('/api/poll', {id: this.props._id}).then((pollObj) => {
            this.setState({
                poll: pollObj,
            });
            return get('/api/user/info', {id: pollObj.owner});
        }).then((userObj) => {
            this.setState({
                owner: userObj,
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
        let tagsList = null;
        if (poll.tags.length !== 0) {
            tagsList = poll.tags.map((tag) => (
                <div className="PollCard-tag" style={{backgroundColor: "#cfa7d6ff"}} >{tag}</div>
            ));
        }
        const pollLink = '/poll/' + poll._id;
        return (
            // <a href={pollLink}>
              <div className="PollCard-container">
                <div className="PollCard-namebanner u-textCenter">{this.state.owner.name}</div>
                <div className="PollCard-body">
                    {statusTag}
                    <p>{poll.question}</p>
                    {tagsList}
                    <p className="u-textRight" style={infoStyle} >{poll.votes.length} votes</p>
                    <p className="u-textRight" style={infoStyle} >{poll.options.length} options</p>
                </div>
              </div>
            // </a>
        )
    }
}

export default PollCard;
