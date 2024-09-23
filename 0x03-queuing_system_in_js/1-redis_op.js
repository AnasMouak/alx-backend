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

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print); // Set the value for the key and use redis.print to display the result
}

// Function to display the value of a school in Redis
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, result) => {
    if (err) {
      console.log(`Error retrieving value for ${schoolName}: ${err.message}`);
    } else {
      console.log(result); // Log the value of the key
    }
  });
}

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
