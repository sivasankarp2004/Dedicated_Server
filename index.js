const cron = require('node-cron');

cron.schedule('*/5 * * * *', () => {
    console.log('Running a task every 5 minutes');
});
