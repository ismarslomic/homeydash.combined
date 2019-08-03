import WeatherService from '@/services/WeatherService';
import {GeolocationDetails} from '@/types/geolocation';
import {RootState, WeatherState} from '@/types/types';
import {Weatherdata} from '@/types/weather';
import {AxiosError} from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {FETCH_WEATHER} from '@/store/actions.type';
import {GET_CURRENT_LOCATION, GET_WEATHER, IS_WEATHER_DATA_LOADED} from '@/store/getters.type';
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
    // tslint:disable-next-line:no-shadowed-variable
    [FETCH_WEATHER.actionName]({commit, getters, rootGetters}) {
        return new Promise((resolve, reject) => {
            const stateWeather: Weatherdata | undefined =
                getters[GET_WEATHER.getterName];
            const stateCurrentLocation: GeolocationDetails | undefined =
                rootGetters[GET_CURRENT_LOCATION.namespacedName];
            if (!stateCurrentLocation || (stateWeather && stateWeather.id === stateCurrentLocation.id)) {
                resolve();
            } else {
                WeatherService.getWeatherForecast(stateCurrentLocation.id)
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
