import routes from '@/router/routes';
import Vue from 'vue';
import Router from 'vue-router';
import {IS_SETUP_COMPLETED} from '@/store/getters.type';
import store from '@/store/store';

Vue.use(Router);

const router: Router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeResolve((to, from, next) => {
    // redirect to setup page if user has not completed initial setup  and trying to access other pages then /setup
    const isSetupCompleted: boolean = store.getters[IS_SETUP_COMPLETED.namespacedName];
    if (to.path === '/setup' || isSetupCompleted) {
        return next();
    } else {
        return next({name: 'setup'});
    }
});

export default router;
