const express = require('express');
const router = express.Router();
// Add reference to the models
const breakfast = require('../models/breakfast');
//const Course = require('../models/course');

// Add GET for index
router.get('/', (req, res, next) => {

    breakfast.find((err, breakfast) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('breakfast/index', { title: 'Breakfast', dataset: breakfast });
        }
    })
});

router.get('/add', (req, res, next) => {
    // Get list of breakfast items
    breakfast.find((err, breakfast) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('breakfast/add', { title: 'Add a New item', breakfast: breakfast });
        }
    }).sort({ name: -1 });
});

// Add POST handler
router.post('/add', (req, res, next) => {
    // use the breakfast module to save data to DB
    // call create method of the model 
    // and map the fields with data from the request
    // callback function will return an error if any or a newbreakfast object
    breakfast.create({
        bread: req.body.bread,
        coffee: req.body.coffee,
        tea: req.body.tea,
        sandwich: req.body.sandwich,
        oatmeal: req.body.oatmeal,
        fruits: req.body.fruits,
        juice: req.body.juice
    }, (err, newBreakfast) => {
        if (err) {
            console.log(err);
        }
        else {
            // We can show a successful message by redirecting them to index
            res.redirect('/breakfast');
        }
    });
});


// GET handler for Delete operations
// :_id is a placeholder for naming whatever is after the / in the path
router.get('/delete/:_id', (req, res, next) => {
    // call remove method and pass id as a json object
    breakfast.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/breakfast')
        }
    })
});

// GET handler for Edit operations
router.get('/edit/:_id', (req, res, next) => {
    // Find the breakfast by ID
    // Find available courses
    // Pass them to the view
    breakfast.findById(req.params._id, (err, breakfasts) => {
        if (err) {
            console.log(err);
        }
        else {
            breakfast.find((err, breakfasts) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render('breakfast/edit', {
                        title: 'Edit a breakfast',
                        breakfasts: breakfasts
                    });
                }
            }).sort({ name: 1 });
        }
    });
});

// POST handler for Edit operations
router.post('/edit/:_id', (req,res,next) => {
    // find breakfast based on ID
    // try updating with form values
    // redirect to /breakfasts
    breakfast.findOneAndUpdate({_id: req.params._id}, {
        bread: req.body.bread,
        coffee: req.body.coffee,
        tea: req.body.tea,
        sandwich: req.body.sandwich,
        oatmeal: req.body.oatmeal,
        fruits: req.body.fruits,
        juice: req.body.juice
    }, (err, updatedbreakfast) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/breakfast');
        }
    });
});

// Export this router module
module.exports = router;