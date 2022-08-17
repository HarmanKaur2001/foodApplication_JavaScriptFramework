const mongoose = require('mongoose');

// Create schema definition object using mapping notation
const projectsSchemaDefinition = {
    // add each element and its properties
    salad: {
        type: String,
        required: true
    },
    yogurt: {
        type: String,
        required : true
    },
    avocado: {
        type: String,
        required: true
    },
    vegies: {
        type: String,
        required: true
    },
    rice: {
        type: String,
        required: true
    },
    soup: {
        type: String,
        required: true
    },

};

// Create new mongoose schema using the definition object
var projectsSchema = new mongoose.Schema(projectsSchemaDefinition);
// Create new mongoose model using the schema object and
// Import new model > provide name and schema
module.exports = mongoose.model('luncg', projectsSchema);;
// alternative > module.exports = mongoose.model('Project', projectsSchema);