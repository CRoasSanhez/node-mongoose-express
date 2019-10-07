const express        = require('express');
const cookieParser 	 = require('cookie-parser');
const logger 		     = require('morgan');
const cors 			     = require('cors')
const app            = express();
const dotenv         = require('dotenv');
const port           = process.env.PORT || 4300;


const RouterV1       = require('./routes/v1/routerV1');
require('./init')();
const Authentication = require('./middleware/v1/authentication');

dotenv.config();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use('/api/v1',Authentication);
app.use('/api/v1', RouterV1);

app.listen( port, ()=> {
  console.log( `server is up to port ${port} 🔥  🚀  💀`)
})

module.exports = app;