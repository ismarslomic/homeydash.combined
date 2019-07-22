import routes from '@/router/routes';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router: Router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
