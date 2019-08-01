import WeatherService from '@/services/WeatherService';
import {GeolocationDetails} from '@/types/geolocation';
import {RootState, WeatherState} from '@/types/types';
import {Weatherdata} from '@/types/weather';
import {AxiosError} from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {FETCH_WEATHER} from '@/store/actions.type';
import {GET_WEATHER, IS_WEATHER_DATA_LOADED} from '@/store/getters.type';
import {SET_WEATHER} from '@/store/mutations.type';

const state: WeatherState = {
    weather: undefined
};

export const getters: GetterTree<WeatherState, RootState> = {
    [IS_WEATHER_DATA_LOADED.getterName]: (theState: WeatherState): boolean => {
        return !!(theState.weather && theState.weather.shortIntervals) && theState.weather.shortIntervals.length > 0;
    },
    [GET_WEATHER.getterName]: (theState: WeatherState): Weatherdata | undefined => {
        return theState.weather;
    }
};

const mutations: MutationTree<WeatherState> = {
    [SET_WEATHER.mutationName](theState: WeatherState, weatherdata: Weatherdata) {
        theState.weather = weatherdata;
    }
};

export const actions: ActionTree<WeatherState, RootState> = {
    [FETCH_WEATHER.actionName]({commit}, currentLocation: GeolocationDetails) {
        return new Promise((resolve, reject) => {
            if (state.weather && state.weather.id === currentLocation.id) {
                resolve();
            } else {
                if (currentLocation) {
                    WeatherService.getWeatherForecast(currentLocation.id)
                        .then((response: Weatherdata) => {
                            commit(SET_WEATHER.mutationName, response);
                            resolve();
                        })
                        .catch((error: AxiosError) => {
                            // tslint:disable-next-line:no-console
                            console.error('Fetching weather forecast failed');
                            // tslint:disable-next-line:no-console
                            console.error(error.message);
                            reject(error);
                        });
                } else {
                    resolve();
                }
            }
        });
    }
};

export const weather: Module<WeatherState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
