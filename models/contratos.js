
const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    default: null,
  },
  material: {
    type: String,
    trim: true,
    default: null,
  },
  localidad: {
    type: String,
    trim: true,
    default: null,
  },
  direccion: {
    type: String,
    trim: true,
    default: null,
  },
  calles: {
    type: String,
    trim: true,
    default: null,
  },
  telefono: {
    type: String,
    trim: true,
    default: null,
  },
  bacha: {
    type: String,
    trim: true,
    default: null,
  },
  medidas: {
    type: String,
    trim: true,
    default: null,
  },
  factura: {
    type: String,
    trim: true,
    default: null,
  },
  pago: {
    type: String,
    trim: true,
    default: null,
  },
  descripcion: {
    type: String,
    trim: true,
    default: null,
  },
  fecha1: {
    type: String,
    trim: true,
    default: null,
  },
  fecha2: {
    type: String,
    trim: true,
    default: null,
  },
  fecha3: {  // Fecha de la visita (en formato ISO)
    type: Date,  // Se guarda como cadena de texto en formato ISO
    default: null,
  },
  estado: {
    type: String,
    trim: true,
    default: null,
  },
  notificaciones: {
    notificacion24h: { type: Date }, // Fecha en que se debe enviar la notificación 24h antes
    notificacion1h: { type: Date },  // Fecha en que se debe enviar la notificación 1h antes
  },
  enviada24h: { type: Boolean, default: false },
  enviada1h: { type: Boolean, default: false },
});


const Contrato = mongoose.model('Contrato', contratoSchema);

module.exports = Contrato;
