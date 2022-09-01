
const Order = require('../models/order');
const OrderItem = require('../models/orderitem');
exports.create = async(req, res) => {
    console.log(req.body)
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderitem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderitem.quantity,
            product: orderitem.product,
            business: orderitem.business,
            status: orderitem.status
        })
        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved = await orderItemsIds

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product','price')
        const totalPrice = orderItem.product.price * orderItem.quantity;
        console.log(orderItem)
        return totalPrice
    }))
    const totalPrice = totalPrices.reduce((a,b) => a+b, 0);
    console.log('total price',totalPrices)
    let order = new Order({
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
        business:req.body.business,
        ordernumber: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        dateOrdered: req.body.dateOrdered,
        orderItems:orderItemsIdsResolved
    })
    order = await order.save();

    if(!order) {
        res.status(404).send({message:'ההזמנה לא יכולה להיווצר'})
    } 
    res.status(200).send(order)
}

exports.list = async(req, res) => {
    const orderList = await Order.find()
    .populate('user', 'name').sort('dateOrdered')
    .populate({path:'orderItems', populate:{path:'product',populate:'category',populate:'business'}});;
    if(!orderList){
        res.status(500).json({success: false})
    }
    res.send(orderList)
  
   }



   exports.read = async(req, res) => {
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({path:'orderItems', populate:{path:'product',populate:'category'}});
    if(!order){
        res.status(500).json({success: false})
    }
    res.send(order)
    
   }

 

exports.remove = (req, res) => {
 Order.findByIdAndDelete(req.params.id).then(async order => {
     if(order){
         await order.orderItems.map(async orderItem => {
             await OrderItem.findByIdAndDelete(orderItem)
         })
         return res.status(200).json({success: true, message:'ההזמנה נמחקה'})
     } else {
         return res.status(404).json({success:false, message:'ההזמנה לא נמחקה'})
     }
     
 }).catch(err =>{
    return res.status(400).json({success:false, err:err})
 })
}
exports.update = async(req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status:req.body.status,
            orderItems:req.body.orderItems,
            dateOrder:req.body.dateOrder,
            id: req.body.id,
            totalPrice:req.body.totalPrice,
            user:req.body.user
        },
        {new: true}
    )
    if(!order){
        res.status(500).json({success: false})
    }
    res.send(order)
  
   }


   exports.totalSales = async(req, res) => {
    const totalSales = await Order.aggregate([
        { $group : {_id: null, totalSales: { $sum : '$totalPrice'}}}
    ])
    if(!totalSales) {
        return res.status(400).send('המכירות של ההזמנה לא יכולות להיות מוצגות')
    }
    res.send({totalSales:totalSales.pop().totalSales})
   }

   exports.count = async(req, res) => {
    const orderCount =  await Order.countDocuments((count) => count)
    
    res.send({orderCount})
     }

     exports.BusinessOrderList = async(req, res) => {
        const orders = await Order.find().where({business:req.params.id}).populate({path:'orderItems', populate:{path:'product',populate:'category',populate:'business'}});;
        
        if(!orders){
            res.status(500).json({success: false})
        }
        res.send(orders)
      
       }


  