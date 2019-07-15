import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {Geolocation, GeolocationState, RootState} from '@/types/types';

const state: GeolocationState = {
    location: {
        latitude: 59.926577400000006,
        longitude: 10.7693054,
        accuracy: 23,
        country: 'Norway',
        county: 'Oslo',
        city: 'Oslo'
    },
};

export const getters: GetterTree<GeolocationState, RootState> = {
    weather: (theState: GeolocationState) => {
        return theState.location;
    }
};

const mutations: MutationTree<GeolocationState> = {
    setGeoLocation(theState: GeolocationState, location: Geolocation) {
        theState.location = location;
    },
};

export const actions: ActionTree<GeolocationState, RootState> = {
    changeWeather({commit}, location: Geolocation) {
        commit('setGeoLocation', location);
    },
};

export const geolocation: Module<GeolocationState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
