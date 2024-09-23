const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const kue = require('kue');

// Create Express app and Redis client
const app = express();
const client = redis.createClient();
const port = 1245;

// Promisify Redis get method
const getAsync = promisify(client.get).bind(client);

// Kue queue creation
const queue = kue.createQueue();

// Set initial seats and reservation status
let reservationEnabled = true;

// Function to reserve seat by setting the available seats
const reserveSeat = (number) => {
  client.set('available_seats', number);
};

// Async function to get current available seats
const getCurrentAvailableSeats = async () => {
  const seats = await getAsync('available_seats');
  return seats;
};

// Initialize available seats to 50 when the server starts
reserveSeat(50);

// Route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const seats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: seats });
});

// Route to reserve a seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (!err) {
      res.json({ status: 'Reservation in process' });
    } else {
      res.json({ status: 'Reservation failed' });
    }
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  }).on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

// Route to process the queue
app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const seats = await getCurrentAvailableSeats();
    let currentSeats = parseInt(seats, 10);

    if (currentSeats <= 0) {
      done(new Error('Not enough seats available'));
    } else {
      currentSeats -= 1;
      reserveSeat(currentSeats);

      if (currentSeats === 0) {
        reservationEnabled = false;
      }

      done();
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
