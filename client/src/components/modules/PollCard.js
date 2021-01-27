import React, { Component } from "react";
import Poll from "../pages/Poll.js";

import "./PollCard.css";
import "../../utilities.css";
import { get, post } from "../../utilities.js";
import sample from "./bee_food.svg";

/**
 * Proptypes
 * @param {string} _id
 * @param {number} last_visited
 * this.props.tagColors
 * this.props.tagIcons
*/



class PollCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poll:{
                question: "",
                options: [],
                tags: [],
                owner: "",
                open: true,
                addable: true,
                votes: {},
                _id: props._id
              },
            owner: {
                name: '',
            }
        };
    }

    componentDidMount() {
        get('/api/poll/quick', {id: this.props._id}).then((pollObj) => {
            this.setState({
                poll: pollObj,
            });
            return get('/api/user/info', {id: pollObj.owner});
        }).then((userObj) => {
            this.setState({
                owner: userObj,
            });
            const poll_owners = localStorage.getItem('pollOwners');
            const owner_set = poll_owners ? JSON.parse(poll_owners) : {};
            owner_set[this.props._id]=userObj.name;
            localStorage.setItem('pollOwners', JSON.stringify(owner_set));

        });
    }

    render() {
        let poll = this.state.poll;
        if(!poll){
          return (null);
        }
        if(poll?.deleted){
          const deleted_polls = localStorage.getItem('deletedPolls');
          const deleted_set = deleted_polls ? JSON.parse(deleted_polls) : {};
          deleted_set[this.props._id]=0;
          localStorage.setItem('deletedPolls', JSON.stringify(deleted_set));

          //console.log("LOCALSTORAGE", localStorage.getItem('deletedPolls'))
          return (null);
        }
        let ownerName = this.state.owner.name || '';
        if(ownerName.length==0){
          const poll_owners = localStorage.getItem('pollOwners');
          const owner_set = poll_owners ? JSON.parse(poll_owners) : {};
          if(this.props._id in owner_set)
            ownerName = owner_set[this.props._id]
        }


        let statusTag = poll.open ?
            (<div className="PollCard-tag" style={{backgroundColor: "#bbd059ff"}} >open</div>) :
            (<div className="PollCard-tag" style={{backgroundColor: "#e06666ff"}} >closed</div>);
        let tagsList = null;
        let cardColor = "#cfa7d6ff";
        if (poll.tags.length !== 0) {
            tagsList = poll.tags.map((tag) => (
                <div className="PollCard-tag" style={{backgroundColor: this.props.tagColors[tag]}} >{tag}</div>
            ));
            cardColor = this.props.tagColors[poll.tags[0]] // pick the first tag to be color
        }

        let numvotes = 0;
        for (const user in this.state.poll.votes)
        {
            numvotes += this.state.poll.votes[user].length;
        }

        const pollLink = '/poll/' + poll._id;

        return (
              <div className="PollCard-container"
                onClick={() => {window.location.href = "/poll/" + poll._id;}}
                style={{borderColor: cardColor}}>
                <div className="PollCard-namebanner u-textCenter" style={{backgroundColor: cardColor}}>
                    {ownerName}
                </div>
                <div className="PollCard-body">
                        {/* <div className="PollCard-picContainer">
                            <img className="Profile-pfp"
                                        src={sample} alt="bee"
                                        width="100px" height="100px" />
                        </div> */}
                    <div>
                        <div className="PollCard-status">
                            {statusTag}
                        </div>
                    </div>
                    <p className="PollCard-question">{poll.question}</p>
                    {tagsList}

                    {/* <p className="PollCard-info u-textRight" >{numvotes} votes</p>
                    <p className="PollCard-info u-textRight" >{poll.options.length} options</p> */}
                </div>
                <div className="PollCard-info" >
                    <p className="u-textRight" >{numvotes} votes</p>
                    <p className="u-textRight" >{poll.options.length} options</p>
                </div>
              </div>
        )
    }
}

export default PollCard;
