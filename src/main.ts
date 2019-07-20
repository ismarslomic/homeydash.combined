import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import VueSVGIcon from 'vue-svgicon';
import ShortTimeFilter from '@/filters/shortTime';
import ShortTimeIntervals from '@/filters/shortTimeIntervals';
import TemperatureFilter from '@/filters/temperature';
import PrecipationFilter from '@/filters/precipitation';
import WindSpeedFilter from '@/filters/windspeed';

Vue.config.productionTip = false;

Vue.filter('shortTime', ShortTimeFilter);
Vue.filter('shortTimeIntervals', ShortTimeIntervals);
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
    render: (h) => h(App)
}).$mount('#app');
