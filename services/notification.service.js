// services/notification.service.js
const fetch = require('node-fetch');

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

async function sendPushNotification(token, title, body) {
  try {
    const message = {
      to: token,
      sound: 'default',
      title: title,
      body: body,
      data: { withSomeData: true },
    };

    const response = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    return await response.json();
  } catch (error) {
    console.error('Error enviando la notificación:', error);
  }
}

module.exports = { sendPushNotification };
