const router = require('express').Router();
const contactsController = require('../controllers/contactsControllers')

//endpoint to greet the user
router.get('/',(req,res)=>{
    res.status(200).send('Welcome to contacts app!')
})

//endpoint to create a contact
router.post('/create-contact',contactsController.createContact)

//endpoint to delete a contact
router.delete('/delete-contact',contactsController.deleteContact)

//endpoint to update a contact
router.patch('/update-contact',contactsController.updateContact)

//endpoint to get list of contacts
router.get('/list-of-contacts', contactsController.getListOfContacts)

//endpoint to get a specific contact by contact id
router.get('/get-contact',contactsController.getContact)

module.exports = router;