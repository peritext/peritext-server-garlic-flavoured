module.exports = {
  templates: {
    web: require('peritext-template-dynamic-garlic'),
    codex: require('peritext-template-static-garlic'),
  },
  contextualizers: {
    bib: require('peritext-contextualizer-bib'),
    glossary: require('peritext-contextualizer-glossary'),
    video: require('peritext-contextualizer-video'),
    embed: require('peritext-contextualizer-embed'),
    image: require('peritext-contextualizer-image'),
    table: require('peritext-contextualizer-table'),
    dicto: require('peritext-contextualizer-dicto'),
    webpage: require('peritext-contextualizer-webpage'),
    'data-presentation': require('peritext-contextualizer-data-presentation'),
  },
  // disabled because I don't want to use webpack upstream
  // todo: find a solution
  additionalStylesheets: [
    // require('raw-loader!peritext-template-dynamic-garlic/dist/main.css'),
    // require('raw-loader!peritext-contextualizer-data-presentation/dist/main.css')
  ]
}