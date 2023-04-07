import { BaseBtn, BaseCard } from 'src/components/BaseComponents';
declare module '@vue/runtime-core' {
  interface GlobalComponents {
    BaseBtn: typeof BaseBtn;
    BaseCard: typeof BaseCard;
  }
}
