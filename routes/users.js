const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPath } = require('../controllers/usuarios');
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db_validator');
const { validarCampos } = require('../middlewares/validar-campos');



router.get('/', usuariosGet);


router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),

    check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'Esto no es un correo').isEmail(),
    check('correo').custom((correo) => existeEmail(correo)),
    //check('rol', 'NO ES UN ROL VALIDO').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos

], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),

    validarCampos
], usuariosDelete);

router.patch('/', usuariosPath);

module.exports = router;