const { Kafka } = require("kafkajs");
//The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched.
// The first element will be execPath. See process.argv0 if access to the original value of argv[0] is needed.
// The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional command-line arguments
const msg = process.argv[2];

producer();

async function producer() {
  try {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["sahil-ubuntu:9092"],
    });

    const producer = kafka.producer();
    console.log("Connecting....");
    await producer.connect();
    console.log("Connected!");
    //A-M 0 , N-Z 1 
    const partition = msg[0] < "n" ? 0 : 1;
   const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });

    console.log(`Send Successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (error) {
    console.error(`Something Bad Happened ${error}`);
  } finally {
    process.exit(0);
  }
}
