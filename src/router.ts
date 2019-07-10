import Vue from 'vue';
import Router from 'vue-router';
import store from './store/store';

import Dashboard from '@/views/Dashboard.vue';
import Weather from '@/views/Weather.vue';
import Climate from '@/views/Climate.vue';
import Security from '@/views/Security.vue';
import Lightning from '@/views/Lightning.vue';
import Devices from '@/views/Devices.vue';
import Flows from '@/views/Flows.vue';
import Energy from '@/views/Energy.vue';

Vue.use(Router);

class RouteMeta {
    title: string;

    constructor({title}: { title: string }) {
        this.title = title;
    }
}

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: new RouteMeta({title: 'Dashboard'})
        },
        {
            path: '/weather',
            name: 'weather',
            component: Weather,
            meta: new RouteMeta({title: 'Weather'})
        },
        {
            path: '/climate',
            name: 'climate',
            component: Climate,
            meta: new RouteMeta({title: 'Climate'})
        },
        {
            path: '/security',
            name: 'security',
            component: Security,
            meta: new RouteMeta({title: 'Security'})
        },
        {
            path: '/lightning',
            name: 'lightning',
            component: Lightning,
            meta: new RouteMeta({title: 'Lightning'})
        },
        {
            path: '/devices',
            name: 'devices',
            component: Devices,
            meta: new RouteMeta({title: 'Devices'})
        },
        {
            path: '/flows',
            name: 'flows',
            component: Flows,
            meta: new RouteMeta({title: 'Flows'})
        },
        {
            path: '/energy',
            name: 'energy',
            component: Energy,
            meta: new RouteMeta({title: 'Energy'})
        }
    ]
});

// This callback runs before every route change, including on initial load
router.beforeEach((to, from, next) => {

    const routeMeta = to.meta as RouteMeta;
    store.dispatch('topToolbar/changeTitle', routeMeta.title);
    next();
});

export default router;
