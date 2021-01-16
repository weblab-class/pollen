import React, { Component } from "react";
import Poll from "../pages/Poll.js";

import "./PollCard.css";
import "../../utilities.css";

/** 
 * Proptypes
 * @param {string} pollId (fetches info from api using this id?)
*/

class PollCard extends Component {
    constructor(props) {
        super(props);
        // this.state = { // for now, until we can fetch from backend
        //     question: "Am I a Bee?????", // string
        //     options: [{_id: 1, content: "yes"}, {_id: 2, content: "no"}, {_id:3, content: "maybe so"}],
        //     ownerID: "alicethebee", 
        //     voters: [{user: "alicethebee", votes:[1, 2, 3]},
        //               {user: "emilythebee", votes:[1]},
        //               {user: "anithebee", votes:[3]},
        //               {user: "ryanthebee", votes:[1, 3]},
        //               {user: "evethebee", votes:[]},
        //               {user: "ronthebee", votes:[1]}],
        //   };
    }

    componentDidMount() {
        // fix syntax once backend is good
        /*get("/api/poll", { pollID: this.props._id }).then((pollObj) => {
        this.setState({
            question: pollObj.question,
            options: pollObj.options,
            ownerID: pollObj.ownerID,
            // and MORE COMING SOON!
        });
        });*/
    }

    render() {
        const infoStyle = {
            color: "gray",
            fontSize: "x-small",
            padding: "0px"
        };
        return (
            <div className="PollCard-container">
            <div className="PollCard-namebanner u-textCenter">@{this.props.ownerID}</div>
            <div className="PollCard-body">
                <p>{this.props.question}</p>
                <p className="u-textRight" style={infoStyle} >{this.props.voters.length} votes</p>
                <p className="u-textRight" style={infoStyle} >{this.props.options.length} options</p>
            </div>
            </div>
        )
    }
}

export default PollCard;
