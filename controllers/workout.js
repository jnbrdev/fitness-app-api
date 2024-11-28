const Workout = require("../models/Workout");

// Add a new workout
module.exports.addWorkout = async (req, res) => {
    try {
        const { name, duration} = req.body;
        const userId = req.user.id;
        const status = 'pending'
        if (!name || !duration) {
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

const handleError = (res, message, error, statusCode = 500) => {
    console.error(message, error);
    res.status(statusCode).json({ message });
};

// Update a workout
// Delete a workout
// Update a workout
module.exports.updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updatedData = req.body;

        // Find the workout by ID and ensure the userId matches
        const workout = await Workout.findOne({ _id: id, userId: userId });

        // If no workout is found or it doesn't belong to the user, return an error
        if (!workout) {
            return res.status(404).json({ success: false, message: "Workout not found or you are not authorized to update it" });
        }

        // Update the workout with the provided data
        Object.assign(workout, updatedData);
        await workout.save();

        // Respond with the updated workout data
        res.status(200).json({ message: 'Workout updated successfully', updatedWorkout: workout });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// Delete a workout
module.exports.deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        // Find the workout by ID and ensure the userId matches
        const workout = await Workout.findOne({ _id: id, userId: userId });
        
        // If no workout is found or it doesn't belong to the user, return an error
        if (!workout) {
            return res.status(404).json({ success: false, message: "Workout not found or you are not authorized to delete it" });
        }

        // Delete the workout using the correct method
        await Workout.findByIdAndDelete(id);  // Alternative: use `deleteOne({ _id: id })`
        
        // Respond with success message
        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




// Update the status of a workout (Complete workout)
module.exports.completeWorkoutStatus = async (req, res) => {
    try {
        const status = 'completed';
        const id  = req.params.id;
        const userId = req.user.id; 

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
