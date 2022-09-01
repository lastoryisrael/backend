const mongoose = require('mongoose');


const restrequestSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true,
        
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
   
        
  
}, {timestamps: true})


module.exports = mongoose.model("RestRequest", restrequestSchema);