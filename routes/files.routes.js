const { Router } = require('express')
const router = Router()
const Files = require('../models/Files')
const authMiddleware = require('../middlewaree/authMiddleware')
const uploadMiddleware = require('../middlewaree/uploadMiddleware')

router.post('/create', authMiddleware, uploadMiddleware.single('imageSrc'), async (req, res) => {

    console.log(req.file)
    try {
        const file = new Files({
            imageSrc: req.file.path,
            owner: req.user.userId
        })

        await file.save()
        res.status(201).json({message: 'File created'})

    } catch (e) {
        console.log('error: ', e)
        res.status(500).json(e)
    }

})

router.get('/', authMiddleware, async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json(e)
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {

    } catch (e) {
        res.status(400).json({ message: 'Link is not found', e })
    }
})

router.put('/', authMiddleware, async (req, res) => {
    try {

    } catch (e) {

        res.status(500).json(e)

    }

})

router.delete('/:id', authMiddleware, async (req, res) => {

    try{

    }catch(e){
        res.status(500).json(e) 
    }

})

module.exports = router
