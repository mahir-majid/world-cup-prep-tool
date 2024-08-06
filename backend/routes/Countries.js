const express = require( 'express');
const router = express.Router();

// instance of the Posts.js model
// variable name is based on what is in Posts.js
const { Countries } = require('../models');



router.post("/add", async (req, res) => {
   const {name, UserId} = req.body

   //Check if duplicate exists
   countryExists = await Countries.findOne({ where: {UserId: UserId, name: name}});
   
   if(countryExists){
    return res.json({error: 'User already has this country'});
   }

    await Countries.create({
        name: name,
        UserId: UserId,
        selected: true
    })
    
    return res.json("Successful Country Addition");
})

router.get("/:UserId", async (req, res) => {
    let UserId = req.params.UserId
    const userCountries = await Countries.findAll({ where: {UserId: UserId}});
    res.json(userCountries);
})

router.patch("/update/:UserId/:country", async (req, res) => {
    const { UserId, country } = req.params;

    try {
        const countryInstance = await Countries.findOne({ where: {UserId: UserId, name: country}});

        if (!countryInstance) {
            return res.status(404).json({ error: 'Country not found' });
        }

        countryInstance.selected = !countryInstance.selected;
        await countryInstance.save();

        res.json({
            message: 'Country selection status updated',
            country: countryInstance
        });
    } catch (error) {
        console.log('Error', error);
    }
})

router.delete("/remove/:UserId/:country", async (req, res) => {
    const { UserId, country } = req.params;
    await Countries.destroy({
        where: {UserId: UserId, name: country}
    });
    res.json('Successful Country deletion');
});



module.exports = router
