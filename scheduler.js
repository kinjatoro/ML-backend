// scheduler.js
const cron = require('node-cron');
const Order = require('./models/contratos');     // Asegúrate de que la ruta sea la correcta
const Device = require('./models/device');     // Tu modelo de dispositivos, donde guardas los tokens
const { sendPushNotification } = require('./services/notification.service');

// Configuramos el cron job para que se ejecute cada minuto.
cron.schedule('* * * * *', async () => {
  const ahora = new Date();

  try {
    // Procesar pedidos para notificación de 24 horas antes
    const orders24h = await Order.find({
      'notificaciones.notificacion24h': { $lte: ahora },
      enviada24h: false
    });

    for (let order of orders24h) {
      // Obtener todos los tokens registrados

      if (order.notificaciones.notificacion24h.getTime() < (ahora.getTime() - 60 * 60 * 1000)) {
        order.enviada24h = true; // Marcamos como enviada sin enviarla
        await order.save();
        continue;
      }

      const devices = await Device.find();
      const tokens = devices.map(device => device.expoPushToken);

      // Enviar notificación a todos los tokens
      await Promise.all(tokens.map(token =>
        sendPushNotification(token, 'Recordatorio de visita', 'Faltan 24 horas para la visita programada.')
      ));

      // Marcar que ya se envió la notificación de 24h
      order.enviada24h = true;
      await order.save();
    }

    // Procesar pedidos para notificación de 1 hora antes
    const orders1h = await Order.find({
      'notificaciones.notificacion1h': { $lte: ahora },
      enviada1h: false
    });

    for (let order of orders1h) {
      const devices = await Device.find();
      const tokens = devices.map(device => device.expoPushToken);

      await Promise.all(tokens.map(token =>
        sendPushNotification(token, 'Recordatorio de visita', 'Falta 1 hora para la visita programada.')
      ));

      order.enviada1h = true;
      await order.save();
    }
  } catch (error) {
    console.error('Error en el scheduler:', error);
  }
});

console.log('Scheduler iniciado: Revisando notificaciones cada minuto.');