import { geolocation } from '@/store/modules/geolocation';
import { loading } from '@/store/modules/loading';
import { locale } from '@/store/modules/locale';
import { weather } from '@/store/modules/weather';
import { RootState } from '@/types/types';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
    modules: {
        weather,
        geolocation,
        loading,
        locale
    }
};

const store = new Vuex.Store<RootState>(storeOptions);

store.watch(() => store.getters['geolocation/currentLocation'], (currentLocation) => {
    store.dispatch('weather/fetchWeather', currentLocation);
});

export default store;
