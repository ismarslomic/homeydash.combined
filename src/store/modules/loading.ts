import {LoadingState, RootState} from '@/types/types';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';

const state: LoadingState = {
    geolocationWaitingCount: 0,
    weatherWaitingCount: 0,
    userAuthenticationWaitingCount: 0,
    userWaitingCount: 0,
    geolocationCoordinatesWaitingCount: 0
};

export const getters: GetterTree<LoadingState, RootState> = {
    isLoadingGeolocation: (theState: LoadingState): boolean => {
        return theState.geolocationWaitingCount > 0;
    },
    isLoadingWeather: (theState: LoadingState): boolean => {
        return theState.weatherWaitingCount > 0;
    },
    isLoadingAuthentication: (theState: LoadingState): boolean => {
        return theState.userAuthenticationWaitingCount > 0;
    },
    isLoadingUser: (theState: LoadingState): boolean => {
        return theState.userWaitingCount > 0;
    },
    isLoadingCoordinates: (theState: LoadingState): boolean => {
        return theState.geolocationCoordinatesWaitingCount > 0;
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
    },
    increaseUserAuthenticationWaitingCount(theState: LoadingState) {
        theState.userAuthenticationWaitingCount += 1;
    },
    decreaseUserAuthenticationWaitingCount(theState: LoadingState) {
        theState.userAuthenticationWaitingCount -= 1;
    },
    increaseUserWaitingCount(theState: LoadingState) {
        theState.userWaitingCount += 1;
    },
    decreaseUserWaitingCount(theState: LoadingState) {
        theState.userWaitingCount -= 1;
    },
    increaseGeolocationCoordinatesWaitingCount(theState: LoadingState) {
        theState.geolocationCoordinatesWaitingCount += 1;
    },
    decreaseGeolocationCoordinatesWaitingCount(theState: LoadingState) {
        theState.geolocationCoordinatesWaitingCount -= 1;
    }
};

export const actions: ActionTree<LoadingState, RootState> = {
    startLoadingGeolocation({commit}) {
        return new Promise((resolve) => {
            commit('increaseGeolocationWaitingCount');
            resolve();
        });
    },
    doneLoadingGeolocation({commit}) {
        return new Promise((resolve) => {
            commit('decreaseGeolocationWaitingCount');
            resolve();
        });
    },
    startLoadingWeather({commit}) {
        return new Promise((resolve) => {
            commit('increaseWeatherWaitingCount');
            resolve();
        });
    },
    doneLoadingWeather({commit}) {
        return new Promise((resolve) => {
            commit('decreaseWeatherWaitingCount');
            resolve();
        });
    },
    startLoadingUserAuthentication({commit}) {
        return new Promise((resolve) => {
            commit('increaseUserAuthenticationWaitingCount');
            resolve();
        });
    },
    doneLoadingUserAuthentication({commit}) {
        return new Promise((resolve) => {
            commit('decreaseUserAuthenticationWaitingCount');
            resolve();
        });
    },
    startLoadingUser({commit}) {
        return new Promise((resolve) => {
            commit('increaseUserWaitingCount');
            resolve();
        });
    },
    doneLoadingUser({commit}) {
        return new Promise((resolve) => {
            commit('decreaseUserWaitingCount');
            resolve();
        });
    },
    startLoadingHomeyGeolocationCoordinates({commit}) {
        return new Promise((resolve) => {
            commit('increaseGeolocationCoordinatesWaitingCount');
            resolve();
        });
    },
    doneLoadingHomeyGeolocationCoordinates({commit}) {
        return new Promise((resolve) => {
            commit('decreaseGeolocationCoordinatesWaitingCount');
            resolve();
        });
    }
};

export const loading: Module<LoadingState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
