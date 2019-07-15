import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/types/types';

import { weather } from '@/store/modules/weather';
import { geolocation } from '@/store/modules/geolocation';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    modules: {
        weather,
        geolocation
    }
};

export default new Vuex.Store<RootState>(store);
