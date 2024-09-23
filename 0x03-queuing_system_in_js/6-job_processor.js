import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Function to send notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process the jobs in the push_notification_code queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data; // Get data from the job
  sendNotification(phoneNumber, message); // Call the function to send notification
  done(); // Mark the job as complete
});
