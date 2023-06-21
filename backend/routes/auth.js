const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const JWT_SECERET = "Parthilisgoodboy"
const fetchuser=require('../middleware/fetchuser')

router.post('/createuser', [
    body('password').isLength({ min: 2 }),
    body('name', "Enter valid name").isLength({ min: 3 }),
    body('email').isEmail(),

], async (req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({ status: "Failed", message: "Entered email is alerady exists" })
        }
        else {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            else {
                var salt = await bcrypt.genSaltSync(10);
                var secPass = await bcrypt.hashSync(req.body.password, salt);
                const user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass
                })
                await user.save()
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, JWT_SECERET)

                res.status(201).json({ status: "success", token: authToken })
            }
        }
    }
    catch (err) {
        res.status(500).json({ status: "failed", message: err.message })
    }

})


router.post('/login', [
    body('password',"Password cananot be blank").isLength({ min: 1}),
    body('email',"plz enter the valid email").isEmail(),

], async (req, res) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        else{
            const {email,password}=req.body
            let user = await User.findOne({ email})
            if(!user){
                return res.status(400).json({status:"failed",error:"plz enter the correct login credentials"})
            }
            const passwordCompare=await bcrypt.compare(password,user.password)

            console.log(passwordCompare)
            if(passwordCompare){
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, JWT_SECERET)
    
                res.status(201).json({ status: "success", token: authToken })
            }
            else{
                return res.status(400).json({status:"failed",error:"plz enter the correct login credentials"})
            }

        }
    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message })
    }
})


router.get('/getuser',fetchuser,async (req, res) => {
    try {
        console.log(req.user)
        const userId=req.user.id
        const user=await User.findById(userId).select("-password")
        res.json(user)
        
    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message })

    }
})

module.exports = router