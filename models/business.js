const mongoose = require("mongoose");


const businessSchema = new mongoose.Schema(
{
    name: {
        type:String,
        required:"נדרש שם",
    },
    address:{
        type:String,
    }
},
{timestamps: true}
);

 module.exports = mongoose.model("Business", businessSchema);