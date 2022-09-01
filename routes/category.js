const express = require('express')
const router = express.Router()


const { create,read,update,remove,list }  = require("../controllers/category");

router.post('/category', create)
router.get('/category/:id',read);
router.get('/categories',list);
router.put('/category/:id', update)
router.delete('/category/:id', remove)


module.exports = router