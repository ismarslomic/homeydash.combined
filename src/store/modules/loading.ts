import {LoadingState, RootState} from '@/types/types';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {
    DONE_LOADING_GEOLOCATION,
    DONE_LOADING_HOMEY_GEOLOCATION_COORDINATES,
    DONE_LOADING_USER,
    DONE_LOADING_USER_AUTHENTICATION,
    DONE_LOADING_WEATHER,
    START_LOADING_GEOLOCATION,
    START_LOADING_HOMEY_GEOLOCATION_COORDINATES,
    START_LOADING_USER,
    START_LOADING_USER_AUTHENTICATION,
    START_LOADING_WEATHER
} from '@/store/actions.type';
import {
    IS_LOADING_AUTHENTICATION,
    IS_LOADING_COORDINATES,
    IS_LOADING_GEOLOCATION,
    IS_LOADING_USER,
    IS_LOADING_WEATHER
} from '@/store/getters.type';
import {
    DEACREASE_USER_WAITING_COUNT,
    DECREASE_GEOLOCATION_COORDINATES_WAITING_COUNT,
    DECREASE_GEOLOCATION_WAITING_COUNT,
    DECREASE_USER_AUTHENTICATION_WAITING_COUNT,
    DECREASE_WEATHER_WAITING_COUNT,
    INCREASE_GEOLOCATION_COORDINATES_WAITING_COUNT,
    INCREASE_GEOLOCATION_WAITING_COUNT,
    INCREASE_USER_AUTHENTICATION_WAITING_COUNT,
    INCREASE_USER_WAITING_COUNT,
    INCREASE_WEATHER_WAITING_COUNT
} from '@/store/mutations.type';

const state: LoadingState = {
    geolocationWaitingCount: 0,
    weatherWaitingCount: 0,
    userAuthenticationWaitingCount: 0,
    userWaitingCount: 0,
    geolocationCoordinatesWaitingCount: 0
};

export const getters: GetterTree<LoadingState, RootState> = {
    [IS_LOADING_GEOLOCATION.getterName]: (theState: LoadingState): boolean => {
        return theState.geolocationWaitingCount > 0;
    },
    [IS_LOADING_WEATHER.getterName]: (theState: LoadingState): boolean => {
        return theState.weatherWaitingCount > 0;
    },
    [IS_LOADING_AUTHENTICATION.getterName]: (theState: LoadingState): boolean => {
        return theState.userAuthenticationWaitingCount > 0;
    },
    [IS_LOADING_USER.getterName]: (theState: LoadingState): boolean => {
        return theState.userWaitingCount > 0;
    },
    [IS_LOADING_COORDINATES.getterName]: (theState: LoadingState): boolean => {
        return theState.geolocationCoordinatesWaitingCount > 0;
    }
};

const mutations: MutationTree<LoadingState> = {
    [INCREASE_GEOLOCATION_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.geolocationWaitingCount += 1;
    },
    [DECREASE_GEOLOCATION_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.geolocationWaitingCount -= 1;
    },
    [INCREASE_WEATHER_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.weatherWaitingCount += 1;
    },
    [DECREASE_WEATHER_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.weatherWaitingCount -= 1;
    },
    [INCREASE_USER_AUTHENTICATION_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.userAuthenticationWaitingCount += 1;
    },
    [DECREASE_USER_AUTHENTICATION_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.userAuthenticationWaitingCount -= 1;
    },
    [INCREASE_USER_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.userWaitingCount += 1;
    },
    [DEACREASE_USER_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.userWaitingCount -= 1;
    },
    [INCREASE_GEOLOCATION_COORDINATES_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.geolocationCoordinatesWaitingCount += 1;
    },
    [DECREASE_GEOLOCATION_COORDINATES_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.geolocationCoordinatesWaitingCount -= 1;
    }
};

export const actions: ActionTree<LoadingState, RootState> = {
    [START_LOADING_GEOLOCATION.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(INCREASE_GEOLOCATION_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [DONE_LOADING_GEOLOCATION.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(DECREASE_GEOLOCATION_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [START_LOADING_WEATHER.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(INCREASE_WEATHER_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [DONE_LOADING_WEATHER.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(DECREASE_WEATHER_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [START_LOADING_USER_AUTHENTICATION.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(INCREASE_USER_AUTHENTICATION_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [DONE_LOADING_USER_AUTHENTICATION.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(DECREASE_USER_AUTHENTICATION_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [START_LOADING_USER.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(INCREASE_USER_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [DONE_LOADING_USER.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(DEACREASE_USER_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [START_LOADING_HOMEY_GEOLOCATION_COORDINATES.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(INCREASE_GEOLOCATION_COORDINATES_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [DONE_LOADING_HOMEY_GEOLOCATION_COORDINATES.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(DECREASE_GEOLOCATION_COORDINATES_WAITING_COUNT.mutationName);
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
