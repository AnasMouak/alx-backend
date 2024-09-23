import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Create an object with the job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'This is a push notification code'
};

// Create a job in the push_notification_code queue
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    } else {
      console.log(`Failed to create job: ${err.message}`);
    }
  });

// Add event listeners for the job
job.on('complete', () => {
  console.log('Notification job completed');
}).on('failed', () => {
  console.log('Notification job failed');
});
