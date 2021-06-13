const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');


const login = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');




router.post('/login',
    //check('correo', 'El correo es obligatorio').isEmail(),
    //check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validarCampos,
    login
);







module.exports = router;