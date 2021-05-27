const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado`)
    }
}

//Verificar si el correo existe

const existeEmail = async(correo = '') => {
    const existeCorreo = await usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El Correo ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id) => {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findOne(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}





module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}