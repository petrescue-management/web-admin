import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index";
import firebase from "./firebase";
import locale from 'element-ui/lib/locale/lang/en'
import * as ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale });
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const messaging = firebase.messaging();
messaging.requestPermission()
    .then(() => {
        return messaging.getToken();
    })
    .then((token) => {
        console.log(token)
    })

messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
});
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')