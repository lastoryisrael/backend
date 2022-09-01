const OrderItem = require('../models/orderitem');

exports.create = async(req, res) => {
    let orderItem = new OrderItem(req.body)
    orderItem = await orderItem.save();

    if(!orderItem) {
        res.status(404).send({message:'ההזמנה לא יכולה להיווצר'})
    } 
    res.status(200).send(orderItem)
}

exports.list = async(req, res) => {
    const orderitems = await OrderItem.find().populate({path:'product'});
    if(!orderitems){
        res.status(500).json({success: false})
    }
    res.send(orderitems)
  
   }

   exports.BusinessOrderList = async(req, res) => {
    const orderitems = await OrderItem.find().where({business:req.params.id});
    if(!orderitems){
        res.status(500).json({success: false})
    }
    res.send(orderitems)
  
   }
 
 

exports.remove = (req, res) => {
 OrderItem.findByIdAndDelete(req.params.id).then(orderitem => {
     if(orderitem){
         return res.status(200).json({success: true, message:'המוצר נמחק'})
     } else {
         return res.status(404).json({success:false, message:'המוצר לא נמחק'})
     }
     
 }).catch(err =>{
    return res.status(400).json({success:false, err:err})
 })
}

exports.update = async(req, res) => {
    const orderitem = await OrderItem.findByIdAndUpdate(
        req.params.id,
        {
            
            status:req.body.status
        },
        {new: true}
    )
    if(!orderitem){
        res.status(500).json({success: false})
    }
    res.send(orderitem)
  
   }

