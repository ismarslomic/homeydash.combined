import WeatherService from '@/services/WeatherService';
import { GeolocationDetails } from '@/types/geolocation';
import { RootState, WeatherState } from '@/types/types';
import { Weatherdata } from '@/types/weather';
import { AxiosError } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: WeatherState = {
    weather: undefined
};

export const getters: GetterTree<WeatherState, RootState> = {
    isWeatherDataLoaded: (theState: WeatherState): boolean => {
        return !!(theState.weather && theState.weather.shortIntervals) && theState.weather.shortIntervals.length > 0;
    },
    weather: (theState: WeatherState): Weatherdata | undefined => {
        return theState.weather;
    }
};

const mutations: MutationTree<WeatherState> = {
    setWeather(theState: WeatherState, weatherdata: Weatherdata) {
        theState.weather = weatherdata;
    }
};

export const actions: ActionTree<WeatherState, RootState> = {
    fetchWeather({commit}, currentLocation: GeolocationDetails) {
        if (state.weather && state.weather.id === currentLocation.id) {
            return;
        } else {
            if (currentLocation) {
                return WeatherService.getWeatherForecast(currentLocation.id)
                    .then((response: Weatherdata) => {
                        commit('setWeather', response);
                    })
                    .catch((error: AxiosError) => {
                        // tslint:disable-next-line:no-console
                        console.error('Fetching weather forecast failed');
                        // tslint:disable-next-line:no-console
                        console.error(error.message);
                    });
            }

        }
    }
};

export const weather: Module<WeatherState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
