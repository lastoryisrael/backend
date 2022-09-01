const express = require('express')
const router = express.Router()


const { signin, signup, list, count, userById, forgot, reset}  = require("../controllers/user");

router.post('/signin', signin)
router.post('/signup',signup);
router.get('/users',list);
router.get('/user/:id',userById);
router.get('/users/count',count);
router.post('/forgot',forgot);
router.post('/reset',reset);


module.exports = router