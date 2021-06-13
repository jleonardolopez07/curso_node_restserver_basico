const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { existeEmail } = require('../helpers/db_validator');


const usuariosGet = async(req = request, res = response) => {
    // const { q, nombre = 'No name', apikey } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find({ estado: true })
    // .limit(Number(limite))
    // .skip(Number(desde));

    // const total = await Usuario.countDocuments({ estado: true });

    // Aqui entendi que una promesa es la union de muchos await, debido 
    // a que ya no tendriamos que esperar a que se haga un await y luego el otro
    // sino, estos dos los metemos en una promesa y resolvera en un solo paso
    // la solucion de los dos await, haciendo mas rapida la respuesta.

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
        .limit(Number(limite))
        .skip(Number(desde))
    ])


    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });



    //Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //guardar en DB

    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    // TODO validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controlador',
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;



    // Fisicamente lo borramos:
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Hoy en dia no se borran los usuarios sino se coloca el estado False
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;
    res.json({
        usuario,
        msg: 'para ver si llega aqui',
        usuarioAutenticado
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