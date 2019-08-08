import App from '@/App.vue';
import { CalendarTimeFilter, FromNowFilter } from '@/filters/moment';
import PrecipationFilter from '@/filters/precipitation';
import TemperatureFilter from '@/filters/temperature';
import WindSpeedFilter from '@/filters/windspeed';
import Default from '@/layouts/Default.vue';
import NoToolbar from '@/layouts/NoToolbar.vue';
import i18n from '@/plugins/i18n';
import vuetify from '@/plugins/vuetify';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store/store';
import Vue from 'vue';
import VueSVGIcon from 'vue-svgicon';

Vue.component('default-layout', Default);
Vue.component('no-toolbar-layout', NoToolbar);

Vue.config.productionTip = false;

Vue.filter('temperature', TemperatureFilter);
Vue.filter('precipation', PrecipationFilter);
Vue.filter('windspeed', WindSpeedFilter);
Vue.filter('fromNow', FromNowFilter);
Vue.filter('calendarTime', CalendarTimeFilter);

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
