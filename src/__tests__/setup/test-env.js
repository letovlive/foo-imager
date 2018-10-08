import Vue from 'vue';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

Vue.use(Element, { locale });

Vue.config.productionTip = false;
// Suppress modified error because we use ts classes.
Vue.config.logModifiedComponents = false;

window.Vue = Vue;
