const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar_jwt');
const validaRoles = require('../middlewares/validar_roles');



module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles
}