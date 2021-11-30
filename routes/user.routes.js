const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const config = require('config')
const moment = require('moment')
const fs = require('fs')
const User = require('../models/User')
const authMiddleware = require('../middlewaree/authMiddleware')

const router = Router()

// загружение аватара
router.post(
    '/avatar',
    authMiddleware,
    async (req, res) => {
        try {

            const file = req.files.avatar

            if (!file) {
                return res.status(400).json({ message: 'Avatar is not specified!' })
            }

            if(file){
                if(!(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')){
                    return  res.status(400).json({message: 'You can only upload a file with jpg and png extensions!'})
                }
            }

            const user = await User.findById(req.user.userId)

            if (!user) {
                return res.status(404).json({ message: 'User not found!' })
            }

            const date = moment().format('DDMMYYYY-HHmmss_SSS')
            const newFileName = date.toString()
            const type = file.name.split('.').pop()
    
            const path = `${config.get('avatarPath')}/${newFileName}.${type}`

            if (fs.existsSync(path)) {
                return res.status(404).json({ message: 'There is no such file on the disk!' })
            }

            file.mv(path)

            user.avatar = `${newFileName}.${type}`

            user.save()

            return res.status(200).json({ message: 'succes', user: user })

        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
)

// изменение аватара
router.put(
    '/avatar',
    authMiddleware,
    async (req, res) => {
        try {

            const { id } = req.body

            if (!id) {
                return res.status(400).json({ message: 'Id is not specified!' })
            }

            const file = req.files.avatar

            if (!file) {
                return res.status(400).json({ message: 'Avatar is not specified!' })
            }

            const user = await User.findById(id)

            if (!user) {
                return res.status(404).json({ message: 'User not found!' })
            }

            const path = `${config.get('avatarPath')}/${user.avatar}`

            if (!fs.existsSync(path)) {
                return res.status(404).json({ message: 'There is no such file on the disk!' })
            }

            fs.unlinkSync(path);

            file.mv(path)

            return res.status(200).json({ message: 'succes', user: user })

        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
)

// удаление аватара
router.delete(
    '/avatar/delete/:id',
    authMiddleware,
    async (req, res) => {
        try {

            const { id } = req.params

            if (!id) {
                return res.status(400).json({ message: 'Id is not specified!' })
            }

            const user = await User.findById(id)

            if (!user) {
                return res.status(404).json({ message: 'User not found!' })
            }

            const path = `${config.get('avatarPath')}/${user.avatar}`

            if (!fs.existsSync(path)) {
                return res.status(404).json({ message: 'There is no such file on the disk!' })
            }

            fs.unlinkSync(path);

            user.avatar = null

            user.save()

            return res.status(200).json({ message: 'succes', user: user })

        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
)

// редактирование пароля
router.put(
    '/password',
    authMiddleware,
    [
        check('email', 'Incorrect email').isEmail(),
        check('newPassword', 'Minimum password length 6 characters')
            .isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }

            const { id, email, oldPassword, newPassword } = req.body

            if (!id) {
                return res.status(400).json({ message: 'id is not specified!' })
            }

            if (!email) {
                return res.status(400).json({ message: 'Email is not specified!' })
            }


            const user = await User.findOne({ email: email, id: id })

            if (!user) {
                return res.status(404).json({ message: 'User not found!' })
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password)

            if (!isMatch) {
                res.status(400).json({ message: 'Incorrect password' })
            }

            const hashedPassword = await bcrypt.hash(newPassword, 13)

            user.password = hashedPassword

            user.save()

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false, 
                port: 25,
                auth: {
                    user: config.get('userMail'),
                    pass: config.get('passwordMail')
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const mailOptions = {
                from: config.get('userMail'),
                to: email,
                subject: 'Сhange Password',
                text: `Your password has been successfully updated. If it wasn't you, then please reset your password !!!`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                console.log(err, info);
            })

            return res.status(200).json({ message: 'succes', user: user })

        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
)



module.exports = router