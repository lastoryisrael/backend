const express = require('express')
const router = express.Router()


const { create,read,update,remove,list,totalSales,count,BusinessOrderList }  = require("../controllers/order");

router.post('/order', create)
router.get('/order/:id',read);
router.get('/orders',list);
router.get('/get/totalsales',totalSales);
router.get('/get/count',count);
router.get('/orderbusiness/:id',BusinessOrderList);
router.put('/order/:id', update)
router.delete('/order/:id', remove)


module.exports = router