const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    city:{
        type:String,
        required:true,

    },
    phone:{
        type:Number,
        required:true,
        unique:true
    }

},{
    timestamps:true
})

const Contact = new mongoose.model('contact' , ContactSchema)
module.exports = Contact;