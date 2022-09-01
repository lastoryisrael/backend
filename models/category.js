const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
{
    name: {
        type:String,
        required:"נדרש שם",
    },
     icon: {
        type:String,
       
    },
    color: {
        type:String
    }
   
},
{timestamps: true}
);

 module.exports = mongoose.model("Category", categorySchema);