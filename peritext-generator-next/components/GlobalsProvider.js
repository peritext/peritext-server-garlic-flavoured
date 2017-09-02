import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import LinkWrapper from './LinkWrapper';
import HeadMaker from '../components/HeadMaker';

import story from '../static/story';
import {url} from '../config';
import citations from '../static/generated/citations';

import {typefaceNames} from 'peritext-template-web-garlic';

import peritextConfig from '../peritextConfig';

const {additionalStylesheets} = peritextConfig;
const additionalCss = additionalStylesheets.shared.concat(additionalStylesheets.web).join('\n')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class GlobalsProvider extends Component {
  constructor(props) {
    super(props);
  }

  getChildContext = () => ({
    story,
    activeViewId: this.props.activeViewId,
    LinkComponent: LinkWrapper,
    contextualizers: peritextConfig.contextualizers,
    rawCitations: citations,
  })

  makeStyles = () => {
    const contextualizers = peritextConfig.contextualizers;
    return Object.keys(contextualizers).reduce((result, type) => {
      const defaultCss = contextualizers[type] ? contextualizers[type].defaultCss : '';
      return result + '\n' + defaultCss;
    }, '') 
    + '\n' 
    + (
      additionalCss || '')
    + '\n'
    + (story.settings.css && story.settings.css.web ? story.settings.css.web : '')
  }

  render = () => {
    const {children} = this.props;
    const styles = this.makeStyles();
    return (
      <div id="globals-provider">
        <HeadMaker
          title={story.metadata.title}
          authors={story.metadata.authors}
          description={story.metadata.description}
          url={url}
        >
          <base href="/" />
          {
            typefaceNames.map(name => {
              const googleName = capitalizeFirstLetter(name).replace(' ', '+');
              return   <link key={name} href={`https://fonts.googleapis.com/css?family=${googleName}:300,400,700,800`} rel="stylesheet" />
            })
          }
          <style dangerouslySetInnerHTML={{ __html: styles }} />
        </HeadMaker>
        {children}
      </div>
    )
  }

}

GlobalsProvider.childContextTypes = {
  story: PropTypes.object,
  activeViewId: PropTypes.string,
  navigateTo: PropTypes.func,
  LinkComponent: PropTypes.func,
  contextualizers: PropTypes.object,
  rawCitations: PropTypes.object,
}