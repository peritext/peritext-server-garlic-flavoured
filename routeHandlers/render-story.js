/**
 * This module handles requests asking to render the html all-in-one
 * representation of a story
 * ==========
 * @module peritext-server-garlic-flavoured/routes/render-story
 */
// the module acts just as an interface to the renderStory service
const renderStory = require('../services/renderStory');
const genId = require('uuid').v4;
const queue = require('queue');
const q = queue({
  autostart: true
});

const jobs = {};

function addRenderingJob(format, story, jobId) {
  jobs[jobId] = {
    status: 'waiting',
    format: format
  }
  q.push(function(cb) {
    jobs[jobId].status = 'processing';
    try{
      renderStory(story, format, (error, url) => {
        cb(null, {
          format,
          story,
          error,
          jobId,
          url
        });
      });
    } catch(e) {
      cb(null, {
          format,
          story,
          error: e,
          jobId,
        });
    }
  })
}

q.on('success', function (result, job) {
  if (result.error) {
    jobs[result.jobId] = {status: 'error', format: result.format};
    console.log('job', result.jobId, ' featured an error - format : ', result.format);
    console.log(result.error);
  } else {
    jobs[result.jobId] = {status: 'ok', url: result.url, format: result.format}
  }
});

/**
 * Resolves a story rendering request by creating a new rendering job and adding it to the queue
 * @param {obj} req - the request object
 * @param {obj} res- the resource object
 */
const createRenderingJob = (req, res) => {
  const jobId = genId();
  const story = req.body;
  const format = req.query.format;
  res.status(200).send({status: 'processing', jobId: jobId, format: format});
  
  addRenderingJob(format, story, jobId);
};

const getRenderingJob = (req, res) => {
  const jobId = req.query.jobId;
  if (jobs[jobId]) {
    res.status(200).send(jobs[jobId]);
  } else {
    res.status(404).send('job not found');
  }
}

module.exports = {
  createRenderingJob: createRenderingJob,
  getRenderingJob: getRenderingJob
}