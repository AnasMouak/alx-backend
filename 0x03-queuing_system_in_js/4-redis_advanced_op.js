import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Connect to Redis server
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle connection errors
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Store the hash using hset
function createHolbertonSchoolsHash() {
  client.hset('HolbertonSchools', 'Portland', 50, print);
  client.hset('HolbertonSchools', 'Seattle', 80, print);
  client.hset('HolbertonSchools', 'New York', 20, print);
  client.hset('HolbertonSchools', 'Bogota', 20, print);
  client.hset('HolbertonSchools', 'Cali', 40, print);
  client.hset('HolbertonSchools', 'Paris', 2, print);
}

// Display the hash using hgetall
function displayHolbertonSchoolsHash() {
  client.hgetall('HolbertonSchools', (err, object) => {
    if (err) {
      console.log(`Error fetching data: ${err.message}`);
    } else {
      console.log(object); // Display the entire hash object
    }
  });
}

// Call the functions
createHolbertonSchoolsHash();
displayHolbertonSchoolsHash();
