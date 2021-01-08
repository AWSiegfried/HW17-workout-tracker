//The routes we need are:
//Continue Workout (index)
//Create New Workout (index)
//Add new exercises to a new workout plan (exercise)
//View combined weight of multiple exercises from the past seven workouts (stats)
//View the total duration of each workout from the past seven workouts (stats)

const path = require("path");

module.exports = (app) => {
    app.get("/exercise", function(req, res) {
        res.sendFile(path.join(_dirname, "../public/exercise"))
    })


    app.get("/stats", function(req, res) {
        res.sendFile(path.join(_dirname, "../public/stats"))
    })

    app.get("/", function(req, res) {
        res.sendFile(path.join(_dirname, "../public/index"))
    })
};