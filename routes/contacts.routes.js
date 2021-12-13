const { Router } = require('express')
const router = Router()
const Contacts = require('../models/Contacts')
const authMiddleware = require('../middlewaree/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const { name, number} = req.body

        if(!name){
            return res.status(400).json({ message: 'Field name cannot be empty!' })
        }

        if(!number){
            return res.status(400).json({ message: 'Field number cannot be empty!' })
        }

        const isExistContact = await Contacts.findOne({ name, number, owner: req.user.userId })

        if (isExistContact) {
            return res.status(400).json({ message: 'Contats already exists' })
        }

        const newContact = new Contacts({ name: name, number: number,  owner: req.user.userId })

        await newContact.save()

        res.status(200).json({ message: 'Contact created', contact: newContact })

    } catch (e) {
        console.log(e);
        res.status(500).json(e)
    }

})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const contacts = await Contacts.find({owner: req.user.userId})

        res.status(200).json({ items: contacts, message: 'Success' })

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

        const contact = await Contacts.findById(id)

        res.status(200).json({ items: contact, message: 'Success' })

    } catch (e) {
        res.status(400).json({ message: 'Contact is not found', e })
    }
})

router.put('/', authMiddleware, async (req, res) => {
    try {
        const {id, number, name} = req.body

        if (!id) {
            res.status(400).json({ message: 'Id is not specified!' })
        }

        if(!number){
            res.status(400).json({ message: 'Field number is required!' })
        }

        if(!name){
            res.status(400).json({ message: 'Field name is required!' })
        }

        const newContact = {number, name}

        const updatedContact = await Contacts.findByIdAndUpdate(id, newContact, { new: true })

        return res.status(200).json({ items: updatedContact, message: 'Success' })

    } catch (e) {

        res.status(500).json(e)

    }

})

router.delete('/:id', authMiddleware, async (req, res) => {

    try{

        const {id} = req.params

        if(!id){
            return res.status(400).json({message: 'Id is not specified!'})
        }

        const deletedContact = await Contacts.findByIdAndDelete(id)

        return res.status(200).json({message: 'Success', deletedContact: deletedContact})

    }catch(e){
        res.status(500).json(e) 
    }

})


module.exports = router
