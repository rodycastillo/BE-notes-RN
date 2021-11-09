const jwt = require('jsonwebtoken');

const verificarAuth = (req, res, next) => {
    // Leer headers
  const token = req.get('token')

  jwt.verify(token, 'c4rl!t0C4zt!110', (err, decoded) => {

    if(err){
      return res.status(401).json({
        mensaje: 'Usuario no válido'
      })
    }

    req.usuario = decoded.data;
    next();

    })
}

module.exports = {
    verificarAuth
}