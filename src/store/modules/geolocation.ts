import GeolocationService from '@/services/GeolocationService';
import { Geolocation, GeolocationCoordinates } from '@/types/geolocation';
import { GeolocationState, RootState } from '@/types/types';
import { AxiosError } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: GeolocationState = {
    location: undefined
};

export const getters: GetterTree<GeolocationState, RootState> = {};

const mutations: MutationTree<GeolocationState> = {
    setGeolocation(theState: GeolocationState, location: Geolocation) {
        theState.location = location;
    }
};

export const actions: ActionTree<GeolocationState, RootState> = {
    fetchGeolocationDetails({commit}) {
        if (state.location) {
            return;
        }
        const geolocationCoordinates: GeolocationCoordinates = {
            latitude: 59.926577400000006,
            longitude: 10.7693054,
            accuracy: 1000
        };
        return GeolocationService.getGeolocationDetails(geolocationCoordinates, 'en')
            .then((response: Geolocation) => {
                commit('setGeolocation', response);
            })
            .catch((error: AxiosError) => {
                // tslint:disable-next-line:no-console
                console.error('Fetching geolocation failed');
                // tslint:disable-next-line:no-console
                console.error(error.message);
            });
    }
};

export const geolocation: Module<GeolocationState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
