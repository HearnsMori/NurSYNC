const { Kafka } = require("kafkajs");
const express = require("express");

const kafka = new Kafka({ brokers: ["localhost:9092"] });
const producer = kafka.producer();
const app = express();

app.use(express.json());

app.post("/send", async (req, res) => {
  const { topic, message } = req.body;
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
  res.send("Sent");
});

async function start() {
  await producer.connect();
  app.listen(3000, () => console.log("Kafka bridge running on port 3000"));
}
start();
