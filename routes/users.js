const { Router } = require('express');
const router = Router();

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPath } = require('../controllers/usuarios')



router.get('/', usuariosGet);


router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPath);

module.exports = router;