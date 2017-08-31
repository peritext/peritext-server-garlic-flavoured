/**
 * This module consumes the restory of a quinoa story
 * to bundle the content of an all-in-one html file
 * ========
 * @module peritext-server-garlic-flavoured/services/storyBundler
 */
const waterfall = require('async').waterfall;
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const generatePdf = require('peritext-generator-pdf');
const generateEpub = require('peritext-generator-epub');
const staticTemplate = require('peritext-template-static-garlic');

const runScript = require('npm-run-script');

const config = require('../../peritext-generator-next/peritextConfig');
const locale = require('../../resources/locale-fr');
const contextualizers = config.contextualizers;
const prepareData = require('../../peritext-generator-next/prepareData');
module.exports = function renderStory(story, format, finalCallback) {
  switch (format) {
    case 'html': 
      waterfall([
        // prepare data
        (callback) => {
          console.log('preparing data');
          prepareData({
            story: story,
            template: staticTemplate,
            locale: locale,
            contextualizers,
          }, callback);
        },
        // update build
        (callback) => {
          const command = 'cd peritext-generator-next;npm run build-html;cd ..; exit 59';
          console.log('building website with command: ', command);
          const child = runScript(command);
          child.once('error', (error) => {
            console.trace(error);
            callback(error);
          });
          child.once('exit', (exitCode) => {
            console.trace('exit in', exitCode);
            callback(null);
          });
        },
        // zip output
        (callback) => {
          const outputPath = path.resolve(__dirname + '/../../temp/');
          console.log('zipping data to ', outputPath + '/' + story.id + '.zip');
          const output = fs.createWriteStream(outputPath + '/' + story.id + '.zip');
          const archive = archiver('zip', {
              zlib: { level: 9 } // Sets the compression level.
          });
          output.on('close', function() {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
            callback(null);
          });
          archive.on('warning', function(err) {
            if (err.code === 'ENOENT') {
              console.log('warning: ', err);
            } else {
              console.log('error', err);
              callback(err);
            }
          });
          archive.on('error', function(err) {
            callback(err);
          });
          archive.pipe(output);
          console.log('adding ', path.resolve(__dirname + '../../peritext-generator-next/out'), ' to archive')
          archive.directory(path.resolve(__dirname + '/../../peritext-generator-next/out'), false);
          archive.finalize();
        }
      ], (err, url) => {
        console.log('done preparing website export');
        if (err) {
          return finalCallback({code: 500})
          // return res.status(500).send(err);
        } else {
          // render
          finalCallback(null, '/temp/' + story.id + '.zip');
          // res.status(200).send('/temp/' + story.id + '.zip');
        }
      });
      break;
    case 'pdf':
      generatePdf({
        story: story,
        contextualizers,
        template: staticTemplate,
        locale: locale,
        outputDirPath: path.resolve(__dirname + '/../../temp/'),
        tempDirPath: path.resolve(__dirname + '/../../temp/')
      }, (err, url) => {
        finalCallback(null, '/temp/' + story.id + '.pdf');
        // res.status(200).send('/temp/' + story.id + '.pdf');
      });
      break;
    case 'epub':
      generateEpub({
        story: story,
        contextualizers,
        template: staticTemplate,
        locale: locale,
        outputDirPath: path.resolve(__dirname + '/../../temp/'),
        tempDirPath: path.resolve(__dirname + '/../../temp/'),
        additionalStylesheets: config.additionalStylesheets.shared.concat(config.additionalStylesheets.web)
      }, (err, url) => {
        console.log('returning the result', '/temp/' + story.id + '.epub');
        finalCallback(err, '/temp/' + story.id + '.epub');
        // res.status(200).send('/temp/' + story.id + '.epub');
      });
      break;
    default:
      finalCallback({code: 400})
      // res.status(400);
      break;
  }
}