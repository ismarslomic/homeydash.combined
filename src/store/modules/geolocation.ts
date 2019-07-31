import AthomService from '@/services/AthomService';
import GeolocationDetailsService from '@/services/GeolocationDetailsService';
import {GeolocationCoordinates, GeolocationDetails} from '@/types/geolocation';
import {GeolocationState, RootState} from '@/types/types';
import {AxiosError} from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';

const state: GeolocationState = {
    coordinates: undefined,
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
    initialiseGeolocationCoordinates({commit}) {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem(LS_KEY_COORDINATES)) {
                commit('setCoordinates', JSON.parse(localStorage.getItem(LS_KEY_COORDINATES) || '{}'));
                resolve();
            } else {
                AthomService.getGeolocationCoordinatesForHomey()
                    .then((response: GeolocationCoordinates) => {
                        if (response) {
                            commit('setCoordinates', response);
                            commit('setCoordinatesLS', response);
                            // Will be returned as Promise so we can use then() and call
                            // initialiseGeolocationDetails() later
                            resolve();
                        } else {
                            resolve();
                        }
                    })
                    .catch((error: AxiosError) => {
                        // tslint:disable-next-line:no-console
                        console.error('Initializing geolocation coordinates from Athom Homey failed');
                        // tslint:disable-next-line:no-console
                        console.error(error.message);
                        reject(error);
                    });
            }
        });
    },
    initialiseGeolocationDetails({commit, rootGetters}) {
        // We assume that if current location is found in the local storage,
        // then available locations should also exist
        return new Promise((resolve, reject) => {
            if (localStorage.getItem(LS_KEY_CURRENTLOCATION)) {
                commit('setCurrentLocation', JSON.parse(localStorage.getItem(LS_KEY_CURRENTLOCATION) || '{}'));
                commit('setAvailableLocations', JSON.parse(localStorage.getItem(LS_KEY_AVAILABLELOCATIONS) || '{}'));
                resolve();
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
                        resolve();
                    })
                    .catch((error: AxiosError) => {
                        // tslint:disable-next-line:no-console
                        console.error('Initializing geolocation details failed');
                        // tslint:disable-next-line:no-console
                        console.error(error.message);
                        reject(error);
                    });
            } else {
                // tslint:disable-next-line:no-console
                console.error('state.coordinates is empty');
                reject('state.coordinates is empty');
            }
        });
    },
    updateCurrentGeolocationDetails({commit}, locationDetails: GeolocationDetails) {
        return new Promise((resolve) => {
            commit('setCurrentLocation', locationDetails);
            commit('setCurrentLocationLS', locationDetails);
            resolve();
        });
    },
    updateGeolocationDetailsNewLocale({commit, rootGetters}) {
        return new Promise((resolve, reject) => {
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
                        resolve();
                    })
                    .catch((error: AxiosError) => {
                        // tslint:disable-next-line:no-console
                        console.error('Updating geolocation details failed');
                        // tslint:disable-next-line:no-console
                        console.error(error.message);
                        reject(error);
                    });
            } else {
                resolve();
            }
        });
    },
    updateGeolocationCoordinates({commit}) {
        return new Promise((resolve, reject) => {
            const coordinates: GeolocationCoordinates = {
                latitude: 60.926577400000006,
                longitude: 11.7693054,
                accuracy: 1000
            };
            commit('setCoordinates', coordinates);
            commit('setCoordinatesLS', coordinates);
            resolve();
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
