/*
  Rutas de Eventos / Events
  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const isDate = require('../helpers/isDate');
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require('../controllers/events');

const router = Router();

router.use(validarJWT);

router.get('/', getEventos);
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
  ],
  crearEvento,
);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);

module.exports = router;
