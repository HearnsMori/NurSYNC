// kafka/producer.js
const { Kafka } = require('kafkajs');

// Initialize Kafka instance
const kafka = new Kafka({
	clientId: 'express-producer',
	brokers: ['localhost:9092'], // Change if not local
});

const producer = kafka.producer();

const connectProducer = async () => {
	try {
		await producer.connect();
		console.log('Kafka Producer connected');
	} catch (err) {
		console.error('Kafka Producer connection failed:', err);
	}
};

const sendMessage = async (topic, message) => {
	try {
		await producer.send({
			topic,
			messages: [{ value: message }],
		});
		console.log(`Message sent: ${message}`);
	} catch (err) {
		console.error('Error sending Kafka message:', err);
	}
};

module.exports = {
	connectProducer,
	sendMessage,
};
