const express = require('express')
const router = express.Router()


const { create,read,update,remove,list }  = require("../controllers/business");

router.post('/business', create)
router.get('/business/:id',read);
router.get('/businesslist',list);
router.put('/business/:id', update)
router.delete('/business/:id', remove)


module.exports = router