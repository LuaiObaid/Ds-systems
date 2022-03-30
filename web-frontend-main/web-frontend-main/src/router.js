import Vue from 'vue'
import Router from 'vue-router'
import mapComp from '@/components/Map.vue'
import Hello from '@/components/HelloWorld.vue'

Vue.use(Router)

export default new Router ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/map',
            name: 'map',
            component: mapComp
        },
        {
            path: '/hello',
            name: 'hello',
            component: Hello
        }
    ]
})