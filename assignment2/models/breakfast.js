const mongoose = require('mongoose');

// Create schema definition object using mapping notation
const projectsSchemaDefinition = {
    // add each element and its properties
    bread: {
        type: String,
        required: true
    },
    coffee: {
        type: String,
        required : true
    },
    tea: {
        type: String,
        required: true
    },
    sandwich: {
        type: String,
        required: true
    },
    oatmeal: {
        type: String,
        required: true
    },
    fruits: {
        type: String,
        required: true
    },
    juice: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'To eat'
    }
};

// Create new mongoose schema using the definition object
var projectsSchema = new mongoose.Schema(projectsSchemaDefinition);
// Create new mongoose model using the schema object and
// Import new model > provide name and schema
module.exports = mongoose.model('breakfast', projectsSchema);;
// alternative > module.exports = mongoose.model('Project', projectsSchema);