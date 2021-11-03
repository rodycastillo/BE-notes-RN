import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// conetion to db
const mongoose = require('mongoose');

const uri = 'mongodb+srv://carlo1999:A3zyGcgEC1hyV3Uf@notas.cx3ue.mongodb.net/carlo1999'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(uri, options).then(
  /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { console.log('Connected a DB') },
  /** handle initial connection error */
  err => { console.log(err) }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/nota'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.set('port', process.env.PORT || 1999)
app.listen(app.get('port'), () => {
    console.log(`Listen in port http://localhost:${app.get('port')}`);
})