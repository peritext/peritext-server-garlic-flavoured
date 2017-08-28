import {templates} from '../peritextConfig';
const {
  web: {
    Bibliotheca
  }
} = templates;

import GlobalsProvider from '../components/GlobalsProvider';
import bibliography from '../static/generated/bibliography';

export default () => {
  return (
    <GlobalsProvider activeViewId="bibliotheca">
      <Bibliotheca bibliography={bibliography} />
    </GlobalsProvider>
  )
}