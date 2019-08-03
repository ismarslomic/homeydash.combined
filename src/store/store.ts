import {geolocation} from '@/store/modules/geolocation';
import {loading} from '@/store/modules/loading';
import {locale} from '@/store/modules/locale';
import {user} from '@/store/modules/user';
import {weather} from '@/store/modules/weather';
import {setup} from '@/store/modules/setup';
import {RootState} from '@/types/types';
import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {FETCH_WEATHER, INITIALIZE_LOCALE, UPDATE_GEOLOCATION_DETAILS_NEW_LOCALE} from '@/store/actions.type';
import {GET_CURRENT_LOCALE, GET_CURRENT_LOCATION} from '@/store/getters.type';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<RootState>({
    storage: window.localStorage,
    modules: ['locale', 'geolocation', 'user', 'setup'],
    key: 'homeydash.combined'
});

const storeOptions: StoreOptions<RootState> = {
    modules: {
        weather,
        geolocation,
        loading,
        locale,
        user,
        setup
    },
    plugins: [vuexLocal.plugin]
};

const store = new Vuex.Store<RootState>(storeOptions);

store.watch(() => store.getters[GET_CURRENT_LOCATION.namespacedName], () => {
    store.dispatch(FETCH_WEATHER.namespacedName);
});

store.watch(() => store.getters[GET_CURRENT_LOCALE.namespacedName], (newlocale, oldLocale) => {
    // We want to ignore the initial locale setting where oldLocale is empty
    if (oldLocale) {
        store.dispatch(UPDATE_GEOLOCATION_DETAILS_NEW_LOCALE.namespacedName);
    }
});

store.dispatch(INITIALIZE_LOCALE.namespacedName);

export default store;
