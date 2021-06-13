const { Router } = require('express');
const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar_jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/validar_roles');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares/index')

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPath } = require('../controllers/usuarios');
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db_validator');



const router = Router();

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
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPath);

module.exports = router;