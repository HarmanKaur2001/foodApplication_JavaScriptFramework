const express = require('express');
const router = express.Router();
// Add reference to the models
const dinner = require('../models/dinner');
//const Course = require('../models/course');

// Add GET for index
router.get('/', (req, res, next) => {

    dinner.find((err, dinner) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('dinner/index', { title: 'Dinner', dataset: dinner });
        }
    })
});

router.get('/add', (req, res, next) => {
    // Get list of dinner items
    dinner.find((err, dinner) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('dinner/add', { title: 'Add a New item', dinner: dinner });
        }
    }).sort({ name: -1 });
});

// Add POST handler
router.post('/add', (req, res, next) => {
    // use the dinner module to save data to DB
    // call create method of the model 
    // and map the fields with data from the request
    // callback function will return an error if any or a newDinner object
    dinner.create({
        macroni: req.body.macroni,
        pasta: req.body.pasta,
        sloppyJos: req.body.sloppyJos,
        vegies: req.body.vegies,
        mashedPotato: req.body.mashedPotato,
        chillyChicken: req.body.chillyChicken,
    }, (err, newBreakfast) => {
        if (err) {
            console.log(err);
        }
        else {
            // We can show a successful message by redirecting them to index
            res.redirect('/dinner');
        }
    });
});


// GET handler for Delete operations
// :_id is a placeholder for naming whatever is after the / in the path
router.get('/delete/:_id', (req, res, next) => {
    // call remove method and pass id as a json object
    dinner.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/dinner')
        }
    })
});

// GET handler for Edit operations
router.get('/edit/:_id', (req, res, next) => {
    // Find the dinner by ID
    // Find available courses
    // Pass them to the view
    dinner.findById(req.params._id, (err, dinners) => {
        if (err) {
            console.log(err);
        }
        else {
            dinner.find((err, dinners) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render('dinner/edit', {
                        title: 'Edit a dinner',
                        dinners: dinners
                    });
                }
            }).sort({ name: 1 });
        }
    });
});

// POST handler for Edit operations
router.post('/edit/:_id', (req,res,next) => {
    // find dinnner based on ID
    // try updating with form values
    // redirect to /dinners
    dinner.findOneAndUpdate({_id: req.params._id}, {
        macroni: req.body.macroni,
        pasta: req.body.pasta,
        sloppyJos: req.body.sloppyJos,
        vegies: req.body.vegies,
        mashedPotato: req.body.mashedPotato,
        chillyChicken: req.body.chillyChicken,
    }, (err, updatedDinnner) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/dinner');
        }
    });
});

// Export this router module
module.exports = router;