const fs = require('fs');
const path = require('path');
const waterfall = require('async').waterfall;
const map = require('async').map;

const citeproc = require('citeproc');

const generatePdf = require('peritext-generator-pdf');
const generateEpub = require('peritext-generator-epub');
// const template = require('peritext-template-static-garlic');
const template = require('./peritextConfig').templates.codex;
const prepareParts = require('peritext-rendering-utils').prepareDynamicParts;
const writeFileSync = require('fs').writeFileSync;

const contextualizers = require('./peritextConfig').contextualizers;

function prepareData({
  story,
  template,
  locale,
  contextualizers,
}, finalCallback) {
  console.log('next generator: starting to prepare data for story ', story.id);
  let prefix = path.resolve(__dirname + '/.next/dist/static/');
  console.log('prefix', prefix);
  waterfall([
    function(callback) {
      console.log('writing story file')
      fs.writeFile(prefix + 'story.json', JSON.stringify(story), callback);
    },
    function(callback) {
      console.log('preparing the parts');
      prefix += '/generated/';
      const parts = prepareParts(story);

      map(Object.keys(parts), (name, partCallback) => {
        const data = JSON.stringify(parts[name]);
        console.log('writing', prefix + name + '.json');
        fs.writeFile(prefix + name + '.json', data, partCallback);
      }, err => callback(err));
    },
    function(callback) {
      console.log('generating pdf ...');
      generatePdf({
        story: story,
        contextualizers,
        template: template,
        locale: locale,
        outputDirPath: prefix
      }, callback);
    },
    function(url, callback) {
      console.log('generating epub ...');
      generatePdf({
        story: story,
        contextualizers,
        template: template,
        locale: locale,
        outputDirPath: prefix
      }, callback);
    }
  ], function(err, finalUrl) {
    console.log('next generator: done preparing data for story ', story.id);
    finalCallback(err);
  })
}

module.exports = prepareData;
