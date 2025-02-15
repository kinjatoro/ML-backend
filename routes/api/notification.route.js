// routes/api/notification.route.js
const express = require('express');
const router = express.Router();
const { sendPushNotification } = require('../../services/notification.service');
const Device = require('../../models/device');

// Enviar notificación a todos los dispositivos registrados
router.post('/send', async (req, res) => {
  const { title, body } = req.body;

  try {
    const devices = await Device.find();  // Obtener todos los dispositivos registrados
    const tokens = devices.map(device => device.token);

    const results = await Promise.all(
      tokens.map(token => sendPushNotification(token, title, body))
    );

    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error('Error al enviar notificaciones:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
