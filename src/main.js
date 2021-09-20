import Vue from 'vue';
// Bootstrap4
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// Bootstrap-notify
import 'bootstrap-notify';
// jquery
import $ from 'jquery';
// lodash
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
// FontAwesome
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
// vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// VeeValidate
// import { ValidationProvider, ValidationObserver, configure } from 'vee-validate/dist/vee-validate.full';
// select2
// import 'select2';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.component('Loading', Loading);

window.jQuery = $;
window.$ = $;
// https://segmentfault.com/q/1010000015762223
Vue.prototype.$bus = new Vue();

Vue.use(VueAxios, axios);

// VeeValidate
// Vue.component('validation-provider', ValidationProvider);
// Vue.component('validation-observer', ValidationObserver);
// VeeValidate Class 設定檔案
// configure({
//   classes: {
//     valid: 'is-valid',
//     invalid: 'is-invalid'
//   }
// });

// Select2 default config
// $.fn.select2.defaults.set('theme', 'bootstrap4');

// 千分號
Vue.filter('thousands', function(num) {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
});

// 全局註冊Component
const requireComponent = require.context(
  // 其組件目錄的相對路徑
  '@/components/Base',
  // 是否查詢子目錄
  false,
  // 匹配基礎组件文件名的正則表達式
  /Base[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
  // 獲取组件配置
  const componentConfig = requireComponent(fileName);
  // 獲取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 獲取和目錄深度無關的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  );

  // 全局註冊组件
  Vue.component(
    componentName,
    // 如果這個组件選項是透過 `export default` 導出的，
    // 那麼就會優先使用 `.default`，
    // 否則退回到使用模組的根。
    componentConfig.default || componentConfig
  );
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
