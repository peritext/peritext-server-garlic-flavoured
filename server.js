/**
 * Quinoa-server
 * =============
 * entrypoint of the node-js application.
 * The app interfaces specific routes with the services provided by the app.
 * Routes are defined at the end of the file
 * @module peritext-server-garlic-flavoured
 */

const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

/**
 * Internal dependencies
 */
// route handlers (see below)
const citationLocales = require('./routeHandlers/citation-locales');
const citationStyles = require('./routeHandlers/citation-styles');
const renderStory = require('./routeHandlers/render-story');

let config;
// in production mode config variables must be set as environment variables
if (process.env.NODE_ENV === 'production') {
  config = {
    port: process.env.PORT || 3000,
  };
}
// in development mode config variables are retrieved from a json file
else { 
  config = require('./config');
}

const app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

app.use('/temp', express.static(__dirname + '/temp'));


module.exports = app;

/**
 * Routes binding
 * ==========
 * Each express request is handled by a specific route handlers
 * Routes definitions and routes handlers are separated
 * to facilitate further changes in the server's api
 */

// app.post('/render-presentation', renderPresentation);
app.post('/render-story', cors(), renderStory.createRenderingJob);
app.get('/render-story', cors(), renderStory.getRenderingJob);

// citation data servers
app.get('/citation-locales/:id?', citationLocales);
app.get('/citation-styles/:id?', citationStyles);



/**
 * listening to requests (defaults to 3000)
 */
app.listen(config.port, function(){
  console.log('app listening on %s', config.port);
});