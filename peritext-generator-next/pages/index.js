
import GlobalsProvider from '../components/GlobalsProvider';
import {templates} from '../peritextConfig';
const {
  web: {
    Home
  }
} = templates;
export default () => {
  return (
    <GlobalsProvider activeViewId="home">
      <Home />
    </GlobalsProvider>
  )
}