const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require ("dotenv").config();

const app = express();
const {pool} = require('./controllers/index.controller');
const port = 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(morgan('dev'));
// router
app.use(require('./routes/index'));

app.listen(port);
console.log("Server on port "+port);
if(!pool){
    console.log('bd error connect');
}else{
    console.log('database pg online');
}