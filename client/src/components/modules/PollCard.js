import React, { Component } from "react";
import Poll from "../pages/Poll.js";

import "./PollCard.css";
import "../../utilities.css";

/** 
 * Proptypes
 * @param {string} 
*/

class PollCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="PollCard-container">
                <div className="PollCard-namebanner u-textCenter">{this.props.creator_name}</div>
                <div>
                    <p>{this.props.question}</p>
                    <p className="u-textRight">{this.props.votes.length} votes</p>
                    <p className="u-textRight">{this.props.votes.length} people</p>
                </div>
            </div>
        )
    }
}

export default PollCard;
