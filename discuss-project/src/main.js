// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import { Tabbar, TabItem } from 'mint-ui';
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);


import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true 
Vue.use(VueAxios,axios);
Vue.config.productionTip = false

Vue.filter('getTime', function (value) {
  if (!value) return ''
  var d = new Date(value);
  var now = new Date();
  var day = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();
  var hour = d.getHours();
  var min = d.getMinutes();
  var second = d.getSeconds();
  if (hour < 10) hour = '0' + hour;
  if (min < 10) min = '0' + min;
  if (second < 10) second = '0' + second;
  var date;
  if (now.getFullYear() == year)
      date = month + "月" + day + "日";
  else
      date = year + "年" + month + "月" + day + "日";
  return (date + " " + hour + ":" + min + ":" + second);
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
