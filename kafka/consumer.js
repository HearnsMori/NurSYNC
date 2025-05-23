// kafka/consumer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'express-consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'express-group' });

const runConsumer = async (topic) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    console.log(`Kafka Consumer subscribed to topic: ${topic}`);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message [${topic}]: ${message.value.toString()}`);
      },
    });
  } catch (err) {
    console.error('Kafka Consumer error:', err);
  }
};

module.exports = runConsumer;
