import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// conetion to db
const mongoose = require('mongoose');

// const dbConnection = async () => {
//   try {
//     await mongoose.connect( process.env.MONGODB_CNN, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false
 
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect('mongodb+srv://carlo1999:A3zyGcgEC1hyV3Uf@notas.cx3ue.mongodb.net/carlo1999', options).then(
  /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { console.log('Connected a DB') },
  /** handle initial connection error */
  err => { console.log(err) }
);

// const Server = require('./models/server');


// const server = new Server();

// server.listen();


// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/user'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.set('port', process.env.PORT || 2021)
app.listen(app.get('port'), () => {
    console.log(`Listen in port http://localhost:${app.get('port')}`);
})