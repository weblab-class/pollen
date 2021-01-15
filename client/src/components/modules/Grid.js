import React, { Component } from "react";
import { render } from "react-dom";
import PollCard from "../modules/PollCard.js";

import "./Grid.css";
import "../../utilities.css";

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls: [
                {question: "Am I a Bee?????", // string
                options: [{_id: 1, content: "yes"}, {_id: 2, content: "no"}, {_id:3, content: "maybe so"}],
                ownerID: "alicethebee", 
                voters: [{user: "alicethebee", votes:[1, 2, 3]},
                        {user: "emilythebee", votes:[1]},
                        {user: "anithebee", votes:[3]},
                        {user: "ryanthebee", votes:[1, 3]},
                        {user: "evethebee", votes:[]},
                        {user: "ronthebee", votes:[1]}],}
            ],
        };
    }

    render() {
        let pollsList = null;
        const hasPolls = this.state.polls.length !== 0;
        if (hasPolls) {
            pollsList = this.state.polls.map((pollObj) => (
                <PollCard 
                    question={pollObj.question}
                    options={pollObj.options}
                    ownerID={pollObj.ownerID}
                    voters={pollObj.voters}
                />
            ));
        } else {
            pollsList = <div>No polls yet! Why not create one?</div>
        }
        return (
            <div className="Grid-container">{pollsList}</div>
        )
    }
}

export default Grid;
