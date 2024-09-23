import kue from 'kue';

const createPushNotificationsJobs = (jobs, queue) => {
  if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');

  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData)
      .save((err) => {
        if (!err) {
          // In test mode, the job may not have an id
          if (!queue.testMode) {
            console.log(`Notification job created: ${job.id}`);
          } else {
            console.log('Notification job created');
          }
        }
      });

    if (!queue.testMode) {
      job.on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
      }).on('failed', (err) => {
        console.log(`Notification job ${job.id} failed: ${err}`);
      }).on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
    }
  });
};

export default createPushNotificationsJobs;
