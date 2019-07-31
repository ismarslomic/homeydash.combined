import { LoadingState, RootState } from '@/types/types';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

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
    },
    startLoadingUserAuthentication({commit}) {
        commit('increaseUserAuthenticationWaitingCount');
    },
    doneLoadingUserAuthentication({commit}) {
        commit('decreaseUserAuthenticationWaitingCount');
    },
    startLoadingUser({commit}) {
        commit('increaseUserWaitingCount');
    },
    doneLoadingUser({commit}) {
        commit('decreaseUserWaitingCount');
    },
    startLoadingHomeyGeolocationCoordinates({commit}) {
        commit('increaseGeolocationCoordinatesWaitingCount');
    },
    doneLoadingHomeyGeolocationCoordinates({commit}) {
        commit('decreaseGeolocationCoordinatesWaitingCount');
    }
};

export const loading: Module<LoadingState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
