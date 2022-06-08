import { createApp } from 'vue'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import VueSweetalert2 from 'vue-sweetalert2'
import VueCookies from 'vue-cookies'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import router from './router'
//--mitt(EventBus)--
import mitt from 'mitt'
const emitter = mitt()

const app = createApp(App)
app.config.globalProperties.emitter = emitter;
app.use(router)
app.use(BootstrapVue3)
app.use(VueSweetalert2)
app.use(VueCookies, { expire: '1d'})
app.mount('#app')