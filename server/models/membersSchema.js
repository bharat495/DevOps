const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    image: String,
    name : String,
    position : String,
    description : String,
    year : String,
    branch : String,
    linkedin : String,
    github : String,
    instagram : String
});

const Member = mongoose.model('member', memberSchema);
module.exports = Member;