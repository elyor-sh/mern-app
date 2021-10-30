const {Router}  = require('express')
const router = Router()
const Link = require('../models/Link')

router.post('/create', async (req, res) => {

    const {link, date} = req.body

    const isExistLink = await Link.findOne({link})

    if(isExistLink){
       return res.status(400).json({message: 'Link already exists'})
    }

    const newLink = new Link({link: link, date: date})

    await newLink.save()

    res.status(200).json({message: 'Link created'})

})

router.get('/', async (req, res) => {

})

router.get('/:id', async (req, res) => {

})

router.put('/:id', async (req, res) => {

})

router.delete('/:id', async (req, res) => {

})


module.exports = router

