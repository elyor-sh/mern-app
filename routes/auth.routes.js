const {Router}  = require('express')
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')

const router = Router()

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 6 characters')
            .isLength({min: 6}),
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }

        const {name, email, password} = req.body

        const candidate = await User.findOne({email})

        if(candidate){
          return  res.status(400).json({message: 'Such user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 13)
        
        const user = new User({name: name, email: email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'User created'})

        
    } catch (error) {
        res.status(500).json({message: 'Server error, try again'})
    }
})

router.post(
    '/login',
    [
        check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
        check('password', 'Please enter password').exists(),
        check('name', 'Please enter name').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
    
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }

            const {name, email, password} = req.body

            const user = await User.findOne({name, email})

            if(!user){
                return res.status(400).json({message: 'User is not found'})
            }
    
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                res.status(400).json({message: 'Incorrect password'})
            }
            
            const token = jwt.sign(
                { userId: user.id, userName: user.name},
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({token, userId: user.id, userName: user.name})
    
            
        } catch (error) {
            res.status(500).json({message: 'Server error, try again'})
        }
})

module.exports = router