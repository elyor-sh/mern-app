const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const config = require('config')
const User = require('../models/User')
const authMiddleware = require('../middlewaree/authMiddleware')

const router = Router()

// удаление аватара
router.delete(
    '/deleteAvatar/:id',
    async (req, res) => {
        try {

            const { id } = req.params

            if (!id) {
                return res.status(400).json({ message: 'Id is not specified!' })
            }

            const user = await User.findById(id)

            const path = `${config.get('avatarPath')}/${user.avatar}`

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