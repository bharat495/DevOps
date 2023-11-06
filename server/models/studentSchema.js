const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    confirm_password : String,
    year : String,
    branch : String,
    division : String,
});

const Student = mongoose.model('student', studentSchema);
module.exports = Student;