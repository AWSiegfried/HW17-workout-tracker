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
    app.put("/api/workouts/:id", function(req, res) {
        db.Workout.updateOne({
            _id: req.params.id
        }, {
            $push: { exercises: req.body }
        }, (err, data) => {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        })
    });

    //post, api/workouts
    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body, (err, data) => {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        });
    })

    //get, api/workouts/range
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([{
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            },
            {
                $limit: 7
            }
        ], (err, data) => {
            if (err) {
                res.json(err);
            } else {
                console.log(data);
                res.json(data);
            };
        });
    });
};