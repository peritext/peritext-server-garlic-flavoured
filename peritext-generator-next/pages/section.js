import Router from 'next/router';

import GlobalsProvider from '../components/GlobalsProvider';
import {templates} from '../peritextConfig';
const {
  web: {
    Section
  }
} = templates;
import citations from '../static/generated/citations';

export default ({
  url: {
    query
  }
}) => {
  if (query.contextualizationId) {
    setTimeout(() => {
      Router.replace('/section?id=' + query.id, '/section/' + query.id);
    }, 1000);
  }
  return (
    <GlobalsProvider activeViewId={query.id}>
        <Section 
          id={query.id} 
          citations={citations}
          query={query}
        />
    </GlobalsProvider>
  )
}