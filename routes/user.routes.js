const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const moment = require('moment')
const fs = require('fs')
const User = require('../models/User')
const authMiddleware = require('../middlewaree/authMiddleware')
const mailer = require('../nodemailer')
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
    
            const path = `${req.filePath}/${newFileName}.${type}`

            if (fs.existsSync(path)) {
                return res.status(404).json({ message: 'There is no such file on the disk!' })
            }

            file.mv(path)

            user.avatar = `${newFileName}.${type}`

            user.save()

            return res.status(200).json({ message: 'success', user: {userId: user.id, userName: user.name, avatar: user.avatar, userEmail: user.email} })

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

            const date = moment().format('DDMMYYYY-HHmmss_SSS')
            const newFileName = date.toString()
            const type = file.name.split('.').pop()
    
            const newPath = `${req.filePath}/${newFileName}.${type}`

            const oldPath = `${req.filePath}/${user.avatar}`

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            file.mv(newPath)

            user.avatar = `${newFileName}.${type}`

            user.save()

            return res.status(200).json({ message: 'success',  user: {userId: user.id, userName: user.name, avatar: user.avatar, userEmail: user.email} })

        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
)

// забрать юзера
router.get(
    '/',
    authMiddleware,
    async (req, res) => {
        try {

            const user = await User.findById(req.user.userId)

            if(!user){
                return res.status(404).json({message: 'User not found!'})
            }

            return res.status(200).json({ message: 'success', user: {userId: user.id, userName: user.name, avatar: user.avatar, userEmail: user.email} })

        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
)


// удаление аватара
router.delete(
    '/avatar/:id',
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

            const path = `${req.filePath}/${user.avatar}`

            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }

            user.avatar = null

            user.save()

            return res.status(200).json({ message: 'success', user: {userId: user.id, userName: user.name, avatar: user.avatar, userEmail: user.email} })

        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
)

// редактирование имя юзера
router.put(
    '/',
    authMiddleware,
    [
        check('newEmail', 'Incorrect email').isEmail(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect email'
                })
            }

            const { id, oldEmail, newEmail, name } = req.body

            if (!id) {
                return res.status(400).json({ message: 'id is not specified!' })
            }

            if(name.length < 3){
                return res.status(400).json({ message: 'Name must be at least 3 digits long!' })
            }

            const user = await User.findOne({ email: oldEmail, id: id })

            if (!user) {
                return res.status(404).json({ message: 'User not found!' })
            }

           user.name = name
           user.email = newEmail

            user.save()

            const textForEmail = `Your email has been successfully updated. If it wasn't you, then please reset your email password !!!`

            //отправка сообщений на почту
           await mailer(newEmail, 'Сhange Datas', textForEmail)

            return res.status(200).json({ message: 'success', user: {userId: user.id, userName: user.name, avatar: user.avatar, userEmail: user.email} })

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

            const textForEmail = `Your password has been successfully updated. If it wasn't you, then please reset your password !!!`

            //отправка сообщений на почту
            mailer(email, 'Сhange Password', textForEmail)

            return res.status(200).json({ message: 'success', user: {userId: user.id, userName: user.name, avatar: user.avatar, userEmail: user.email} })

        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
)



module.exports = router