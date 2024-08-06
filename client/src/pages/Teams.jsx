import React, { useState, useEffect, useCallback } from  'react';
import Dropdown from '../components/Dropdown';
import "../styles/Teams.css";
import { countries } from "../constants/Countries";
import {useAuth} from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from  'axios';
import PlayerCard from "../components/PlayerCard"
import MiniLoading from '../components/MiniLoading'
import Grass from '../assets/grass.jpg'

function Teams() {

  const api_mode = true //TRUE COSTS MONEY

  const accessToken = useAuth();
  const options = countries;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [topClubs, setTopClubs] = useState([]);
  const [playersIsLoading, setPlayersIsLoading] = useState(false);
  const [clubsIsLoading, setClubsIsLoading] = useState(false);


  const [isSelected, setIsSelected] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);


  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


  useEffect(() => {
    startUpFunction();
  }, [])

  useEffect(() => {
    getPlayers();
  }, [isSelected])


  const startUpFunction = async() => {
    await getCountries();
  }

  const getCountries = async() => {
    const decodedToken = jwtDecode(accessToken.accessToken);
    const UserId = decodedToken.id;

    try { 
      await axios.get(`https://world-cup-prep-tool-production.up.railway.app/Countries/${UserId}`).then((response) => {

        const countries = [];
        const dupIsSelected = [];

        for (let i = 0; i < response.data.length; i++){
          countries.push(response.data[i].name);
          dupIsSelected.push(response.data[i].selected);
        }
        setIsSelected(dupIsSelected);
        setAllCountries(countries);

      })

    } catch(error){
        console.log( 'Error fetching countries', error);
    }
  }

  const getPlayers = async() => {
    const decodedToken = jwtDecode(accessToken.accessToken);
    const UserId = decodedToken.id;
    let tempList = [];

    for(let i = 0; i < isSelected.length; i++){
      if(isSelected[i] === true){
        try {
            await axios.get(`https://world-cup-prep-tool-production.up.railway.app/players/${UserId}/${allCountries[i]}`).then((response) => {

               let countryPlayers = [];
               for(let i = 0; i < response.data.length; i++){
                  countryPlayers.push(response.data[i]);
               }
               tempList.push(countryPlayers);
            });
        } catch(error){
            console.log('Error getting players', error);
        }
      }
    }

    setAllPlayers(tempList.flat());
    
  }


  // Custom handleChange function
  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption.label);
  };

  const addCountry = async(country) => {
    if (country === ""){
      return;
    }
    setFadeOut(false)
    setPlayersIsLoading(true);
    const decodedToken = jwtDecode(accessToken.accessToken);
    const UserId = decodedToken.id;

    try { 
      await axios.post( 'https://world-cup-prep-tool-production.up.railway.app/Countries/add', {"name": country, "UserId": UserId});
    } catch(error){
        console.log('Error adding countries', error);
    }

    let incomingPlayers = [];


    if(!api_mode) {
      incomingPlayers = [
        {name: 'Mbappe', country: country, position: 'RW', club: 'Real Madrid', league: 'LaLiga'},
        {name: 'Ronaldo', country: country, position: 'LW', club: 'Al Nassr', league: 'Saudi Pro League'},
        {name: 'Messi', country: country, position: 'RW', club: 'Inter Miami', league: 'MLS'},
        {name: 'Pulisic', country: country, position: 'LW', club: 'AC Milan', league: 'Serie A'},
        {name: 'Neymar', country: country, position: 'RW', club: 'Al Hilal', league: 'Saudi Pro League'},
      ]
    } else {
      try {
        await axios.get(`https://world-cup-prep-tool-production.up.railway.app/api/${country}`).then((response) => {
          const players = response.data.players;
          for (let i = 0; i< players.length; i++) {
            const currPlayer = {name: players[i].name, country: country, position: players[i].position, club: players[i].club, league: players[i].league};
            incomingPlayers.push(currPlayer);
          }
        });
      } catch (error) {
        console.log("Error generating players", error)
      }
    }

    for (let i = 0; i < incomingPlayers.length; i++){
      try { 
        await axios.post( 'https://world-cup-prep-tool-production.up.railway.app/players/add', {
          name: incomingPlayers[i].name,
          country: incomingPlayers[i].country,
          position: incomingPlayers[i].position,
          club: incomingPlayers[i].club,
          league: incomingPlayers[i].league,
          UserId: UserId});
      } catch(error){
          console.log('Error adding players', error);
      }
    }

    await getCountries();
    setFadeOut(true);
    await delay(500)
    setPlayersIsLoading(false);
}

  const deleteCountry = async(country) => {
    await delay(0.000001);
    const decodedToken = jwtDecode(accessToken.accessToken);
    const UserId = decodedToken.id;

    // Delete Country from database
    try { 
      await axios.delete(`https://world-cup-prep-tool-production.up.railway.app/Countries/remove/${UserId}/${country}`);
    } catch(error){
        console.log('Error deleting country', error);
    } 

    // Delete Player from database
    try { 
      await axios.delete(`https://world-cup-prep-tool-production.up.railway.app/players/remove/${UserId}/${country}`);
    } catch(error){
        console.log('Error deleting country', error);
    } 

    await getCountries();
  }

  const clickCountry = async(index, country) => {
    const decodedToken = jwtDecode(accessToken.accessToken);
    const UserId = decodedToken.id;

    try {
      await axios.patch(`https://world-cup-prep-tool-production.up.railway.app/Countries/update/${UserId}/${country}`)
    } catch(error) {
      console.log("Error changing country status", error);
    }
    const dupIsSelected = [...isSelected];
    dupIsSelected[index] = !isSelected[index];
    setIsSelected(dupIsSelected);
    await delay(500);
  }

  const getTopClubs = async() => {
    setClubsIsLoading(true);
  

    let tempTopClubs = [];
    
    if(!api_mode){
      tempTopClubs = [
        {name: 'Real Madrid', league: 'LaLiga'},
        {name: 'Al Nassr', league: 'Saudi Pro League'},
        {name: 'Inter Miami', league: 'MLS'},
        {name: 'AC Milan', league: 'Serie A'},
        {name: 'Al Hilal', league: 'Saudi Pro League'},
      ]

      setTopClubs(tempTopClubs);

    } else {
        let stringPlayers = [];
        for(let i = 0; i<allPlayers.length; i++){
          stringPlayers[i] = allPlayers[i].name;
        }
        const allPlayersString = stringPlayers.join(',');
  
        try {
          await axios.get(`https://world-cup-prep-tool-production.up.railway.app/api/clubs/${allPlayersString}`).then((response) => {
          let dupClubList = [];
          const clubs = response.data.clubList;
          for(let i = 0; i<clubs.length; i++) {
            const currClub = {name:clubs[i].club, league: clubs[i].league};
            dupClubList.push(currClub);
          }

        tempTopClubs = dupClubList;
        setTopClubs(tempTopClubs);
          
          })} catch(error) {
            console.log("Error changing country status", error);
            }
    }
    setClubsIsLoading(false)
  }

  return <>

<img src={Grass} width="100vw" height="100vh" style={{zIndex: '-1', position: 'absolute', 
    width: '100vw', height: '86.6vh', filter: 'brightness(90%)', opacity: '50%'}} />

  <body className="team-body" >
    <div className = "outer-container">
      <div className = "l-container">
          <div style = {{display: "flex", flexDirection: "row", columnGap: "1vw"}}>
              <div style = {{alignContent: "center", width: "20vw", marginLeft: "3vw", marginTop: "1.5vh"}}>
                  <Dropdown options={options} onChange={handleChange} />
              </div>
            <button className = "add-button" onClick={() => addCountry(selectedCountry)}>Add</button>
          </div>
          <div className = "box">
              <h1 className = "label">Countries</h1>
              <div className = "countries-list">
                {allCountries.map((name, index) => (
                  <div key={index}>
                    <div className = "country-container" onClick = {() => clickCountry(index, allCountries[index])}>
                      <p className={!isSelected[index] ? 'text-grey' : 'reg-text'}>{name}</p>
                      <img src="https://www.svgrepo.com/show/21045/delete-button.svg" alt="delete button"
                      onClick={() => deleteCountry(name)} className="country-delete-button"/>
                    </div>
                  </div>
                ))}
              </div>
          </div>
      </div>
      
      <div className="m-container">
        <h1 className = "player-header">Players</h1>
        <div className="m-container-headers">
            <h1 style={{marginLeft: '3vw'}}>Name</h1>
            <h1 style={{marginLeft: '11vw'}}>Club</h1>
            <h1 style={{marginLeft: '4vw'}}>League</h1>
        </div>
        
        {playersIsLoading ? (
          <div className={fadeOut ? 'fade-out' : 'fade-in'} style = {{width: "100%", height: "100%", display: "flex", justifyContent:"center", marginTop:"30%"}}>
            <MiniLoading/>
          </div>
        ) : (
          <div className="player-grid">
            {allPlayers.length === 0 ? (
              <h2 style={{marginTop: '1vw'}}>Please select a country</h2>
            ) : (
              allPlayers.map((player, index) => (
                <div key={index}>
                  <PlayerCard
                    name={player.name}
                    position={player.position}
                    club={player.club}
                    league={player.league}
                    index={index}
                    country = {player.country}
                  />
                </div>
              ))
            )}
          </div>
        )}
        
      </div>

      <div className="r-container">

          <div className="club-btn-div">
            <button className="club-btn" onClick = {getTopClubs}>Generate Top Clubs and Leagues</button>
          </div>

          {topClubs.length  > 0 && !clubsIsLoading && 
          <div className="r-section-container">
            <div className = "club-section">
              <h1 className="r-title">Clubs</h1>
                {topClubs.map((club, index) => (
                <div key={index}>
                  <h2 className="club-text">{index + 1}. {club.name}</h2>
                  <h2 className="league-text">{club.league}</h2>
                </div>
                ))}
            </div>
            {allPlayers.length === 0 && <h2 style={{marginTop: '0px'}}>Please Select a country</h2>}
          </div>}
          {clubsIsLoading &&
            <div style = {{width: "100%", display: "flex", justifyContent:"center", marginTop:"30%"}}>
              <MiniLoading/>
            </div>
          }
      </div>

      
    </div>
  </body>
 </>
};

export default Teams;
