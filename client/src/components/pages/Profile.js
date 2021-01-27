import React, { Component } from "react";
import Grid from "../modules/Grid.js";
import Modal from "../modules/Modal.js";

import "../App.css";
import "./Profile.css";
import "./Poll.css";
import { get, post } from "../../utilities.js";
import "../../utilities.css";

/*
    props:
    this.props.userId
    this.props.tagColors
    this.props.tagIcons
*/

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                myPolls: [],
                sharedPolls: [],
                picture_link: "/images/pfp/defaultpfp.svg",
                border_color: "#82CCB5",
            },
            show_create: false,
            view: sessionStorage.getItem("view") || "my polls", // either "my polls" or "shared with me"
        }
    }

    componentDidMount() {
        // get('/api/user', {id: this.props.userId})
        get('/api/user/self', {}).then((user) => {
            //console.log("USER", user)
            this.setState({
                user: user,
            });
        });
    }

    viewMyPolls = () => {
        this.setState({
            view: "my polls",
        });
        sessionStorage.setItem("view", "my polls");
    }

    viewShared = () => {
        this.setState({
            view: "shared with me",
        });
        sessionStorage.setItem("view", "shared with me");
    }

    createPoll = (event) =>
    {
        this.setState({show_create: true});
    }

    closeCreator = (event) =>
    {
        this.setState({show_create: false});
    }

    addNewPoll = (question, tags) =>
    {
        return post('/api/poll', {question: question, tags: tags});
    }

    render() 
    {

        if (Object.keys(this.state.user).length === 0)
        {
            return <div className="Poll-delete"> Please login to continue. </div>;
        }
        else
        {
            if (!this.state.show_create)
            {
                //console.log("PICTURE", this.state.user.picture_link)
                const pfpborder = {
                    border: this.state.user.border_color + " 2px dashed",
                };
                return (
                    <div className="App-container">
                    <div className="Profile-container">
                        <div className="Profile-sidebar">
                            <img className="Profile-pfp"
                                    src={this.state.user.picture_link} alt="bee"
                                    style={pfpborder}
                                    width="120px" height="120px" />
                            <h2 className="Profile-displayname">{this.state.user.displayName}</h2>
                            <p className="Profile-username">{this.state.user.userTag}</p>
                            <div className="Profile-sidebuttons u-flexColumn">
                                <div className="Profile-subTop">
                                    <div className="Profile-option u-morepadding u-pointer" onClick={this.viewMyPolls} >my polls</div>
                                    <div className="Profile-option u-morepadding u-pointer" onClick={this.viewShared} >shared with me</div>
                                </div>
                                <div className="Profile-subBot">
                                    <button
                                        type="submit"
                                        value="Create Poll"
                                        onClick={this.createPoll}
                                        className="Profile-button u-pointer"> + create a poll </button>
                                    <button
                                        type="submit"
                                        value="Edit Profile"
                                        onClick={() => {window.location.href = "/profile/edit";}}
                                        className="Profile-button u-pointer"> &nbsp;&nbsp;&nbsp;edit profile&nbsp;&nbsp;&nbsp; </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="Profile-view">  {this.state.view}</h2>
                            <Grid tagColors={this.props.tagColors} tagIcons={this.props.tagIcons} user={this.state.user} view={this.state.view} />
                        </div>
                    </div>
                    </div>
                    );
            }
            else
            {
                return <Modal tagColors={this.props.tagColors} addNewPoll={this.addNewPoll} show={this.state.show_create} closeCreator={this.closeCreator}/>;
            }
        }   
    }
}

export default Profile;
