const Contact = require('../models/ContactModel');

const createContact = async (req,res)=>{
    var contactNo = req.body.contact_no;
    var emailAddress = req.body.email_address;
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    if(contactNo && emailAddress && firstName && lastName)
    {
       Contact.create({
          first_name:  firstName,
          last_name:  lastName,
          contact_no: contactNo,
          email_address: emailAddress.toLowerCase(),
          
       }).then((result)=>{
           console.log(result);
           if(result){
               res.status(200).json({
                   'status': true,
                   'message': 'contact created successfully.',
                   'data': result,
               })
           }
           else{
            res.status(200).json({
                'status': true,
                'message': 'something went wrong.',
            })
           }
       }).catch((err)=>{
           console.log(err);
           res.status(200).json({
            'status': false,
            'message': 'failed to create a contact.'
        })
       })
    }
    else{
        res.status(400).json({
            'status': false,
            'message': 'Please provide all the necessary fields'
        })
    }

}

const deleteContact = async (req,res)=>{
    var contactId = req.body.contact_id;

    if(contactId != undefined)
    {
        await Contact.destroy({
            where: {
                contact_id: contactId
            }
        }).then((result)=>{
            console.log(result);
            if(result){
                res.status(200).json({
                    'status': true,
                    'message': 'contact deleted successfully.',
                })
            }
            else{
                res.status(200).json({
                    'status': true,
                    'message': 'something went wrong.',
                })
            }
        }).catch((err)=>{
            console.log(err);
            res.status(200).json({
             'status': false,
             'message': 'failed to delete a contact.'
         })
        })
    }
    else{
        res.status(400).json({
            'status': false,
            'message': 'Please provide the contact Id.'
        })
    }
}

const updateContact = async (req,res)=>{
    var contactId = req.body.contact_id;
    var newContactNo = req.body.contact_no;
    if(contactId != undefined)
    {
        await Contact.update({contact_no: newContactNo},{
            where: {
                contact_id: contactId
            }
        }).then((result)=>{
            console.log(result);
            if(result){
                res.status(200).json({
                    'status': true,
                    'message': 'contact updated successfully.',
                })
            }
            else
            {
                res.status(200).json({
                    'status': true,
                    'message': 'something went wrong.',
                })
            }
        }).catch((err)=>{
            console.log(err);
            res.status(200).json({
             'status': false,
             'message': 'failed to update a contact.'
         })
        })
    }
    else{
        res.status(400).json({
            'status': false,
            'message': 'Please provide the contact id and the new contact number.'
        })
    }

}

const getListOfContacts = async (req,res)=>{
    await Contact.findAll({
        order: [
            ['contact_id','ASC']
        ]
    })
    .then((result)=>{
        console.log(result);
        if(result.length != 0){
            res.status(200).json({
                'status': true,
                'message': 'contacts fetched successfully.',
                'contacts': result
            })
        }
        else
        {
            res.status(200).json({
                'status': true,
                'message': 'no contacts found.',
                'contacts': result
            })
        }
    }).catch((err)=>{
        console.log(err);
        res.status(200).json({
         'status': false,
         'message': 'failed to fetch contacts.'
     })
    })
}

const getContact = async (req,res)=>{
    var contactId = req.query.contact_id;
    if(contactId != undefined)
    {
        await Contact.findOne({where:{contact_id: contactId}})
        .then((result)=>{
            console.log(result);
            if(result){
                res.status(200).json({
                    'status': true,
                    'message': 'contact fetched successfully.',
                    'data': result
                })
            }
        }).catch((err)=>{
            console.log(err);
            res.status(200).json({
             'status': false,
             'message': 'failed to fetch the contact.'
         })
        })
    }
    else{
        res.status(400).json({
            'status': false,
            'message': 'Please provide the contact id.'
        })
    }
}

module.exports = {
    createContact,
    deleteContact,
    updateContact,
    getListOfContacts,
    getContact

}