const mongoose = require("mongoose");


const orderItemSchema = new mongoose.Schema(
{
    quantity: {
        type:Number,
        required: true
    },
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        
    },
    business: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business',
        
    },
    status:{
        type:String,
        default:'ממתין'
    },

   
},
{timestamps: true}
);

 module.exports = mongoose.model("OrderItem", orderItemSchema);