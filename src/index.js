const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
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