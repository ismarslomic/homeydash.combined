import GeolocationService from '@/services/GeolocationService';
import { GeolocationCoordinates, GeolocationDetails } from '@/types/geolocation';
import { GeolocationState, RootState } from '@/types/types';
import { AxiosError } from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: GeolocationState = {
    coordinates: {
        latitude: 59.926577400000006,
        longitude: 10.7693054,
        accuracy: 1000
    },
    currentLocation: undefined,
    availableLocations: undefined
};

export const getters: GetterTree<GeolocationState, RootState> = {
    isCoordinateDataLoaded: (theState: GeolocationState): boolean => {
        return !!(theState.coordinates);
    },
    isDetailsDataLoaded: (theState: GeolocationState): boolean => {
        return !!(theState.currentLocation);
    },
    currentLocation: (theState: GeolocationState): GeolocationDetails | undefined => {
        return theState.currentLocation;
    },
    availableLocations: (theState: GeolocationState): GeolocationDetails[] | undefined => {
        return theState.availableLocations;
    }
};

const mutations: MutationTree<GeolocationState> = {
    setCurrentLocation(theState: GeolocationState, currentLocation: GeolocationDetails) {
        theState.currentLocation = currentLocation;
    },
    setCoordinates(theState: GeolocationState, coordinates: GeolocationCoordinates) {
        theState.coordinates = coordinates;
    },
    setAvailableLocations(theState: GeolocationState, availableLocations: GeolocationDetails[]) {
        theState.availableLocations = availableLocations;
    }
};

export const actions: ActionTree<GeolocationState, RootState> = {
    fetchGeolocationDetails({commit}) {
        if (state.currentLocation || !state.coordinates) {
            return;
        }
        return GeolocationService.getGeolocationDetails(state.coordinates, 'en')
            .then((response: GeolocationDetails[]) => {
                if (response && response.length > 0) {
                    commit('setCurrentLocation', response[0]);
                    commit('setAvailableLocations', response);
                }
            })
            .catch((error: AxiosError) => {
                // tslint:disable-next-line:no-console
                console.error('Fetching geolocation failed');
                // tslint:disable-next-line:no-console
                console.error(error.message);
            });
    },
    updateCurrentGeolocationDetails({commit}, locationDetails: GeolocationDetails) {
        commit('setCurrentLocation', locationDetails);
    }
};

export const geolocation: Module<GeolocationState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
