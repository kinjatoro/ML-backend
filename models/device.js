// models/Device.js
const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  expoPushToken: { type: String, required: true, unique: true },
  // Opcional: puedes agregar fecha de registro u otros datos
}, { timestamps: true });

module.exports = mongoose.model('Device', DeviceSchema);
