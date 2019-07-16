import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { GeolocationState, RootState } from '@/types/types';
import {Geolocation} from '@/types/geolocation';

const state: GeolocationState = {
    location: {
        coordinates: {
            latitude: 59.926577400000006,
            longitude: 10.7693054,
            accuracy: 23
        },
        details: {
            category: {
                id: 'CH10',
                name: 'Part of a city'
            },
            id: '1-73823',
            name: 'Grünerløkka',
            elevation: 19,
            timeZone: 'Europe/Oslo',
            country: {
                id: 'NO',
                name: 'Norway'
            },
            region: {
                id: 'NO/03',
                name: 'Oslo'
            },
            subregion: {
                id: 'NO/03/0301',
                name: 'Oslo'
            }
        }
    }
};

export const getters: GetterTree<GeolocationState, RootState> = {
    weather: (theState: GeolocationState) => {
        return theState.location;
    }
};

const mutations: MutationTree<GeolocationState> = {
    setGeoLocation(theState: GeolocationState, location: Geolocation) {
        theState.location = location;
    }
};

export const actions: ActionTree<GeolocationState, RootState> = {
    changeWeather({commit}, location: Geolocation) {
        commit('setGeoLocation', location);
    }
};

export const geolocation: Module<GeolocationState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
