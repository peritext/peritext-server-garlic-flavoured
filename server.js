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
const oAuthProxy = require('./routeHandlers/oauth-proxy');
const gistStory = require('./routeHandlers/gist-story');
const renderStory = require('./routeHandlers/render-story');

let config;
// in production mode config variables must be set as environment variables
if (process.env.NODE_ENV === 'production') {
  config = {
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    port: process.env.PORT || 3000,
    adminUserName: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD
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
// app.get('/presentations/:id?', presentationsRoutes.getPresentations);
// app.post('/presentations/:id', presentationsRoutes.updatePresentation);
// app.put('/presentations/:id', presentationsRoutes.createPresentation);
// app.delete('/presentations/:id', presentationsRoutes.deletePresentation);

// app.get('/stories/:id?', storiesRoutes.getStories);
// app.post('/stories/:id', storiesRoutes.updateStory);
// app.put('/stories/:id', storiesRoutes.createStory);
// app.delete('/stories/:id', storiesRoutes.deleteStory);

// app.post('/render-presentation', renderPresentation);
app.post('/render-story', cors(), renderStory);

// proxy used in the github oauth authentication process
app.post('/oauth-proxy/:appName', cors(),  oAuthProxy);
// citation data servers
app.get('/citation-locales/:id?', citationLocales);
app.get('/citation-styles/:id?', citationStyles);



/**
 * listening to requests (defaults to 3000)
 */
app.listen(config.port, function(){
  console.log('app listening on %s', config.port);
});