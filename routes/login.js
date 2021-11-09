const express = require('express');
const router = express.Router();
import User from '../models/user';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async(req, res) => {
    const body = req.body;
  try {
      const userDb = await User.findOne({email: body.email})
      if(!userDb) {
        return res.status(500).json({
            mensaje: 'Email incorrecto'
        })
      }
      if(!bcrypt.compareSync(body.password, userDb.password)){
        return res.status(500).json({
            mensaje: 'Contraseña incorrecta'
        })
      }

      const token = jwt.sign({
          data: userDb,
      }, 'c4rl!t0C4zt!110', { expiresIn: 60*60*24*3  })

      res.json({
          userDb,
          token
      })

  } catch (error) {
      return res.status(500).json({
          mensaje: 'Ocurrio un error',
          error
      })
  }
})

module.exports = router;
