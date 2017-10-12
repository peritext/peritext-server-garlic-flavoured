import React, {Component} from 'react';
import PropTypes from 'prop-types';

import GlobalsProvider from '../components/GlobalsProvider';
import {templates} from '../peritextConfig';


const isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
const inBrowser = isBrowser();

let ReactPDF ;
if (inBrowser) {
  ReactPDF = require('react-pdf/build/entry.webpack');
}

const {
  web: {
    Dimensio
  }
} = templates;

class Contents extends Component {
  constructor(props) {
    super(props);
    
  }

  render = () => {
    const {
      story: {
        id,
        metadata: {
          title
        }
      }
    } = this.context;
    let pdfUrl = '/static/generated/' + id + '.pdf';
    let epubUrl = '/static/generated/' + id + '.epub';
    let jsonUrl = '/static/story-full.json';
    if (inBrowser) {
      pdfUrl =  window.location.origin + pdfUrl;
      epubUrl =  window.location.origin + epubUrl;
    }
    return (<Dimensio 
         storyTitle={title}
         pdfUrl={pdfUrl} 
         epubUrl={epubUrl}
         jsonUrl={jsonUrl}
      />)
  }
}

Contents.contextTypes = {
  story: PropTypes.object
}

export default () => {
  return (
    <GlobalsProvider activeViewId="dimensio">
      <Contents />
    </GlobalsProvider>
  )
}