const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/scatch");

const userSchema =mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    fullname:{
        type:String,
        minLength:3,
        trim:true,
    },
    password:String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    isadmin:Boolean,
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String,
})

module.exports = mongoose.model("user",userSchema);
