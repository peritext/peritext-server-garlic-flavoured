/**
 * This module handles requests asking to render the html all-in-one
 * representation of a story
 * ==========
 * @module peritext-server-garlic-flavoured/routes/render-story
 */
// the module acts just as an interface to the renderStory service
const renderStory = require('../services/renderStory');


const renderings = [];
// todo: this is a baaad way of handling multiple processes
function updateRenderings () {
  if (renderings.length) {
    const lastRendering = renderings[renderings.length - 1];
    lastRendering.handler(lastRendering.req, lastRendering.res, (err, resource) => {
      renderings.pop();
      console.log('last rendering done, remaining', renderings.length);
      updateRenderings();
    })
  }
}

/**
 * Resolves a story rendering request
 * @param {obj} req - the request object
 * @param {obj} res- the resource object
 */
module.exports = (req, res) => {

  renderings.unshift({
    req: req,
    res: res,
    handler: (req, res, callback) => {
      const story = req.body;
      const format = req.query.format;
      renderStory(story, format, (error, resource) => {
        if (error) {
          res.status(error.code).send(error);
        } else {
          res.status(200).send(resource);
        }
        callback(error, resource);
      });
    }
  });
  updateRenderings();
};