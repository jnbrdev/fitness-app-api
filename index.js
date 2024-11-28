const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin: [`http://localhost:8000`, 
        'http://localhost:3000', 
        'https://fitness-app-api-l2sk.onrender.com',
        'https://fitness-app-frontend-snowy.vercel.app',
        'https://fitness-app-frontend-np1jrqgw5-jnbrdevs-projects.vercel.app'
    ],
    credentials: true, 
    optionsSuccessStatus:200 
};
app.use(cors(corsOptions));

//MongoDB database
mongoose.connect("mongodb+srv://admin:admin123@wdc028-b461.c4soc.mongodb.net/fitness-app-API?retryWrites=true&w=majority&appName=WDC028-B461");

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));



//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if(require.main === module){
	app.listen(process.env.PORT || port, () => {
	    console.log(`API is now online on port ${ process.env.PORT || port }`)
	});
}

module.exports = {app,mongoose};