import React, { Component } from "react";
import { render } from "react-dom";
import PollCard from "../modules/PollCard.js";

import "./Grid.css";
import "../../utilities.css";

/**
 * Proptypes
 * @param {object} user
 * @param {string} view
 * this.props.tagColors
 * this.props.tagIcons
*/

class Grid extends Component {
    constructor(props) {
        super(props);
    }

    // user schema:
    /* myPolls: [{
        _id: String,
        last_visited: Number
      }],
      sharedPolls: [{
        _id: String,
        last_visited: Number
      }], */

    render() {
        const user = this.props.user;
        let pollsList = null;
        console.log(user);
        const userPolls = (this.props.view === "my polls") ? (user?.myPolls || []) : (user?.sharedPolls || [])
        // const userPolls = user?.myPolls || [];
        const hasPolls = userPolls.length !== 0;
        if (hasPolls) {
            pollsList = []
            for(let index in userPolls){
              const pollObj = userPolls[index]
              pollsList.push(
                <PollCard
                  tagColors={this.props.tagColors}
                  tagIcons={this.props.tagIcons}
                  _id={pollObj._id}
                  last_visited={pollObj.last_visited}
                  key={pollObj._id}/>)
                console.log(pollsList)
            }

        } else {
            pollsList = <div>No polls yet! Why not create one?</div>
        }
        return (
            <div className="Grid-container">{pollsList}</div>
        )
    }
}

export default Grid;
