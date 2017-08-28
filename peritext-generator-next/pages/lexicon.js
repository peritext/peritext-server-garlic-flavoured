
import GlobalsProvider from '../components/GlobalsProvider';
import {templates} from '../peritextConfig';
const {
  web: {
    Lexicon
  }
} = templates;
import glossary from '../static/generated/glossary';
import authorsIndex from '../static/generated/authorsIndex';

export default () => {
  return (
    <GlobalsProvider activeViewId="lexicon">
      <Lexicon
        glossary={glossary}
        authorsIndex={authorsIndex} 
      />
    </GlobalsProvider>
  )
}