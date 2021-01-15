import React, { Component } from "react";
import { render } from "react-dom";
import PollCard from "../modules/PollCard.js";

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls: [],
        };
    }

    render() {
        let pollsList = null;
        const hasPolls = this.state.polls.length !== 0;
        if (hasPolls) {
            pollsList = this.state.polls.map((pollObj) => (
                <PollCard />
            ));
        } else {
            pollsList = <div>No polls yet! Why not create one?</div>
        }
        return (
            <div className="Grid-container">{pollsList}</div>
        )
    }
}

