const RestRequest = require('../models/resetrequest');

exports.create = async(req, res) => {
    let restrequest = new RestRequest(req.body)
    restrequest = await restrequest.save();

    if(!restrequest) {
        res.status(404).send({message:'ההזמנה לא יכולה להיווצר'})
    } 
    res.status(200).send(restrequest)
}

exports.list = async(req, res) => {
    const restrequest = await RestRequest.find().populate({path:'product'});
    if(!restrequest){
        res.status(500).json({success: false})
    }
    res.send(restrequest)
  
   }

   exports.BusinessOrderList = async(req, res) => {
    const restrequest = await RestRequest.find().where({business:req.params.id});
    if(!restrequest){
        res.status(500).json({success: false})
    }
    res.send(restrequest)
  
   }
 
 

exports.remove = (req, res) => {
 RestRequest.findByIdAndDelete(req.params.id).then(restrequest => {
     if(restrequest){
         return res.status(200).json({success: true, message:'המוצר נמחק'})
     } else {
         return res.status(404).json({success:false, message:'המוצר לא נמחק'})
     }
     
 }).catch(err =>{
    return res.status(400).json({success:false, err:err})
 })
}

exports.update = async(req, res) => {
    const restrequest = await RestRequest.findByIdAndUpdate(
        req.params.id,
        {
            
            status:req.body.status
        },
        {new: true}
    )
    if(!restrequest){
        res.status(500).json({success: false})
    }
    res.send(restrequest)
  
   }

   exports.restRequestById = async (req, res) => {
    const restrequest = await RestRequest.findById(req.params.id);
    if (!restrequest) {
      res.status(500).json({ message: "משתמש עם הסממן זהוי הזהה לא נמצא" });
    }
    res.send(restrequest);
  };

