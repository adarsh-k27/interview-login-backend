const { Router } = require('express')
const express=require('express')
const { SignUp, SignIn, AddDetails } = require('../collection/user')

const router=express.Router()

router.post('/sign-up',SignUp)
router.get('/sign-in',SignIn)
router.put('/update',AddDetails)
module.exports=router;