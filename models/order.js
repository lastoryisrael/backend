const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
{
    phone:{
        type:String,
      
    },
    status:{
        type:String,
       
        default:'ממתין'
    },
    totalPrice:{
        type:Number,
    },

    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },
    dateOrdered:{
        type:Date,
        default: Date.now
    },
    
    orderItems: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required: true
    }],
    business: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business',
        
    },
    ordernumber:{
        type:Number,
        unique:true,
    },
   
},
{timestamps: true}
);
orderSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
orderSchema.set('toJSON',{
    virtuals: true,
})

 module.exports = mongoose.model("Order", orderSchema);