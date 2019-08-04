import {
    DONE_LOADING_HOMEY,
    DONE_LOADING_USER,
    DONE_LOADING_USER_AUTHENTICATION,
    DONE_LOADING_WEATHER_FORECAST,
    DONE_LOADING_WEATHER_LOCATION,
    START_LOADING_HOMEY,
    START_LOADING_USER,
    START_LOADING_USER_AUTHENTICATION,
    START_LOADING_WEATHER_FORECAST,
    START_LOADING_WEATHER_LOCATION
} from '@/store/actions.type';
import {
    IS_LOADING_AUTHENTICATION,
    IS_LOADING_HOMEY_GEO_COORDINATES,
    IS_LOADING_USER,
    IS_LOADING_WEATHER_FORECAST,
    IS_LOADING_WEATHER_LOCATION
} from '@/store/getters.type';
import {
    DEACREASE_USER_WAITING_COUNT,
    DECREASE_HOMEY_WAITING_COUNT,
    DECREASE_USER_AUTHENTICATION_WAITING_COUNT,
    DECREASE_WEATHER_FORECAST_WAITING_COUNT,
    DECREASE_WEATHER_LOCATION_WAITING_COUNT,
    INCREASE_HOMEY_WAITING_COUNT,
    INCREASE_USER_AUTHENTICATION_WAITING_COUNT,
    INCREASE_USER_WAITING_COUNT,
    INCREASE_WEATHER_FORECAST_WAITING_COUNT,
    INCREASE_WEATHER_LOCATION_WAITING_COUNT
} from '@/store/mutations.type';
import { LoadingState, RootState } from '@/types/types';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: LoadingState = {
    weatherLocationWaitingCount: 0,
    weatherForecastWaitingCount: 0,
    userAuthenticationWaitingCount: 0,
    userWaitingCount: 0,
    homeyWaitingCount: 0
};

export const getters: GetterTree<LoadingState, RootState> = {
    [IS_LOADING_WEATHER_LOCATION.getterName]: (theState: LoadingState): boolean => {
        return theState.weatherLocationWaitingCount > 0;
    },
    [IS_LOADING_WEATHER_FORECAST.getterName]: (theState: LoadingState): boolean => {
        return theState.weatherForecastWaitingCount > 0;
    },
    [IS_LOADING_HOMEY_GEO_COORDINATES.getterName]: (theState: LoadingState): boolean => {
        return theState.homeyWaitingCount > 0;
    },
    [IS_LOADING_AUTHENTICATION.getterName]: (theState: LoadingState): boolean => {
        return theState.userAuthenticationWaitingCount > 0;
    },
    [IS_LOADING_USER.getterName]: (theState: LoadingState): boolean => {
        return theState.userWaitingCount > 0;
    }
};

const mutations: MutationTree<LoadingState> = {
    [INCREASE_WEATHER_LOCATION_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.weatherLocationWaitingCount += 1;
    },
    [DECREASE_WEATHER_LOCATION_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.weatherLocationWaitingCount -= 1;
    },
    [INCREASE_WEATHER_FORECAST_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.weatherForecastWaitingCount += 1;
    },
    [DECREASE_WEATHER_FORECAST_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.weatherForecastWaitingCount -= 1;
    },
    [INCREASE_HOMEY_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.homeyWaitingCount += 1;
    },
    [DECREASE_HOMEY_WAITING_COUNT.mutationName](theState: LoadingState) {
        theState.homeyWaitingCount -= 1;
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
    }
};

export const actions: ActionTree<LoadingState, RootState> = {
    [START_LOADING_WEATHER_LOCATION.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(INCREASE_WEATHER_LOCATION_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [DONE_LOADING_WEATHER_LOCATION.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(DECREASE_WEATHER_LOCATION_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [START_LOADING_WEATHER_FORECAST.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(INCREASE_WEATHER_FORECAST_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [DONE_LOADING_WEATHER_FORECAST.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(DECREASE_WEATHER_FORECAST_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [START_LOADING_HOMEY.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(INCREASE_HOMEY_WAITING_COUNT.mutationName);
            resolve();
        });
    },
    [DONE_LOADING_HOMEY.actionName]({commit}) {
        return new Promise((resolve) => {
            commit(DECREASE_HOMEY_WAITING_COUNT.mutationName);
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
    }
};

export const loading: Module<LoadingState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
