import { LoadingState, RootState } from '@/types/types';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: LoadingState = {
    geolocationWaitingCount: 0,
    weatherWaitingCount: 0
};

export const getters: GetterTree<LoadingState, RootState> = {
    isLoadingGeolocation: (theState: LoadingState): boolean => {
        return theState.geolocationWaitingCount > 0;
    },
    isLoadingWeather: (theState: LoadingState): boolean => {
        return theState.weatherWaitingCount > 0;
    }
};

const mutations: MutationTree<LoadingState> = {
    increaseGeolocationWaitingCount(theState: LoadingState) {
        theState.geolocationWaitingCount += 1;
    },
    decreaseGeolocationWaitingCount(theState: LoadingState) {
        theState.geolocationWaitingCount -= 1;
    },
    increaseWeatherWaitingCount(theState: LoadingState) {
        theState.weatherWaitingCount += 1;
    },
    decreaseWeatherWaitingCount(theState: LoadingState) {
        theState.weatherWaitingCount -= 1;
    }
};

export const actions: ActionTree<LoadingState, RootState> = {
    startLoadingGeolocation({commit}) {
        commit('increaseGeolocationWaitingCount');
    },
    doneLoadingGeolocation({commit}) {
        commit('decreaseGeolocationWaitingCount');
    },
    startLoadingWeather({commit}) {
        commit('increaseWeatherWaitingCount');
    },
    doneLoadingWeather({commit}) {
        commit('decreaseWeatherWaitingCount');
    }
};

export const loading: Module<LoadingState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
