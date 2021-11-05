const { Router } = require('express')
const router = Router()
const Link = require('../models/Link')
const authMiddleware = require('../middlewaree/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const { link, date } = req.body

        const isExistLink = await Link.findOne({ link })

        if (isExistLink) {
            return res.status(400).json({ message: 'Link already exists' })
        }

        const newLink = new Link({ link: link, date: date })

        await newLink.save()

        res.status(200).json({ message: 'Link created' })

    } catch (e) {
        res.status(500).json(e)
    }

})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const links = await Link.find()

        res.status(200).json({ items: links, message: 'Success' })

    } catch (e) {
        res.status(500).json(e)
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'Id is not specified!' })
        }

        const link = await Link.findById(id)

        res.status(200).json({ items: link, message: 'Success' })

    } catch (e) {
        res.status(400).json({ message: 'Link is not found', e })
    }
})

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const link = req.body

        if (!link._id) {
            res.status(400).json({ message: 'Id is not specified!' })
        }

        const updatedLink = await Link.findByIdAndUpdate(post._id, post, { new: true })

        return res.json({ items: updatedLink, message: 'Success' })

    } catch (e) {

        res.status(500).json(e)

    }

})

router.delete('/:id', authMiddleware, async (req, res) => {

    try{

        const id = req.params

        if(!id){
            return res.status(400).json({message: 'Id is not specified!'})
        }

        const deletedLink = await Link.findByIdAndDelete(id)

        return res.status(200).json({message: 'succes', deletedLink})

    }catch(e){
        res.status(500).json(e) 
    }

})


module.exports = router

