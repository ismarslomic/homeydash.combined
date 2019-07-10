import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/types';

import { appBar } from './modules/appBar';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    modules: {
        topToolbar: appBar
    }
};

export default new Vuex.Store<RootState>(store);
