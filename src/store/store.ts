import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/types/types';
import { weather } from '@/store/modules/weather';
import { geolocation } from '@/store/modules/geolocation';
import { loading } from '@/store/modules/loading';
import { locale } from '@/store/modules/locale';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    modules: {
        weather,
        geolocation,
        loading,
        locale
    }
};

export default new Vuex.Store<RootState>(store);
