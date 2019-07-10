import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store';
import Dashboard from '@/views/Dashboard.vue';

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
            meta: new RouteMeta({title: 'Good evening, Ismar'})
        },
        {
            path: '/weather',
            name: 'weather',
            component: () => import('@/views/Weather.vue'),
            meta: new RouteMeta({title: 'Weather'})
        },
        {
            path: '/climate',
            name: 'climate',
            component: () => import('@/views/Climate.vue'),
            meta: new RouteMeta({title: 'Climate'})
        },
        {
            path: '/security',
            name: 'security',
            component: () => import('@/views/Security.vue'),
            meta: new RouteMeta({title: 'Security'})
        },
        {
            path: '/lightning',
            name: 'lightning',
            component: () => import('@/views/Lightning.vue'),
            meta: new RouteMeta({title: 'Lightning'})
        },
        {
            path: '/devices',
            name: 'devices',
            component: () => import('@/views/Devices.vue'),
            meta: new RouteMeta({title: 'Devices'})
        },
        {
            path: '/flows',
            name: 'flows',
            component: () => import('@/views/Flows.vue'),
            meta: new RouteMeta({title: 'Flows'})
        },
        {
            path: '/energy',
            name: 'energy',
            component: () => import('@/views/Energy.vue'),
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
