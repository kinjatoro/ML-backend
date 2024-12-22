const express = require('express');
const cookieParser = require('cookie-parser');
const bluebird = require('bluebird');
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api'); // Custom

const app = express();
app.use(express.json());


//test
app.use(cors())


app.use('/api', apiRouter);
app.use('/', indexRouter);

if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}

const mongoose = require('mongoose');
mongoose.Promise = bluebird;
const url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`;
const opts = {
  useNewUrlParser: true,
  connectTimeoutMS: 20000,
  useUnifiedTopology: true,
};

mongoose.connect(url, opts)
  .then(() => {
    console.log(`Conexión exitosa a la base de datos de MongoDB.`);
  })
  .catch((e) => {
    console.log(`Error al conectar a la base de datos de MongoDB...`);
    console.log(e);
  });

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function () {
  console.log(`Express está escuchando en el puerto ${port}`);
});

module.exports = app;
