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

// Subscribe to the 'holberton school channel'
client.subscribe('holberton school channel');

// Handle incoming messages
client.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe(); // Unsubscribe from the channel
    client.quit(); // Disconnect from the Redis server
  }
});
