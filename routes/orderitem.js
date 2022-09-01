const express = require('express')
const router = express.Router()


const { create,BusinessOrderList,remove,list,update }  = require("../controllers/orderitem");

router.post('/orderitem', create)
// router.get('/orderitem/:id',read);
router.get('/orderitems',list);
router.get('/orderitems/:id',BusinessOrderList);
router.put('/orderitem/:id', update)
router.delete('/orderitem/:id', remove)


module.exports = router