import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

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