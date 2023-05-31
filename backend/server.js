const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 8000;


//  allows to parse json because server is recieving and sending json
app.use(cors());
app.use(express.json());

//  uri where database is stored
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
// once connection is open it will connect to database
connection.once('open', () => {
    console.log('MangoDB database connection established succesfully');
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


//  when go to url for /exercises - exercises Route loads. same for users Route
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//  starts server by listening to certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});