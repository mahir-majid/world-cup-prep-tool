const express = require('express');
const router = express.Router();
const { OpenAI } = require("openai");
require('dotenv').config();



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use API_KEY as defined in your .env file
});

router.get("/:country", async (req, res) => {

    const country = req.params.country;
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: "When fed a country, ONLY output top 5 soccer players that play for that national team. Abbreviate positions like football manager, use league names like in football manager, full player names (no nicknames). Respond in this format and ORDER: player1*position1*clubname1*league1*player2*position2*club2*league2*player3*position3*clubname3*league3*player4*position4*club4*league4*player5*position5*clubname5*league5" },
                { role: 'user', content: country }
            ],
            max_tokens: 1000,
            temperature: 0,
        });

        const playersString = response.choices[0].message.content.trim();
        const playerDetails = playersString.split('*');
        const players = [];

        for (let i = 0; i < playerDetails.length; i += 4) {
            if (playerDetails[i] && playerDetails[i + 1] && playerDetails[i + 2] && playerDetails[i + 3]) {
                const player = {
                    name: playerDetails[i],
                    position: playerDetails[i + 1],
                    club: playerDetails[i + 2],
                    league: playerDetails[i + 3],
                    country: country,
                };
                players.push(player);
            }
        }
        
        res.json({ players });
    } catch (error) {
        console.error("Error generating players", error);
        res.status(500).json({ error: "Error generating players" });
    }
});

router.get("/clubs/:players", async (req, res) => {

    const allPlayers = req.params.players;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: `With the provided players, ONLY recommend 5 unique clubs (NOT NATIONAL). Stop generating teams early if there are only duplicates. Respond in this format EX: club1*league1*club2*league2*...` },
                { role: 'user', content: allPlayers }
            ],
            max_tokens: 1000,
            temperature: 0,
        });

        const responseData = response.choices[0].message.content.trim();
        const responseClubs = responseData.split("*");

        const clubList = [];

        for(let i = 0; i < responseClubs.length; i+=2){
            if(responseClubs[i] && responseClubs[i + 1]){
                const newClub = {
                    club: responseClubs[i],
                    league: responseClubs[i + 1]
                }

                clubList.push(newClub);
            }
        }

        res.json({ clubList });

    } catch (error) {
        console.log({ error: 'Error getting Clubs and Leagues'});
    }
});

module.exports = router;


