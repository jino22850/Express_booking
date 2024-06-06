
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const { type } = require('@testing-library/user-event/dist/type');

const conductorSchema = new mongoose.Schema({
    conductorname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type:String,
        required:true
    },
   
    gender:{
        type: String,
        required :true
    },
    mobileNumber : {
        type : String,
        required : true
    },
    role: {
        type: String,
        enum: ['Conductor'], // Define possible roles
        default: 'Conductor' // Default role for new users
    },
    password: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('conductor', conductorSchema);
