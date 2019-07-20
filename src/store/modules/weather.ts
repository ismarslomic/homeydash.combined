import WeatherService from '@/services/WeatherService';
import { RootState, WeatherState } from '@/types/types';
import { Weatherdata } from '@/types/weather';
import { AxiosError } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: WeatherState = {
    weather: undefined
};

export const getters: GetterTree<WeatherState, RootState> = {};

const mutations: MutationTree<WeatherState> = {
    setWeather(theState: WeatherState, weatherdata: Weatherdata) {
        theState.weather = weatherdata;
    }
};

export const actions: ActionTree<WeatherState, RootState> = {
    fetchWeather({commit}) {
        if (state.weather) {
            return;
        }
        return WeatherService.getWeatherForecast('2-6940429')
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
};

export const weather: Module<WeatherState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
