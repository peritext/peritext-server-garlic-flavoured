var CronJob = require('cron').CronJob;
var fs = require('fs');
var path = require('path');
var job = new CronJob({
  cronTime: '00 30 11 * * 1-5', 
  onTick: function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
    console.log('cron: cleaning temp dir', new Date());
    fs.readdir('temp', (err, files) => {
      if (err) throw error;

      for (const file of files) {
        fs.unlink(path.join('temp', file), err => {
          // if (err) throw error;
        });
      }
      console.log('cron: done cleaning temp dir', new Date())
    });
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();
console.log('cron: temp dir cleaning job scheduling is set');
