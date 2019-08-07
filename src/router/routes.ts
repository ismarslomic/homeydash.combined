import Dashboard from '@/views/Dashboard.vue';

export default [
    {
        path: '/',
        name: 'dashboard',
        meta: {layout: 'default'},
        component: () => import('@/views/Dashboard.vue')
    },
    {
        path: '/weather',
        name: 'weather',
        meta: {layout: 'default'},
        component: () => import('@/views/Weather.vue')
    },
    {
        path: '/climate',
        name: 'climate',
        meta: {layout: 'default'},
        component: () => import('@/views/Climate.vue')
    },
    {
        path: '/security',
        name: 'security',
        meta: {layout: 'default'},
        component: () => import('@/views/Security.vue')
    },
    {
        path: '/lightning',
        name: 'lightning',
        meta: {layout: 'default'},
        component: () => import('@/views/Lightning.vue')
    },
    {
        path: '/devices',
        name: 'devices',
        meta: {layout: 'default'},
        component: () => import('@/views/Devices.vue')
    },
    {
        path: '/flows',
        name: 'flows',
        meta: {layout: 'default'},
        component: () => import('@/views/Flows.vue')
    },
    {
        path: '/energy',
        name: 'energy',
        meta: {layout: 'default'},
        component: () => import('@/views/Energy.vue')
    },
    {
        path: '/setup',
        name: 'setup',
        meta: {layout: 'no-toolbar'},
        component: () => import('@/views/Setup.vue')
    }
];
