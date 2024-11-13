import mqtt from 'mqtt';

export const useMqttClient = () => {
  const connection = {
    host: 'mqtt-server.dev01.dtsmart.dev',
    port: 443,
    endpoint: '/mqtt',
    clean: true,
    clientId: 'chat_booking_' + Math.random(),
    username: 'admin1',
    password: '123456A@',
  };

  const client = ref<mqtt.MqttClient | null>(null);

  const createConnection = () => {
    const { host, port, endpoint, ...options } = connection;
    const connectUrl = `wss://${host}:${port}${endpoint}`;

    try {
      client.value = mqtt.connect(connectUrl, options);
    } catch (error) {
      console.error('MQTT connect error:', error);
    }

    if (client.value) {
      client.value.on('connect', () => {
        console.log('MQTT connected successfully!');
      });

      client.value.on('error', (error) => {
        console.error('MQTT connection error:', error);
      });
    }
  };

  if (!client.value) {
    createConnection();
  }

  return {
    mqttClient: client.value,
  };
};
