import {loading} from '@/store/modules/loading';
import {locale} from '@/store/modules/locale';
import {auth} from '@/store/modules/auth';
import {weather} from '@/store/modules/weather';
import {setup} from '@/store/modules/setup';
import {homey} from '@/store/modules/homey';
import {RootState} from '@/types/types';
import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {FETCH_WEATHER_FORECAST, INITIALIZE_LOCALE, FETCH_WEATHER_LOCATIONS} from '@/store/actions.type';
import {GET_CURRENT_LOCALE, GET_WEATHER_LOCATION} from '@/store/getters.type';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<RootState>({
    storage: window.localStorage,
    modules: ['locale', 'weather', 'auth', 'setup', 'homey'],
    key: 'homeydash.combined'
});

const storeOptions: StoreOptions<RootState> = {
    modules: {
        weather,
        loading,
        locale,
        auth,
        setup,
        homey
    },
    plugins: [vuexLocal.plugin]
};

const store = new Vuex.Store<RootState>(storeOptions);

store.watch(() => store.getters[GET_WEATHER_LOCATION.namespacedName], () => {
    store.dispatch(FETCH_WEATHER_FORECAST.namespacedName);
});

store.watch(() => store.getters[GET_CURRENT_LOCALE.namespacedName], (newlocale, oldLocale) => {
    // We want to ignore the initial locale setting where oldLocale is empty
    if (oldLocale) {
        store.dispatch(FETCH_WEATHER_LOCATIONS.namespacedName);
    }
});

store.dispatch(INITIALIZE_LOCALE.namespacedName);

export default store;
