import GeolocationDetailsService from '@/services/GeolocationDetailsService';
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

const LS_KEY_CURRENTLOCATION: string = 'homeydash:geolocation:currentLocation';
const LS_KEY_AVAILABLELOCATIONS: string = 'homeydash:geolocation:availableLocations';
const LS_KEY_COORDINATES: string = 'homeydash:geolocation:coordinates';

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
    },
    currentCoordinates: (theState: GeolocationState): GeolocationCoordinates | undefined => {
        return theState.coordinates;
    }
};

const mutations: MutationTree<GeolocationState> = {
    setCurrentLocation(theState: GeolocationState, currentLocation: GeolocationDetails) {
        theState.currentLocation = currentLocation;
    },
    setCurrentLocationLS(theState: GeolocationState, currentLocation: GeolocationDetails) {
        localStorage.setItem(LS_KEY_CURRENTLOCATION, JSON.stringify(currentLocation));
    },
    setCoordinates(theState: GeolocationState, coordinates: GeolocationCoordinates) {
        theState.coordinates = coordinates;
    },
    setCoordinatesLS(theState: GeolocationState, coordinates: GeolocationCoordinates) {
        localStorage.setItem(LS_KEY_COORDINATES, JSON.stringify(coordinates));
    },
    setAvailableLocations(theState: GeolocationState, availableLocations: GeolocationDetails[]) {
        theState.availableLocations = availableLocations;
    },
    setAvailableLocationsLS(theState: GeolocationState, availableLocations: GeolocationDetails[]) {
        localStorage.setItem(LS_KEY_AVAILABLELOCATIONS, JSON.stringify(availableLocations));
    }
};

export const actions: ActionTree<GeolocationState, RootState> = {
    initialiseGeolocationDetails({commit, rootGetters}) {
        // We assume that if current location is found in the local storage,
        // then available locations should also exist
        if (localStorage.getItem(LS_KEY_CURRENTLOCATION)) {
            commit('setCurrentLocation', JSON.parse(localStorage.getItem(LS_KEY_CURRENTLOCATION) || '{}'));
            commit('setAvailableLocations', JSON.parse(localStorage.getItem(LS_KEY_AVAILABLELOCATIONS) || '{}'));
        } else if (state.coordinates) {
            const currentLocale: string = rootGetters['locale/currentLocale'] as string;
            GeolocationDetailsService.getGeolocationDetails(state.coordinates, currentLocale)
                .then((response: GeolocationDetails[]) => {
                    if (response && response.length > 0) {
                        commit('setCurrentLocation', response[0]);
                        commit('setAvailableLocations', response);
                        commit('setCurrentLocationLS', response[0]);
                        commit('setAvailableLocationsLS', response);
                    }
                })
                .catch((error: AxiosError) => {
                    // tslint:disable-next-line:no-console
                    console.error('Fetching geolocation failed');
                    // tslint:disable-next-line:no-console
                    console.error(error.message);
                });
        }
    },
    updateCurrentGeolocationDetails({commit}, locationDetails: GeolocationDetails) {
        commit('setCurrentLocation', locationDetails);
        commit('setCurrentLocationLS', locationDetails);
    },
    updateGeolocationDetailsNewLocale({commit, rootGetters}) {
        if (state.coordinates) {
            const currentLocationId = state.currentLocation ? state.currentLocation.id : '';
            const currentLocale: string = rootGetters['locale/currentLocale'] as string;
            GeolocationDetailsService.getGeolocationDetails(state.coordinates, currentLocale)
                .then((response: GeolocationDetails[]) => {
                    if (response && response.length > 0) {
                        const currentLocation = response.filter((details) => {
                            return details.id === currentLocationId;
                        });
                        commit('setCurrentLocation', currentLocation[0]);
                        commit('setAvailableLocations', response);
                        commit('setCurrentLocationLS', currentLocation[0]);
                        commit('setAvailableLocationsLS', response);
                    }
                })
                .catch((error: AxiosError) => {
                    // tslint:disable-next-line:no-console
                    console.error('Fetching geolocation failed');
                    // tslint:disable-next-line:no-console
                    console.error(error.message);
                });
        }
    },
    updateGeolocationCoordinates({commit}) {
        const coordinates: GeolocationCoordinates = {
            latitude: 60.926577400000006,
            longitude: 11.7693054,
            accuracy: 1000
        };
        commit('setCoordinates', coordinates);
        commit('setCoordinatesLS', coordinates);
    }
};

export const geolocation: Module<GeolocationState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
