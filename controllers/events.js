const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
  try {
    const eventos = await Evento.find().populate('user', 'name');

    return res.json({
      ok: true,
      eventos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();

    return res.status(201).json({
      ok: true,
      eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const { uid } = req;
  const eventoId = req.params.id;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: true,
        msg: 'Evento no encontrado',
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento',
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: evento.user.toString(),
    };
    await Evento.findByIdAndUpdate(eventoId, nuevoEvento);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }

  return res.status(204).send();
};

const eliminarEvento = async (req, res = response) => {
  const { uid } = req;
  const eventoId = req.params.id;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: true,
        msg: 'Evento no encontrado',
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de eliminar este evento',
      });
    }

    await Evento.findByIdAndDelete(eventoId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }

  return res.status(204).send();
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
