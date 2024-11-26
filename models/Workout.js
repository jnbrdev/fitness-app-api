const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is Required']
    },
	name: {
		type: String,
		required: [true, 'name is Required']
	},
	duration: {
		type: String,
		required: [true, 'duration is Required']
	},
    status: {
		type: String,
		required: [true, 'status is Required']
	},
    dateAdded: {
        type: Date,
        default: Date.now
	}

});


module.exports = mongoose.model('Workout', workoutSchema);