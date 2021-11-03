import express from 'express'
const router = express.Router()

// import nota module

import Nota from '../models/nota'

// Add nota

router.post('/nueva-nota', async(req, res) => {
    const body = req.body;
    try {
        const notaDB = await Nota.create(body)
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
})


// Get with params

router.get('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const notaDB = await Nota.findOne({_id})
        res.json(notaDB)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'El usuario no existe',
            error
        });
    }
})

// Get all documents

router.get('/notas', async(req, res) => {
    try {
        const notasDB = await Nota.find();
        res.json(notasDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        }); 
    }
})


// Delete note

router.delete('/nota/:id', async(req, res)=> {
    const _id = req.params.id
    try {
        const notaDB = await Nota.findByIdAndDelete({_id});
        if(!notaDB) {
            return res.status(400).json({
                mensaje: 'No se encontro el id indicado',
                error
            }); 
        }
        res.json(notaDB)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        }); 
    }
})

// Put notes

router.put('/nota/:id', async(req, res)=>{
    const _id = req.params.id;
    const body = req.body;
    try {
        const notaDB = await Nota.findByIdAndUpdate(_id, body, {new: true})
        res.json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        }); 
    }
})

module.exports = router;