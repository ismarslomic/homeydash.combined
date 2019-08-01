import {LoadingState, RootState} from '@/types/types';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {
    DONE_LOADING_GEOLOCATION, DONE_LOADING_HOMEY_GEOLOCATION_COORDINATES,
    DONE_LOADING_USER,
    DONE_LOADING_USER_AUTHENTICATION,
    DONE_LOADING_WEATHER,
    START_LOADING_GEOLOCATION,
    START_LOADING_HOMEY_GEOLOCATION_COORDINATES,
    START_LOADING_USER,
    START_LOADING_USER_AUTHENTICATION,
    START_LOADING_WEATHER
} from '@/store/actions.type';

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
    [START_LOADING_GEOLOCATION.actionName]({commit}) {
        return new Promise((resolve) => {
            commit('increaseGeolocationWaitingCount');
            resolve();
        });
    },
    [DONE_LOADING_GEOLOCATION.actionName]({commit}) {
        return new Promise((resolve) => {
            commit('decreaseGeolocationWaitingCount');
            resolve();
        });
    },
    [START_LOADING_WEATHER.actionName]({commit}) {
        return new Promise((resolve) => {
            commit('increaseWeatherWaitingCount');
            resolve();
        });
    },
    [DONE_LOADING_WEATHER.actionName]({commit}) {
        return new Promise((resolve) => {
            commit('decreaseWeatherWaitingCount');
            resolve();
        });
    },
    [START_LOADING_USER_AUTHENTICATION.actionName]({commit}) {
        return new Promise((resolve) => {
            commit('increaseUserAuthenticationWaitingCount');
            resolve();
        });
    },
    [DONE_LOADING_USER_AUTHENTICATION.actionName]({commit}) {
        return new Promise((resolve) => {
            commit('decreaseUserAuthenticationWaitingCount');
            resolve();
        });
    },
    [START_LOADING_USER.actionName]({commit}) {
        return new Promise((resolve) => {
            commit('increaseUserWaitingCount');
            resolve();
        });
    },
    [DONE_LOADING_USER.actionName]({commit}) {
        return new Promise((resolve) => {
            commit('decreaseUserWaitingCount');
            resolve();
        });
    },
    [START_LOADING_HOMEY_GEOLOCATION_COORDINATES.actionName]({commit}) {
        return new Promise((resolve) => {
            commit('increaseGeolocationCoordinatesWaitingCount');
            resolve();
        });
    },
    [DONE_LOADING_HOMEY_GEOLOCATION_COORDINATES.actionName]({commit}) {
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
