const Sequelize = require('sequelize');
const sequelize = require('../utils/Database.js')


const Contact = sequelize.define("contact",{
    contact_id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    first_name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    contact_no: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email_address: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = Contact;