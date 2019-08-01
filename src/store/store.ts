import {geolocation} from '@/store/modules/geolocation';
import {loading} from '@/store/modules/loading';
import {locale} from '@/store/modules/locale';
import {user} from '@/store/modules/user';
import {weather} from '@/store/modules/weather';
import {setup} from '@/store/modules/setup';
import {RootState} from '@/types/types';
import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {
    FETCH_IS_SETUP_COMPLETED,
    FETCH_WEATHER,
    INITIALIZE_LOCALE,
    UPDATE_GEOLOCATION_DETAILS_NEW_LOCALE
} from '@/store/actions.type';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
    modules: {
        weather,
        geolocation,
        loading,
        locale,
        user,
        setup
    }
};

const store = new Vuex.Store<RootState>(storeOptions);

store.watch(() => store.getters['geolocation/currentLocation'], (currentLocation) => {
    store.dispatch(FETCH_WEATHER.namespacedName, currentLocation);
});

store.watch(() => store.getters['locale/currentLocale'], (newlocale, oldLocale) => {
    // We want to ignore the initial locale setting where oldLocale is empty
    if (oldLocale) {
        store.dispatch(UPDATE_GEOLOCATION_DETAILS_NEW_LOCALE.namespacedName);
    }
});

store.dispatch(INITIALIZE_LOCALE.namespacedName);
// NOTE! Dispatching FETCH_IS_SETUP_COMPLETED action _must_ be triggered from store.ts as using beforeCreate() in Vue
// is executed after route gards
store.dispatch(FETCH_IS_SETUP_COMPLETED.namespacedName);

export default store;
