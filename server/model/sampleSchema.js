const mongoose = require('mongoose');

//creating scema and validation for adding data to DB
const sampleSchema= new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    gender:{
        type:String,
    },
    income:{
        type:String,
    },
    city:{
        type:String,
    },
    car:{
        type:String,
    },
    quote:{
        type:String,
    },
    phone_price:{
        type:String,
    },
});



const Ads = mongoose.model("Sample",sampleSchema,'sample');

module.exports = Ads