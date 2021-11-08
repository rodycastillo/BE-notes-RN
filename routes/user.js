import express from 'express';

const router = express.Router();


import User from '../models/user'

// ROUTES

router.post('/nuevo-usuario', async(req, res)=>{
    const body = req.body;

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

module.exports = router