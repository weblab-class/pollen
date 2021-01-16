import React, { Component } from "react";
import { render } from "react-dom";
import PollCard from "../modules/PollCard.js";

import "./Grid.css";
import "../../utilities.css";

/**
 * Proptypes
 * @param {object} user
 * @param {string} view
*/

class Grid extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     polls: [
        //         {_id: 1,
        //         question: "Am I a Bee?????", // string
        //         options: [{_id: 1, content: "yes"}, {_id: 2, content: "no"}, {_id:3, content: "maybe so"}],
        //         ownerID: "alicethebee",
        //         tags: ["existential"],
        //         voters: [{user: "alicethebee", votes:[1, 2, 3]},
        //                 {user: "emilythebee", votes:[1]},
        //                 {user: "anithebee", votes:[3]},
        //                 {user: "ryanthebee", votes:[1, 3]},
        //                 {user: "evethebee", votes:[]},
        //                 {user: "ronthebee", votes:[1]}], isOpen: true},
        //         {_id: 2,
        //         question: "Why are we alive?", // string
        //         options: [{_id: 1, content: "just to suffer"}, {_id: 2, content: "idk man"}, {_id: 3, content: "you're actually dead"}],
        //         ownerID: "bobthebee",
        //         voters: [{user: "alicethebee", votes:[1, 2, 3]},
        //                 {user: "emilythebee", votes:[1]},
        //                 {user: "anithebee", votes:[3]},
        //                 {user: "ryanthebee", votes:[1, 3]}], isOpen: false},
        //     ],
        // };
    }

    render() {
        const user = this.props.user;
        console.log(user);
        let pollsList = null;
        const hasPolls = user.myPolls.length !== 0;
        if (hasPolls) {
            pollsList = []
            for(let index in user.myPolls){
              const pollObj = user.myPolls[index]
              pollsList.push(
                <PollCard
                  _id={pollObj._id}
                  last_visited={pollObj.last_visited}
                  key={index}/>)
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
