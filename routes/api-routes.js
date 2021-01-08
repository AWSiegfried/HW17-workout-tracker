//The routes we need are:
//Continue Workout (index)
//Create New Workout (index)
//Add new exercises to a new workout plan (exercise)
//View combined weight of multiple exercises from the past seven workouts (stats)
//View the total duration of each workout from the past seven workouts (stats)

const db = require("../models");


module.exports = function(app) {

    //get, api/workouts
    app.get("/api/workouts", function(req, res) {
        console.log(req);
        db.Workout.aggregate([{
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }]).then((data) => {
            res.json(data);
        });
    });

    //put, api/workouts

    //post, api/workouts

    //get, api/workouts/range
};