import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Log message when connected to the Redis server
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Log error message if there's a connection error
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Function to publish messages after a delay
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish('holberton school channel', message); // Publish message to the Redis channel
  }, time);
}

// Publishing messages with delay
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
