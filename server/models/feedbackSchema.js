const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    loggedinuser : String,
    message : String,
    time : String
});

const Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback;