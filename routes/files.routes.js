const { Router } = require('express')
const config = require('config')
const moment = require('moment')
const fs = require('fs')
const router = Router()
const Files = require('../models/Files')
const authMiddleware = require('../middlewaree/authMiddleware')
const uploadMiddleware = require('../middlewaree/uploadMiddleware')

router.post('/create', authMiddleware, async (req, res) => {
    try {

        const file = req.files.file

        const date = moment().format('DDMMYYYY-HHmmss_SSS')     

        const type = file.name.split('.').pop()

        const newFileName = date.toString()

        const path = `${config.get('staticPath')}/${newFileName}.${type}`

        if (fs.existsSync(path)) {
            return res.status(400).json({ message: 'File already exist' });
          }

        file.mv(path)

        const dbFile = new Files({
            name: newFileName,
            type: type,
            owner: req.user.userId
        })

        await dbFile.save()
        res.status(201).json({message: 'File created', items: dbFile})

    } catch (e) {
        console.log('error: ', e)
        res.status(500).json(e)
    }

})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const files = await Files.find({owner: req.user.userId})
        console.log('files', files, 'id', req.user.userId);
        res.status(200).json({ items: files, message: 'Success' })

    } catch (e) {
        // res.status(500).json(e)
        console.log('err');
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const {id} = req.params

        if (!id) {
            return res.status(400).json({ message: 'Id is not specified!' })
        }

        const file = await Files.findById(id)

        res.status(200).json({ items: file, message: 'Success' })

    } catch (e) {
        res.status(400).json({ message: 'File is not found', e })
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {

    try{

        const {id} = req.params

        if(!id){
            return res.status(400).json({message: 'Id is not specified!'})
        }

        const file = await Files.findById(id)

        const path = `${config.get('staticPath')}/${file.name}.${file.type}`

        fs.unlinkSync(path);
    
        const deletedFile = await Files.findByIdAndDelete(id)
    
        return res.status(200).json({message: 'succes', deletedFile: deletedFile})

    }catch(e){
        console.log(e);
        res.status(500).json(e) 
    }

})

module.exports = router
