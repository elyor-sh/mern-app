const {Router} = require('express');
const config = require('config')
const fs = require('fs')
const Files = require('../models/Files');
const authMiddleware = require('../middlewaree/authMiddleware');

const router = Router()

router.get('/', authMiddleware, async (req, res) => {

    try{
        const id = req.query.id

        const file = await Files.findById(id)

        if(!file){
            return res.status(404).json({message: 'File not found'})
        }

        const path = `${config.get('staticPath')}/${file.name}.${file.type}`


        if (!fs.existsSync(path)) {
            return res.status(404).json({ message: 'File not found' });
        }

        return res.download(path, file.name)

    }catch(e){
        console.log(e);
        res.status(500).json(e) 
    }

})

module.exports = router