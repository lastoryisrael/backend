const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    business: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business',
        required: true
    },
    description:{
        type:String,
        required:true
    },
    richdescription:{
        type:String,
        default: ''
    },
    image:{
        type:String,
        default: ''
    },
    images:[{
        type:String,
        default: ''
    }],
    originalprice:{
        type:Number,
        default: 0
    },
    price:{
        type:Number,
        default: 0
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
    countinstock: {
        type: Number,
        required:true,
        min: 0,
        max: 255
    },
    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default: 0,
    },
    isFeatured:{
        type:Boolean,
        default: false
    },
    dateCreated:{
        type:Date,
        default: Date.now
    },
    expirydate:{
        type:Date,
    },
    howtouse:{
        type:String,
    },
    additionalcomments:{
        type:String,
    }

     
    
})
productSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
productSchema.set('toJSON',{
    virtuals: true,
})

 module.exports = mongoose.model("Product", productSchema);