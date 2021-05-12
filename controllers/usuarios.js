const { response, request } = require('express');
const Usuario = require('../models/usuario')

const usuariosGet = (req = request, res = response) => {
    const { q, nombre = 'No name', apikey } = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {
    const body = req.body;
    const usuario = new Usuario(body);

    res.json({
        msg: 'post API - controlador',
        usuario
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

const usuariosPath = (req, res = response) => {
    res.json({
        msg: 'path API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPath
}