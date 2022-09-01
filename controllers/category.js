
const Category = require('../models/category');

//create category
exports.create = async(req, res) => {
    let category = new Category({
        name:req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category) {
        res.status(404).send({message:'הקטגוריה לא יכולה להיווצר'})
    } 
    res.status(200).send(category)
}

// read a product
exports.read = async(req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category) {
        res.status(500).json({message:'הקטגוריה לא נמצאה'})
    } else{
        res.status(200).send(category)
    }
    
}
// read products
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
       if(err) {
           return res.status(400).json({
               error: err
           })
       }
       res.json(data)
    })
   }
   exports.update = async(req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        {new: true}
        )
        if(!category) {
            res.status(404).send({message:'הקטגוריה לא יכולה להיווצר'})
        } 
        res.status(200).send(category)
    

}
//delete category
exports.remove = (req, res) => {
 Category.findByIdAndDelete(req.params.id).then(category => {
     if(category){
         return res.status(200).json({success: true, message:'הקטגוריה נמחקה'})
     } else {
         return res.status(404).json({success:false, message:'הקטגוריה לא נמצאה'})
     }
     
 }).catch(err =>{
    return res.status(400).json({success:false, err:err})
 })
}


  