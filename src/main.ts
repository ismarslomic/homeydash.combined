import App from '@/App.vue';
import PrecipationFilter from '@/filters/precipitation';
import TemperatureFilter from '@/filters/temperature';
import WindSpeedFilter from '@/filters/windspeed';
import i18n from '@/plugins/i18n';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store/store';
import Vue from 'vue';
import VueSVGIcon from 'vue-svgicon';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

Vue.filter('temperature', TemperatureFilter);
Vue.filter('precipation', PrecipationFilter);
Vue.filter('windspeed', WindSpeedFilter);

Vue.use(VueSVGIcon, {
    tagName: 'svgicon',
    isOriginalDefault: true
});

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: (h) => h(App)
}).$mount('#app');
