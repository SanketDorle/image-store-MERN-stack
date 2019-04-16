// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var imageStorageSchema = new mongoose.Schema({
    imageString : String,
    uploadedTime : Number
});

// Return model
module.exports = restful.model('imageStorage', imageStorageSchema);