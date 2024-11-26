# Fitness App API

## Description

The Fitness App API is designed to manage workout routines and user authentication for a fitness application. It provides a set of endpoints to add, view, update, and delete workouts, as well as user registration and login functionalities. This API allows users to manage their workout plans, track their progress, and store their personal data securely.

## Author

- **Author**: Jonieber Dela Victoria
- **Email**: delavictoriajnbr@gmail.com

---

## Routes

### Workout

| HTTP Method | Endpoint                                        | Description                                               | Controller Method                  |
|-------------|-----------------------------------------------|-----------------------------------------------------------|-------------------------------------|
| POST        | `/addWorkout`                                 | Add a new workout to the user's profile.                  | `workoutController.addWorkout`     |
| GET         | `/getMyWorkouts`                              | Retrieve all workouts associated with the logged-in user. | `workoutController.getMyWorkouts`  |
| PATCH       | `/updateWorkout/:workoutId`                   | Update the details of an existing workout.                | `workoutController.updateWorkout`  |
| DELETE      | `/deleteWorkout/:workoutId`                   | Delete a specific workout from the user's profile.       | `workoutController.deleteWorkout`  |
| PATCH       | `/completeWorkoutStatus/:workoutId`           | Mark a workout as completed.                              | `workoutController.completeWorkoutStatus` |

### User

| HTTP Method | Endpoint                                        | Description                                               | Controller Method                  |
|-------------|-----------------------------------------------|-----------------------------------------------------------|-------------------------------------|
| POST        | `/register`                                   | Register a new user.                                      | `userController.registerUser`      |
| POST        | `/login`                                      | Login an existing user and generate an authentication token. | `userController.loginUser`        |
| GET         | `/details`                                    | Retrieve the details of the logged-in user.               | `userController.detailsUser`      |

---

## Functionalities

### Workout Functionalities:

1. **Add Workout**  
   - Description: Allows a user to create a new workout.  
   - Endpoint: `POST /addWorkout`

2. **Get My Workouts**  
   - Description: Fetches a list of all workouts created by the user.  
   - Endpoint: `GET /getMyWorkouts`

3. **Update Workout**  
   - Description: Enables the user to update a specific workout's details.  
   - Endpoint: `PATCH /updateWorkout/:workoutId`

4. **Delete Workout**  
   - Description: Allows a user to delete a workout by its ID.  
   - Endpoint: `DELETE /deleteWorkout/:workoutId`

5. **Complete Workout Status**  
   - Description: Updates the status of a workout to "completed."  
   - Endpoint: `PATCH /completeWorkoutStatus/:workoutId`

---

### User Functionalities:

1. **User Registration**  
   - Description: Registers a new user with necessary credentials (e.g., email, password).  
   - Endpoint: `POST /register`

2. **User Login**  
   - Description: Authenticates an existing user and returns a token for accessing secured routes.  
   - Endpoint: `POST /login`

3. **User Details**  
   - Description: Fetches the details of the logged-in user.  
   - Endpoint: `GET /details`


---

## Setup

To get started, follow these steps:

- Just clone the repository. thanks
