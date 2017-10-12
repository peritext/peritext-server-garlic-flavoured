const fs = require('fs');
const path = require('path');
const waterfall = require('async').waterfall;
const map = require('async').map;
const generateId = require('uuid').v4;
const nestedProperty = require("nested-property");

const citeproc = require('citeproc');

const generatePdf = require('peritext-generator-pdf');
const generateEpub = require('peritext-generator-epub');
// const template = require('peritext-template-static-garlic');
const template = require('./peritextConfig').templates.codex;
const prepareParts = require('peritext-rendering-utils').prepareDynamicParts;
const writeFileSync = require('fs').writeFileSync;

const config = require('./peritextConfig');
const contextualizers = config.contextualizers;
const additionalStylesheets = config.additionalStylesheets;

function findBase64 (story, prefix, path, newImages) {
  let basePath = path.slice() || [];
  // console.log('find base64 in path', path);
  let thatPath = basePath.slice();

  const target = nestedProperty.get(story, thatPath.join('.'));
  if (typeof target === 'object' && !Array.isArray(target)) {
    Object.keys(target).forEach((key) => {
      const subPath = basePath.concat([key]);
      const results = findBase64(story, prefix, subPath, newImages);
    });
  } else if (typeof target === 'string') {
    if (target.match(/^data:image\/(png|jpe?g);base64,/)) {
      const id = generateId();
      newImages.push({
        id: id + '.png',
        data: target.split('base64,')[1]
      });
      const url = prefix + id + '.png';
      nestedProperty.set(story, thatPath.join('.'), url);
      console.log('new property', nestedProperty.get(story, thatPath.join('.')))
    }
  }
  return {
    story: story,
    images: newImages
  }
}

function lighten (story, prefix, callback) {
  // find all base64 fields
  const results = findBase64(story, '/static/generated/', [], []);
  const imageFiles = results.images;
  const lightStory = results.story;
  console.log(imageFiles.length, ' image files to write');
  // write the image files
  map(imageFiles, function(image, imageCallback) {
    const imagePath = prefix + '/generated/' + image.id;
    console.log('writing image', imagePath);
    fs.writeFile(imagePath, image.data, 'base64', imageCallback);
  }, function(err, i) {
    callback(err, lightStory);
  });
}

function prepareData({
  story,
  template,
  locale,
  contextualizers,
}, finalCallback) {
  console.log('next generator: starting to prepare data for story ', story.id);
  // let prefix = path.resolve(__dirname + '/.next/dist/static/');
  let prefix = path.resolve(__dirname + '/static/');
  console.log('prefix', prefix);
  waterfall([
    // write full story to enable downloading it
    function(callback) {
      console.log('writing full story file at ', path.resolve(prefix + '/story.json'));
      fs.writeFile(path.resolve(prefix + '/story-full.json'), JSON.stringify(story), function(error) {
        callback(error);
      });
    },
    // lighten assets
    function(callback) {
      console.log('lightening assets story file at ', path.resolve(prefix + '/story.json'));
      lighten(JSON.parse(JSON.stringify(story)), prefix, callback);
    },
    function(lightStory, callback) {
      console.log('writing story file at ', path.resolve(prefix + '/story.json'));
      fs.writeFile(path.resolve(prefix + '/story.json'), JSON.stringify(lightStory), function(error) {
        callback(error, lightStory);
      });
    },
    function(lightStory, callback) {
      console.log('preparing the parts');
      prefix += '/generated/';
      const parts = prepareParts(lightStory);

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
        outputDirPath: prefix,
        additionalStylesheets: config.additionalStylesheets.shared.concat(config.additionalStylesheets.codex)
      }, callback);
    },
    function(url, callback) {
      console.log('generating epub ...');
      generateEpub({
        story: story,
        contextualizers,
        template: template,
        locale: locale,
        outputDirPath: prefix,
        additionalStylesheets: config.additionalStylesheets.shared.concat(config.additionalStylesheets.codex)
      }, callback);
    }
  ], function(err, finalUrl) {
    console.log('next generator: done preparing data for story ', story.id);
    finalCallback(err);
  })
}

module.exports = prepareData;
