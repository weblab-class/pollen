import React, { Component } from "react";
import { render } from "react-dom";
import PollCard from "../modules/PollCard.js";

import "./Grid.css";
import "../../utilities.css";
import "../pages/Profile.css";

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

    render() {
        const deleted_polls_str = localStorage.getItem('deletedPolls');
        const deleted_polls = deleted_polls_str ? JSON.parse(deleted_polls_str) : {}

        const user = this.props.user;
        let pollsList = null;
        //console.log(user);
        const userPolls = (this.props.view === "my polls") ? (user?.myPolls || []) : (user?.sharedPolls || [])
        // const userPolls = user?.myPolls || [];
        const hasPolls = userPolls.length !== 0;
        let hasexistingpolls = false;
        if (hasPolls) {
            pollsList = [];
            for(let index in userPolls)
            {
              const pollObj = userPolls[index];
              if(pollObj._id in deleted_polls)
              {
                continue;
              }
              else
              {
                  hasexistingpolls = true;
                    pollsList.push(
                    <PollCard
                      tagColors={this.props.tagColors}
                      tagIcons={this.props.tagIcons}
                      _id={pollObj._id}
                      last_visited={pollObj.last_visited}
                      key={pollObj._id}/>);
              }
            }
        } 

        if (!hasexistingpolls)
        {
            pollsList = (this.props.view === "my polls") ?
              (<div>No polls yet! Why not create one?</div>) :
              (<div>No shared polls yet! <em>pollen</em> is better when you buzz with friends ; )</div>)
        }
        return (
            <div className="Grid-container">{pollsList}</div>
        );
    }
}

export default Grid;
