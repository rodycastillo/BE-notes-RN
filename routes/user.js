import express from 'express';

const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Filter camps of user
const _ = require('underscore');

import User from '../models/user'

const { verificationAuth } = require('../middlewares/auth')

// ROUTES

router.post('/nuevo-usuario', async(req, res)=>{
    const body = {
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.role
    };

    body.password = bcrypt.hashSync(req.body.password, saltRounds)

    try {
        const userDB = await User.create(body)
        return res.json(userDB)
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})

router.put('/usuario/:id', verificationAuth, async(req, res) => {
    const _id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'email', 'password', 'active'])

    if(body.password) {
        body.password = bcrypt.hashSync(req.body.password, saltRounds)
    }

    try {
        const userDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true})
        return res.json(userDB)
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
})

module.exports = router