import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as vue2leaflet from 'vue2-leaflet';
import * as leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ElementUI from 'element-ui'
import { Icon } from 'leaflet'

import { store } from './store/store'

import 'element-ui/lib/theme-chalk/index.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leaflet/dist/leaflet.css'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})


Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(vue2leaflet);
Vue.use(leaflet);
//Vue.use(VueMqtt, 'wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self', {clientId: 'WebClient-' + parseInt(Math.random() * 100000)})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
