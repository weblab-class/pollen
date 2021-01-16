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
                {_id: 1,
                question: "Am I a Bee?????", // string
                options: [{_id: 1, content: "yes"}, {_id: 2, content: "no"}, {_id:3, content: "maybe so"}],
                ownerID: "alicethebee", 
                voters: [{user: "alicethebee", votes:[1, 2, 3]},
                        {user: "emilythebee", votes:[1]},
                        {user: "anithebee", votes:[3]},
                        {user: "ryanthebee", votes:[1, 3]},
                        {user: "evethebee", votes:[]},
                        {user: "ronthebee", votes:[1]}], isOpen: true},
                {_id: 2,
                question: "Why are we alive?", // string
                options: [{_id: 1, content: "just to suffer"}, {_id: 2, content: "idk man"}, {_id: 3, content: "you're actually dead"}],
                ownerID: "bobthebee", 
                voters: [{user: "alicethebee", votes:[1, 2, 3]},
                        {user: "emilythebee", votes:[1]},
                        {user: "anithebee", votes:[3]},
                        {user: "ryanthebee", votes:[1, 3]}], isOpen: false},
                {_id: 2,
                question: "what color is my shirt", // string
                options: [{_id: 1, content: "red"}, {_id: 2, content: "blue"}, {_id:3, content: "yellow"}, {_id:4, content: "green"}],
                ownerID: "clairethebee", 
                voters: [], isOpen: true},
                {_id: 3,
                question: "Will you go to the prom with me? <3", // string
                options: [{_id: 1, content: "yes"}, {_id: 2, content: "no"}],
                ownerID: "dylanthebee", 
                voters: [{user: "anithebee", votes:[2]},
                        {user: "ryanthebee", votes:[1, 2]},
                        {user: "evethebee", votes:[2]},
                        {user: "ronthebee", votes:[1]}], isOpen: true},
            ],
        };
    }

    render() {
        let pollsList = null;
        const hasPolls = this.state.polls.length !== 0;
        if (hasPolls) {
            pollsList = this.state.polls.map((pollObj) => (
                <PollCard 
                    _id={pollObj._id}
                    question={pollObj.question}
                    options={pollObj.options}
                    ownerID={pollObj.ownerID}
                    voters={pollObj.voters}
                    isOpen={pollObj.isOpen}
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
