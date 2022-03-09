const Sequelize = require('sequelize');

//pg database connection using sequelize
const sequelize = new Sequelize(process.env.DB,process.env.DB_USERNAME,process.env.DB_USER_PASSWORD,{
    dialect: "postgres",
    host:"localhost",
    port: process.env.DB_PORT
})

module.exports = sequelize;