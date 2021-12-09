const {Router}  = require('express')
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Candidate = require('../models/Candidate')
const mailer = require('../nodemailer')

const router = Router()

router.post(
    '/checkRegister',
    [
        check('email', 'Incorrect email').isEmail(),
    ],
    async (req, res) => {
        try{

            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect email'
                })
            }

            const {email, url} = req.body

            if(!url){
                return res.status(400).json({message: 'Url is not specified'})
            }

            const uniqueKey = uuidv4()

            const candidate = new Candidate({uniqueKey: uniqueKey, email: email })

            await candidate.save()

            // сообщение на почту
            const textForEmail = `Registration message, please confirm!`

            const html = `
                <div>
                    <h2 style="text-align: center; padding: 0px 0px 10px;">Please, confirm your email</h2>
                    <div>
                    <h1 style="text-align: center; padding: 10px 0px;">
                        <a 
                            style="background: #3c2eff; color: #fff; padding: 5px 20px 6px; border-radius: 5px;" 
                            href=${url}?key=${uniqueKey}&email=${email}
                        >
                            Confirm
                        </a>
                    </h1>
                    </div>
                </div>
            `

            //отправка сообщений на почту
           await mailer(email, 'Confirmation message', textForEmail, html)

           return res.status(200).json({message: 'Confirmation message is send to your email, please check your email!'})

        }catch(err){
            console.log(err)
            res.status(500).json({message: 'Server error, try again', error: err}) 
        }
    })

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

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }

        const file = req.files ? req.files.avatar : null

        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        const newFileName = date.toString()
        const type = file ? file.name.split('.').pop() : 'jpg'

        console.log('files:::', file, 'type:::', type);

        const path = `${req.filePath}/${newFileName}.${type}`

        if(file){
            if(!(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')){
                return  res.status(400).json({message: 'You can only upload a file with jpg and png extensions!'})
            }
        }

        const {name, email, password, uniqueKey} = req.body

        if(!uniqueKey){
            return res.status(400).json({message: 'Not unique key'})
        }

        const candidate = await Candidate.findOne({uniqueKey: uniqueKey, email: email})

        if(!candidate){
            return  res.status(400).json({message: 'Candidate not found'})
        }
        

        const newCandidate = await User.findOne({email})

        if(newCandidate){
          return  res.status(400).json({message: 'Such user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 13)

        if(file){
            file.mv(path)
        }
        
        const user = new User({name: name, email: email, password: hashedPassword, avatar: file ? `${newFileName}.${type}` : null})

        await user.save()

        await Candidate.findByIdAndDelete(candidate._id)

        res.status(201).json({message: 'User created'})

        
    } catch (error) {
        console.log(error)
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

module.exports = router