const mongoose = require('mongoose');

// Create schema definition object using mapping notation
const projectsSchemaDefinition = {
    // add each element and its properties
    macroni: {
        type: String,
        required: true
    },
    pasta: {
        type: String,
        required : true
    },
    sloppyJos: {
        type: String,
        required: true
    },
    vegies: {
        type: String,
        required: true
    },
    mashedPotato: {
        type: String,
        required: true
    },
    chillyChicken: {
        type: String,
        required: true
    },

};

// Create new mongoose schema using the definition object
var projectsSchema = new mongoose.Schema(projectsSchemaDefinition);
// Create new mongoose model using the schema object and
// Import new model > provide name and schema
module.exports = mongoose.model('lunch', projectsSchema);;
// alternative > module.exports = mongoose.model('Project', projectsSchema);