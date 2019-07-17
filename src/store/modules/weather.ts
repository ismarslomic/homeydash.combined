import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {RootState, WeatherState} from '@/types/types';
import {Weatherdata} from '@/types/weather';

const state: WeatherState = {
    weather: {
        created: new Date(),
        update: new Date(),
        shortIntervals: []
    },
};

export const getters: GetterTree<WeatherState, RootState> = {
    weather: (theState: WeatherState) => {
        return theState.weather;
    }
};

const mutations: MutationTree<WeatherState> = {
    setWeather(theState: WeatherState, weatherdata: Weatherdata) {
        theState.weather = weatherdata;
    },
};

export const actions: ActionTree<WeatherState, RootState> = {
    changeWeather({commit}, weatherdata: Weatherdata) {
        commit('setWeather', weatherdata);
    },
};

export const weather: Module<WeatherState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
