import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './routes'; //설정 라우터 호출
import {store} from "./store.js";
import VueSession from 'vue-session';
/* import GAuth from 'vue-google-oauth2'
 Vue.use(GAuth, {clientId : '654377629737-j34karmid203bd78km43kqeat8vv99ln.apps.googleusercontent.com'})
 */
Vue.config.productionTip = true;

Vue.prototype.$axios = axios; 
var sessionOptions = {
  persist: true
}
Vue.use(VueSession, sessionOptions)

new Vue({
  render: h => h(App),
  router,               
  store: store
}).$mount('#app')