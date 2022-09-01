
const Business = require('../models/business');

//create category
exports.create = async(req, res) => {
    let business = new Business({
        name:req.body.name,

    })
    business = await business.save();

    if(!business) {
        res.status(404).send({message:'העסק לא יכול להיווצר'})
    } 
    res.status(200).send(business)
}

// read a product
exports.read = async(req, res) => {
    const business = await Business.findById(req.params.id);
    if(!business) {
        res.status(500).json({message:'העסק לא נמצא'})
    } else{
        res.status(200).send(business)
    }
    
}
// read products
exports.list = (req, res) => {
    Business.find().exec((err, data) => {
       if(err) {
           return res.status(400).json({
               error: err
           })
       }
       res.json(data)
    })
   }
   exports.update = async(req, res) => {
    const business = await Business.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            
        },
        {new: true}
        )
        if(!business) {
            res.status(404).send({message:'העסק לא יכול להתעדכן'})
        } 
        res.status(200).send(business)
    

}
//delete category
exports.remove = (req, res) => {
    Business.findByIdAndDelete(req.params.id).then(business => {
     if(business){
         return res.status(200).json({success: true, message:'העסק נמחק'})
     } else {
         return res.status(404).json({success:false, message:'העסק לא נמצא'})
     }
     
 }).catch(err =>{
    return res.status(400).json({success:false, err:err})
 })
}


  