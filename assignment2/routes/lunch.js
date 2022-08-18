const express = require('express');
const router = express.Router();
// Add reference to the models
const lunch = require('../models/lunch');

const passport = require('passport');

function IsLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
// Add GET for index
router.get('/', IsLoggedIn, (req, res, next) => {

    lunch.find((err, lunch) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('lunch/index', { title: 'Lunch', 
            dataset: lunch,
            user : req.user });
        }
    })
});

router.get('/add', IsLoggedIn,(req, res, next) => {
    // Get list of Lunch items
    lunch.find((err, lunch) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('lunch/add', { title: 'Add a New item', lunch: lunch });
        }
    }).sort({ name: -1 });
});

// Add POST handler
router.post('/add', IsLoggedIn, (req, res, next) => {
    // use the lunch module to save data to DB
    // call create method of the model 
    // and map the fields with data from the request
    // callback function will return an error if any or a newbreakfast object
    lunch.create({
        salad: req.body.salad,
        yogurt: req.body.yogurt,
        avocado: req.body.avocado,
        vegies: req.body.vegies,
        rice: req.body.rice,
        soup: req.body.soup,
    }, (err, newLunch) => {
        if (err) {
            console.log(err);
        }
        else {
            // We can show a successful message by redirecting them to index
            res.redirect('/lunch');
        }
    });
});


// GET handler for Delete operations
// :_id is a placeholder for naming whatever is after the / in the path
router.get('/delete/:_id', IsLoggedIn, (req, res, next) => {
    // call remove method and pass id as a json object
    lunch.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/lunch')
        }
    })
});

// GET handler for Edit operations
router.get('/edit/:_id', IsLoggedIn, (req, res, next) => {
    // Find the lunch by ID
    // Find available courses
    // Pass them to the view
    lunch.findById(req.params._id, (err, lunches) => {
        if (err) {
            console.log(err);
        }
        else {
            lunch.find((err, lunches) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render('lunch/edit', {
                        title: 'Edit a Lunch',
                        lunches: lunches,
                        user : req.user
                    });
                }
            }).sort({ name: 1 });
        }
    });
});

// POST handler for Edit operations
router.post('/edit/:_id', IsLoggedIn, (req,res,next) => {
    // find lunch based on ID
    // try updating with form values
    // redirect to /lunches
    lunch.findOneAndUpdate({_id: req.params._id}, {
        salad: req.body.salad,
        yogurt: req.body.yogurt,
        avocado: req.body.avocado,
        vegies: req.body.vegies,
        rice: req.body.rice,
        soup: req.body.soup,
    }, (err, updatedLunch) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/lunch');
        }
    });
});

// Export this router module
module.exports = router;