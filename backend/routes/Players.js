const express = require( 'express');
const router = express.Router();

// instance of the Posts.js model
// variable name is based on what is in Posts.js
const { Players } = require('../models');

router.post("/add", async (req, res) => {
     const {name, country, position, club, league, UserId} = req.body

     //Check if duplicate exists
     playerExists = await Players.findOne({ where: {UserId: UserId, name: name, country: country}});
   
     if(playerExists){
         return res.json({error: 'User already has this player'});
     }

     await Players.create({
         name: name,
         country: country,
         position: position,
         club: club,
         league: league,
         UserId: UserId,
     })
     
     return res.json("Successful Player Addition");
 })

 router.get("/:UserId/:country", async (req, res) => {
    const {UserId, country} = req.params;

    countryPlayers = await Players.findAll({ where: {UserId: UserId, country: country}});
    res.json(countryPlayers);
 })

 router.delete("/remove/:UserId/:country", async (req, res) => {
    const { UserId, country } = req.params;
    await Players.destroy({
        where: {UserId: UserId, country: country}
    });
    res.json('Successful Country deletion');
 })


 // http://localhost:3001/players/remove/${UserId}/${country}
 
module.exports = router
