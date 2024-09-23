import { createClient, print } from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = createClient();

// Promisify the `get` method
const getAsync = promisify(client.get).bind(client);

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

// Async function to display the value of a school in Redis
async function displaySchoolValue(schoolName) {
  try {
    const result = await getAsync(schoolName); // Await the value for the key
    console.log(result); // Log the value of the key
  } catch (err) {
    console.log(`Error retrieving value for ${schoolName}: ${err.message}`);
  }
}

// Async function to control the flow
async function main() {
  // Display the value for 'Holberton'
  await displaySchoolValue('Holberton');

  // Set new value and wait for the set to complete
  setNewSchool('HolbertonSanFrancisco', '100');

  // Display the value for 'HolbertonSanFrancisco' only after the value has been set
  displaySchoolValue('HolbertonSanFrancisco');
}

// Call the main function
main();
