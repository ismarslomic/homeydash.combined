import Dashboard from '@/views/Dashboard.vue';

export default [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/weather',
        name: 'weather',
        component: () => import('@/views/Weather.vue')
    },
    {
        path: '/climate',
        name: 'climate',
        component: () => import('@/views/Climate.vue')
    },
    {
        path: '/security',
        name: 'security',
        component: () => import('@/views/Security.vue')
    },
    {
        path: '/lightning',
        name: 'lightning',
        component: () => import('@/views/Lightning.vue')
    },
    {
        path: '/devices',
        name: 'devices',
        component: () => import('@/views/Devices.vue')
    },
    {
        path: '/flows',
        name: 'flows',
        component: () => import('@/views/Flows.vue')
    },
    {
        path: '/energy',
        name: 'energy',
        component: () => import('@/views/Energy.vue')
    }
];
