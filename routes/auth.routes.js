const {Router}  = require('express')
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const moment = require('moment')

const router = Router()

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 6 characters')
            .isLength({min: 6}),
    ],
    async (req, res) => {
        console.log('auth params', req.body)
    try {

        const file = req.files.avatar

        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        const newFileName = date.toString()
        const type = file.name.split('.').pop()

        console.log('files:::', file, 'type:::', type);

        const path = `${config.get('avatarPath')}/${newFileName}.${type}`

        if(file){
            if(!(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')){
                return  res.status(400).json({message: 'You can only upload a file with jpg and png extensions!'})
            }
        }

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

        if(file){
            file.mv(path)
        }
        
        const user = new User({name: name, email: email, password: hashedPassword, avatar: file ? `${newFileName}.${type}` : null})

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

            res.json({token, userId: user.id, userName: user.name, avatar: user.avatar, userEmail: user.email})
    
            
        } catch (error) {
            res.status(500).json({message: 'Server error, try again'})
        }
})

router.delete(
    '/deleteAvatar/:id',

    async (req, res) => {
            try{
        
                const {id} = req.params
        
                if(!id){
                    return res.status(400).json({message: 'Id is not specified!'})
                }
        
                const user = await User.findById(id)
        
                const path = `${config.get('avatarPath')}/${user.avatar}`
        
                fs.unlinkSync(path);
            
                user.avatar = null

                user.save()
            
                return res.status(200).json({message: 'succes', user: user})
        
            }catch(e){
                console.log(e);
                res.status(500).json(e) 
            }
    }
)

module.exports = router