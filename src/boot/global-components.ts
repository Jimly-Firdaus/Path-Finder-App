import { BaseBtn, BaseCard } from 'src/components/BaseComponents';

import { boot } from 'quasar/wrappers';

export default boot(async ({ app }) => {
  app.component('BaseBtn', BaseBtn).component('BaseCard', BaseCard);
});
