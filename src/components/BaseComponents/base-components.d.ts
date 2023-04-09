import { BaseBtn, BaseCard } from 'src/components/BaseComponents';
import { GoogleMaps } from '..';
declare module '@vue/runtime-core' {
  interface GlobalComponents {
    BaseBtn: typeof BaseBtn;
    BaseCard: typeof BaseCard;
    GoogleMaps: typeof GoogleMaps;
  }
}
