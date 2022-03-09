const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const guard = require('express-jwt-permissions')();
const dotEnv = require('dotenv').config();
const sequelize = require('./utils/Database');
const contactRoutes = require('./routes/contactRoutes');



//express app
var app = express();

//loading port number from .env file
const PORT = process.env.PORT

//middlewares
app.use(bodyParser.json())
app.use(cookieParser())


//middleware which checks whether the incoming token is from the auth0 provider or not
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-rh2hz-ym.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://www.contacts-api.com',
  issuer: 'https://dev-rh2hz-ym.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);


app.use('/contacts',contactRoutes);

//middleware for 404 page
app.use((req,res)=>{
    res.status(404).json({
        'error_code':'404',
        'message':'Page not found',
    });
})

sequelize.sync().then((connection)=>{
    console.log('connected to the Postgres SQL Database')
    app.listen(PORT,()=>{
        console.log('The contacts app is started successfully and running on the PORT : '+ PORT);
    })
}).catch((err)=>{
    console.log(err)
})

