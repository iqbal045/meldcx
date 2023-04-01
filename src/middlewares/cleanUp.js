const cron = require('node-cron');
const { File } = require('./../models/File');
const fs = require('fs');

//'0 */24 * * *';

// Set up file cleanup cron job
const FILE_INACTIVITY_TIME = 7 * 24 * 60 * 60 * 1000; //  7 days in milliseconds
const FILE_CLEANUP_PERIOD = '0 */24 * * *'; // runs at 12:00am every day

const cleanUp = cron.schedule(FILE_CLEANUP_PERIOD, async () => {
  console.log('Running Cron Job');
  const now = new Date();
  const inactivityTimeAgo = new Date(now.getTime() - FILE_INACTIVITY_TIME);
  const inactiveFiles = await File.find({
    updated_at: { $lt: inactivityTimeAgo },
  });

  inactiveFiles.map(async file => {
    // delete file from db
    await File.findByIdAndRemove(file.id);

    // delete file from storage
    fs.unlinkSync(file.fileUrl);
  });

  console.log(inactiveFiles);
});

module.exports = cleanUp;
