const verificationAuth = async( res, req, next ) => {
    res.json({
        mensaje: 'Middleware'
    })
}

module.exports = {
    verificationAuth
}