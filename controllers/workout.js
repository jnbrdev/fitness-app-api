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
    const { id } = req.params;
    const { name, duration, status } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Workout ID is required' });
    }

    const workoutUpdates = {
        name,
        duration,
        status: status ?? 'pending',
    };

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(id, workoutUpdates, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json({
            message: 'Workout updated successfully',
            updatedWorkout: updatedWorkout 
        });
    } catch (error) {
        handleError(res, 'Error updating workout', error);
    }
};

// Delete a workout
module.exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({ message: 'Workout ID is required' });
    }

    try {
        const deletedWorkout = await Workout.findOneAndDelete({ _id: id, userId });
        if (!deletedWorkout) {
            return res.status(404).json({ message: 'Workout not found or unauthorized action' });
        }
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        handleError(res, 'Error deleting workout', error);
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
