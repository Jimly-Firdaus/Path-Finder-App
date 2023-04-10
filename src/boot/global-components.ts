import { BaseBtn, BaseCard } from 'src/components/BaseComponents';
import { GoogleMaps } from 'src/components';
import { boot } from 'quasar/wrappers';

export default boot(async ({ app }) => {
  app
    .component('BaseBtn', BaseBtn)
    .component('BaseCard', BaseCard)
    .component('GoogleMaps', GoogleMaps);
});
