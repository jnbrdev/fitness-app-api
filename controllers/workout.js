const Workout = require("../models/Workout");

// Add a new workout
module.exports.addWorkout = async (req, res) => {
    try {
        const { name, duration} = req.body;
        const userId = req.user.id;
        const status = 'pending'
        if (!name || !duration || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newWorkout = new Workout({
            userId,
            name,
            duration,
            status
        });

        await newWorkout.save();
        res.status(201).json(newWorkout );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all workouts for a user
module.exports.getMyWorkouts = async (req, res) => {
    try {
        const userId = req.user.id;

        const workouts = await Workout.find({ userId });
        if (!workouts || workouts.length === 0) {
            return res.status(404).json({ message: 'No workouts found' });
        }

        res.status(200).json(workouts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a workout
module.exports.updateWorkout = async (req, res) => {
    try {
        let workoutUpdates = {
            name: req.body.name,
            duration: req.body.duration
        };

        return await Workout.findByIdAndUpdate(req.params.id, workoutUpdates, { new: true }) // Add { new: true }
            .then(updatedWorkout => {
                return res.status(200).send({ 
                    message: 'Workout updated successfully', 
                    updatedWorkout: updatedWorkout 
                });
            })
            .catch(err => {
                console.error("Error in updating a Workout:", err);
                return res.status(500).send({ error: 'Error in updating a Workout.' });
            });
    } catch (err) {
        console.error('Error updating workout:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Delete a workout
module.exports.deleteWorkout = (req, res) => {
    try {
        return Workout.deleteOne({ _id: req.params.id})
        .then(deletedResult => {

            return res.status(200).send({ 
                message: 'Workout deleted successfully'
            });
    
        })
        .catch(err => {
            console.error("Error in deleting an Workout : ", err)
            return res.status(500).send({ error: 'Error in deleting an Item.' });
        });
    } catch (err) {
        console.error('Error deleting workout:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Update the status of a workout (Complete workout)
module.exports.completeWorkoutStatus = async (req, res) => {
    try {
        const status = 'completed';
        const id  = req.params.id;
        const userId = req.user.id; 

        if (!id || !status) {
            return res.status(400).json({ message: 'Workout ID and status are required' });
        }

        const workout = await Workout.findOne({ _id: id, userId });
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        workout.status = status;

        await workout.save();
        res.status(200).json({ message: 'Workout status updated successfully', workout });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
