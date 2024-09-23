export default function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array, throw error if not
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Loop through each job object in the jobs array
  jobs.forEach((jobData) => {
    // Create a job in the queue 'push_notification_code_3'
    const job = queue.create('push_notification_code_3', jobData)
      .save((err) => {
        if (!err) {
          console.log(`Notification job created: ${job.id}`);
        }
      });

    // Add event listeners for job events

    // Job completion event
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // Job failure event
    job.on('failed', (errorMessage) => {
      console.log(`Notification job ${job.id} failed: ${errorMessage}`);
    });

    // Job progress event
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
  });
}
