let dynamicTemplateSs;
let staticTemplateSs;
let dataSs;
let dictoSs;
const isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
const inBrowser = isBrowser();
// we do that to handle upstream requirement of
// these files on a server that does not use webpack
if (inBrowser) {
  dynamicTemplateSs = require('peritext-template-web-garlic/dist/main.css');
  dataSs = require('peritext-contextualizer-data-presentation/dist/main.css');
  dictoSs = require('peritext-contextualizer-dicto/dist/main.css');
} else {
  const readFileSync = require('fs').readFileSync;
  const resolve = require('path').resolve;
  dynamicTemplateSs = readFileSync('node_modules/peritext-template-web-garlic/dist/main.css', 'utf8')
  staticTemplateSs = readFileSync('node_modules/peritext-template-codex-garlic/dist/main.css', 'utf8')
  dataSs = readFileSync('node_modules/peritext-contextualizer-data-presentation/dist/main.css', 'utf8')
  dictoSs = readFileSync('node_modules/peritext-contextualizer-dicto/dist/main.css', 'utf8')
}
  
module.exports = {
  templates: {
    web: require('peritext-template-web-garlic'),
    codex: require('peritext-template-codex-garlic'),
  },
  contextualizers: {
    bib: require('peritext-contextualizer-bib'),
    vegalite: require('peritext-contextualizer-vegalite'),
    codefiles: require('peritext-contextualizer-codefiles'),
    p5: require('peritext-contextualizer-p5'),
    glossary: require('peritext-contextualizer-glossary'),
    video: require('peritext-contextualizer-video'),
    embed: require('peritext-contextualizer-embed'),
    image: require('peritext-contextualizer-image'),
    table: require('peritext-contextualizer-table'),
    dicto: require('peritext-contextualizer-dicto'),
    webpage: require('peritext-contextualizer-webpage'),
    'data-presentation': require('peritext-contextualizer-data-presentation'),
  },
  additionalStylesheets: {
    shared: [
      dataSs,
      dictoSs,
    ],
    web: [
      dynamicTemplateSs,
      ],
    codex: [
      staticTemplateSs,
    ]
  }
}