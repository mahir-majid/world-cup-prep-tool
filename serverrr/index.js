// Instance of the Express framework
const express = require( 'express')

// CORS set up
const cors = require("cors");

require('dotenv').config();

// Instance of express
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Setting up CORS and allowing Origins configuration
const allowedOrigins = [process.env.FIREBASE_URL, process.env.FIREBASE_URL_TOO];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "PATCH"]
}));

// Routers
const userRouter = require('./routes/Users');
app.use("/users", userRouter);

const countryRouter = require('./routes/Countries');
app.use("/countries", countryRouter);

const playerRouter = require('./routes/Players');
app.use("/players", playerRouter);

const apiRouter = require('./routes/Api')
app.use("/api", apiRouter);

const db = require('./models')

db.sequelize.sync().then(() => {
app.listen(process.env.PORT, '0.0.0.0', () => {
    });
})
