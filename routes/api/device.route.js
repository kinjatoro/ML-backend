// routes/device.js
const express = require('express');
const router = express.Router();
const Device = require('../../models/device');

router.post('/register-token', async (req, res) => {
  console.log("Datos recibidos:", req.body);
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Token no provisto' });
  }

  try {
    // Si el token ya existe, no es necesario duplicarlo.
    let device = await Device.findOne({ expoPushToken: token });
    if (!device) {
      device = new Device({ expoPushToken: token });
      await device.save();
    }
    res.json({ success: true, token: device.expoPushToken });
  } catch (error) {
    console.error("Error al registrar token:", error);
    res.status(500).json({ error: 'Error al registrar token' });
  }
});

module.exports = router;
