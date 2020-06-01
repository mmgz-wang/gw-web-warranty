import 'ant-design-vue/dist/antd.css';

import Antd from 'ant-design-vue';
import App from './App';
import Vue from 'vue';
import router from './router'
import axios from 'axios'
import api from './api/api'
// import qs from 'qs'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

Vue.config.productionTip = false
Vue.use(Antd)
Vue.prototype.$axios = axios
Vue.prototype.api = api

const i18n = new VueI18n({ 

   locale: 'zh', // 定义默认语言为中文 
  
   messages: {   
  
      'zh': require('@/assets/languages/zh-CN.json'),   
  
    }
  
  });
  

new Vue({
  router,
  render: h => h(App),
  i18n,
  
}).$mount('#app')
