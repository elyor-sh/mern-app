const {Router}  = require('express')
const router = Router()
const Link = require('../models/Link')
const authMiddleware = require('../middlewaree/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    const {link, date} = req.body

    const isExistLink = await Link.findOne({link})

    if(isExistLink){
       return res.status(400).json({message: 'Link already exists'})
    }

    const newLink = new Link({link: link, date: date})

    await newLink.save()

    res.status(200).json({message: 'Link created'})

})

router.get('/', authMiddleware, async (req, res) => {

    const links = await Link.find()

    res.status(200).json({items: links, message: 'success'})

})

router.get('/:id', authMiddleware,  async (req, res) => {

})

router.put('/:id', authMiddleware, async (req, res) => {

})

router.delete('/:id', authMiddleware, async (req, res) => {

})


module.exports = router

