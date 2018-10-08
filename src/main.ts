import Vue from 'vue';
import TheApp from '@/pages/TheApp.vue';
import './plugins/element';
import i18n from './i18n';

Vue.config.productionTip = false;

new Vue({
  /**
   * Name.
   */
  name: 'FooImager',

  /**
   * Translations.
   */
  i18n,

  /**
   * Render app.
   * @param h
   * @return {any}
   */
  render: h => h(TheApp)
}).$mount('#app');
