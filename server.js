const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

//The routes we need are:
//Continue Workout (index)
//Create New Workout (index)
//Add new exercises to a new workout plan (exercise)
//View combined weight of multiple exercises from the past seven workouts (stats)
//View the total duration of each workout from the past seven workouts (stats)

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});