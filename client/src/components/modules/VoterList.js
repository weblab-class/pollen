import React, { Component } from "react";
import VoterCard from "./VoterCard.js";

import "./VoterList.css";

/*
    props:
    this.props.user_votes
*/


class VoterList extends Component
{
  constructor(props)
  {
      super(props);
  }

  render()
  {
      let voterCardList = [];
      //console.log("VOTES", this.props.votes)
      //console.log("Options", this.props.options)
      //console.log("User Info", this.props.user_info)
      const optionsMap = new Map()
      let index = 0
      for(let option of this.props.options){
        option.index = index
        optionsMap.set(option._id, option)
        index+=1
      }
      //console.log("Options MAP", optionsMap)
      //console.log("Options MAP Size", optionsMap.size)


      let i = 0;
      if(optionsMap.size>0)
        for (const user_id in this.props.votes)
        {
          const userinfo = this.props.user_info[user_id]
          const usertag = userinfo?.tag || '@';
          const userpfp = userinfo?.picture_link;
          //console.log("PFP", userpfp)
          const userborder = userinfo?.border_color;
          let votes = this.props.votes[user_id].sort((optA, optB)=>{
            return optionsMap.get(optA).index - optionsMap.get(optB).index;
          })
          votes = votes.map(opt => optionsMap.get(opt).text);
          voterCardList.push((<VoterCard key={i} pfp={userpfp} border={userborder} user={usertag} votes={votes} />));
          i++;
        }

      return (
        <div className="VoterList-container">
            <h3 className="u-textCenter"> Who's Voting? </h3>
            {voterCardList}
        </div>
        );
  }
}

export default VoterList;
