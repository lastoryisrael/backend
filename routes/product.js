const express = require('express')
const router = express.Router()
const Product = require('../models/product');
const Category = require('../models/category');
const Business = require('../models/business');
const mongoose = require('mongoose')
const { read,update,remove,list,count, featured, productsByBusiness }  = require("../controllers/product");



const multer = require('multer');


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('סוג הקובץ לא מתאים')
        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
       
      const fileName = file.originalname.split(' ').join('-');
      const extension =  FILE_TYPE_MAP[file.mimetype]
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
  var uploadOptions = multer({ storage: storage })

router.post('/product',uploadOptions.single('image'), async(req, res) => {
    console.log(req.body)
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('קטגוריה לא נכונה')

    const file = req.file;
    if(!file) return res.status(400).send('אין תמונה')
    const fileName = req.file.filename
    const basePath =`${req.protocol}://${req.get('host')}/public/uploads/`

    let product = new Product({
        name:req.body.name,
        description: req.body.description,
        richdescription: req.body.richdescription,
        image: `${basePath}${fileName}`,
        price: req.body.price,
        category: req.body.category,
        countinstock: req.body.countinstock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        business: req.body.business
    })
    product = await product.save();

    if(!product) {
        return res.status(404).send({message:'המוצר לא יכולה להיווצר'})
    } 
    res.send(product)
})

router.put('/product/:id',uploadOptions.single('image'), async(req, res) => {
    console.log(req.body)
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('קטגוריה לא נכונה')

    const business = await Business.findById(req.body.business);
    if(!business) return res.status(400).send('עסק לא נכונה')

    const file = req.file;
    if(!file) return res.status(400).send('אין תמונה')
    const fileName = req.file.filename
    const basePath =`${req.protocol}://${req.get('host')}/public/uploads/`

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
        name:req.body.name,
        description: req.body.description,
        richdescription: req.body.richdescription,
        image: `${basePath}${fileName}`,
        price: req.body.price,
        category: req.body.category,
        countinstock: req.body.countinstock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        business: req.body.business
        },
        {new: true}
        )
        if(!product) {
            res.status(404).send({message:'הקטגוריה לא יכולה להתעדכן'})
        } 
        res.status(200).send(product)
    

}
)

router.get('/product/:id',read);
router.get('/productbybusiness/:id',productsByBusiness);
router.get('/products',list);
router.get('/products/count',count);
router.get('/products/featured/:count',featured);
// router.put('/product/:id', update)

router.put('/gallery-images/:id',
uploadOptions.array('images', 10),
async(req, res)=>{
if(!mongoose.isValidObjectId(req.params.id)){
    return res.status(400).send('קוד מוצר לא נכון')
}
const files = req.files
let imagesPaths = []
const basePath =`${req.protocol}://${req.get('host')}/public/uploads/`
if(files){
    files.map(file => {
        imagesPaths.push(`${basePath}${file.fileName}`);
    })
}

const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
        images: imagesPaths
    },
    {new:true}
)
        if(!product) {
            return res.status(404).send({message:'המוצר לא יכולה להיווצר'})
        } 
        res.send(product)

})





router.delete('/product/:id', remove)


module.exports = router