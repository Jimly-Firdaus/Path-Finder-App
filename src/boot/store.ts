import store from '../store';
import { boot } from 'quasar/wrappers';

export default boot(async ({ app }) => {
  app.use(store);
});
