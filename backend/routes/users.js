const router = require('express').Router();

// mongoose model that we created 
let User = require('../models/user.model');


//  first route (endpoint) handles http get requests on url 
router.route('/').get((req, res) => {
    // mongoose method that gets list of all users from ATLAS database
    User.find()
        //  then get all users in json format taht we got from database
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

// post request
router.route('/add').post((req, res) => {
    const username = req.body.username;

    // create new instance of User using the username
    const newUser = new User({ username });

    //  newUser is saved to database 
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;