import WeatherService from '@/services/WeatherService';
import {GeolocationCoordinates, GeolocationDetails} from '@/types/geolocation';
import {RootState, WeatherState} from '@/types/types';
import {Weatherdata} from '@/types/weather';
import {AxiosError} from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {CHANGE_WEATHER_LOCATION, FETCH_WEATHER_FORECAST, FETCH_WEATHER_LOCATIONS} from '@/store/actions.type';
import {
    GET_AVAILABLE_WEATHER_LOCATIONS,
    GET_LOCALE,
    GET_HOMEY_GEO_COORDINATES,
    GET_WEATHER_FORECAST,
    GET_WEATHER_LOCATION,
    IS_WEATHER_FORECAST_LOADED,
    IS_WEATHER_LOCATION_LOADED
} from '@/store/getters.type';
import {SET_AVAILABLE_WEATHER_LOCATIONS, SET_WEATHER_FORECAST, SET_WEATHER_LOCATION} from '@/store/mutations.type';
import GeolocationDetailsService from '@/services/GeolocationDetailsService';

const state: WeatherState = {
    weatherForecast: undefined,
    availableWeatherLocations: undefined,
    weatherLocation: undefined
};

export const getters: GetterTree<WeatherState, RootState> = {
    [IS_WEATHER_FORECAST_LOADED.getterName]: (theState: WeatherState): boolean => {
        return !!(theState.weatherForecast && theState.weatherForecast.shortIntervals) &&
            theState.weatherForecast.shortIntervals.length > 0;
    },
    [GET_WEATHER_FORECAST.getterName]: (theState: WeatherState): Weatherdata | undefined => {
        return theState.weatherForecast;
    },
    [IS_WEATHER_LOCATION_LOADED.getterName]: (theState: WeatherState): boolean => {
        return !!(theState.weatherLocation);
    },
    [GET_WEATHER_LOCATION.getterName]: (theState: WeatherState): GeolocationDetails | undefined => {
        return theState.weatherLocation;
    },
    [GET_AVAILABLE_WEATHER_LOCATIONS.getterName]: (theState: WeatherState): GeolocationDetails[] | undefined => {
        return theState.availableWeatherLocations;
    }
};

const mutations: MutationTree<WeatherState> = {
    [SET_WEATHER_FORECAST.mutationName](theState: WeatherState, weatherdata: Weatherdata) {
        theState.weatherForecast = weatherdata;
    },
    [SET_WEATHER_LOCATION.mutationName](theState: WeatherState, currentLocation: GeolocationDetails) {
        theState.weatherLocation = currentLocation;
    },
    [SET_AVAILABLE_WEATHER_LOCATIONS.mutationName](theState: WeatherState, availableLocations: GeolocationDetails[]) {
        theState.availableWeatherLocations = availableLocations;
    }
};

export const actions: ActionTree<WeatherState, RootState> = {
    // tslint:disable-next-line:no-shadowed-variable
    [FETCH_WEATHER_FORECAST.actionName]({commit, getters}) {
        return new Promise((resolve, reject) => {
            const stateWeatherLocation: GeolocationDetails | undefined =
                getters[GET_WEATHER_LOCATION.getterName];
            if (!stateWeatherLocation) {
                resolve();
            } else {
                WeatherService.getWeatherForecast(stateWeatherLocation.id)
                    .then((response: Weatherdata) => {
                        commit(SET_WEATHER_FORECAST.mutationName, response);
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
    },
    // tslint:disable-next-line:no-shadowed-variable
    [FETCH_WEATHER_LOCATIONS.actionName]({commit, getters, rootGetters}) {
        return new Promise((resolve, reject) => {
            const stateWeatherLocation: GeolocationDetails | undefined = getters[GET_WEATHER_LOCATION.getterName];
            const stateHomeyGeoCoordinates: GeolocationCoordinates | undefined =
                rootGetters[GET_HOMEY_GEO_COORDINATES.namespacedName];
            if (!stateHomeyGeoCoordinates) {
                resolve();
            } else {
                const currentLocale: string = rootGetters[GET_LOCALE.namespacedName];
                GeolocationDetailsService.getGeolocationDetails(stateHomeyGeoCoordinates, currentLocale)
                    .then((response: GeolocationDetails[]) => {
                        if (response && response.length > 0) {
                            let weatherLocation: GeolocationDetails | undefined;
                            if (stateWeatherLocation) {
                                weatherLocation = response.find((details) => {
                                    return details.id === stateWeatherLocation.id;
                                });
                            }
                            weatherLocation = weatherLocation ? weatherLocation : response[0];
                            commit(SET_WEATHER_LOCATION.mutationName, weatherLocation);
                            commit(SET_AVAILABLE_WEATHER_LOCATIONS.mutationName, response);
                        }
                        resolve();
                    })
                    .catch((error: AxiosError) => {
                        // tslint:disable-next-line:no-console
                        console.error('Fetching weather locations failed');
                        // tslint:disable-next-line:no-console
                        console.error(error.message);
                        reject(error);
                    });
            }
        });
    },
    [CHANGE_WEATHER_LOCATION.actionName]({commit}, weatherLocation: GeolocationDetails) {
        return new Promise((resolve) => {
            commit(SET_WEATHER_LOCATION.mutationName, weatherLocation);
            resolve();
        });
    },
};

export const weather: Module<WeatherState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
