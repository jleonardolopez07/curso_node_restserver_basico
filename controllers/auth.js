const { response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar_jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {
    const { correo, password } = req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            })
        }


        //Si el usuario esta activo
        if (usuario.estado === false) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado: false'
            });
        }

        // Verificar el password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -password'
            });
        }
        // generar el JWT
        const token = await generarJWT(usuario.id);


        res.status(200).json({
            usuario,
            token

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSingin = async(req, res = response) => {

    const { id_token } = req.body;
    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //tenemos que crear el usuario
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        // si el usuario en DB 
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hablke con el administrador, usuario bloqueado'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es valido'
        })
    }

}







module.exports = {
    login,
    googleSingin
}