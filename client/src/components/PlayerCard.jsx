import React from  'react';
import "../styles/PlayerCard.css"
import {countryFlagMap} from '../constants/CountryFlags'

const PlayerCard = ({ name, position, club, league, index, country}) => {
  const bgcolor = index % 2 === 0 ? '#dccafa' : 'white';
  const url = countryFlagMap[country];
  return ( <>
    <div className = "player-container" style={{ backgroundColor: bgcolor }}>
      <img style = {{width: "6%", height: "5vh", marginLeft: "2%"}} src="https://static.vecteezy.com/system/resources/previews/001/204/345/original/shield-png.png" alt="Player" />
      <div className = "content-box">
        <div className = "name-position-container">
          <h1 className = "name">{name}</h1>
          <h1 className = "position">{position}</h1>
        </div>
        <div className = "flag-holder">
          <img className = "flag" src= {url} alt={`Flag of ${country}`}/>
        </div>
        <h1 className = "club">{club}</h1>
        <h1 className = "league">{league}</h1>
      </div>
    </div>


    </>);
};

export default PlayerCard;
