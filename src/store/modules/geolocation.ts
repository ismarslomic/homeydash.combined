import AthomService from '@/services/AthomService';
import GeolocationDetailsService from '@/services/GeolocationDetailsService';
import {GeolocationCoordinates, GeolocationDetails} from '@/types/geolocation';
import {GeolocationState, RootState} from '@/types/types';
import {AxiosError} from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {
    INITIALIZE_GEOLOCATION_COORDINATES,
    INITIALIZE_GEOLOCATION_DETAILS, UPDATE_CURRENT_GEOLOCATION_DETAILS, UPDATE_GEOLOCATION_COORDINATES,
    UPDATE_GEOLOCATION_DETAILS_NEW_LOCALE
} from '@/store/actions.type';
import {
    GET_AVAILABLE_LOCATIONS, GET_CURRENT_COORDINATES, GET_CURRENT_LOCALE,
    GET_CURRENT_LOCATION,
    IS_COORDINATE_DATA_LOADED,
    IS_DETAILS_DATA_LOADED
} from '@/store/getters.type';

const state: GeolocationState = {
    coordinates: undefined,
    currentLocation: undefined,
    availableLocations: undefined
};

const LS_KEY_CURRENTLOCATION: string = 'homeydash:geolocation:currentLocation';
const LS_KEY_AVAILABLELOCATIONS: string = 'homeydash:geolocation:availableLocations';
const LS_KEY_COORDINATES: string = 'homeydash:geolocation:coordinates';

export const getters: GetterTree<GeolocationState, RootState> = {
    [IS_COORDINATE_DATA_LOADED.getterName]: (theState: GeolocationState): boolean => {
        return !!(theState.coordinates);
    },
    [IS_DETAILS_DATA_LOADED.getterName]: (theState: GeolocationState): boolean => {
        return !!(theState.currentLocation);
    },
    [GET_CURRENT_LOCATION.getterName]: (theState: GeolocationState): GeolocationDetails | undefined => {
        return theState.currentLocation;
    },
    [GET_AVAILABLE_LOCATIONS.getterName]: (theState: GeolocationState): GeolocationDetails[] | undefined => {
        return theState.availableLocations;
    },
    [GET_CURRENT_COORDINATES.getterName]: (theState: GeolocationState): GeolocationCoordinates | undefined => {
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
    [INITIALIZE_GEOLOCATION_COORDINATES.actionName]({commit}) {
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
    [INITIALIZE_GEOLOCATION_DETAILS.actionName]({commit, rootGetters}) {
        // We assume that if current location is found in the local storage,
        // then available locations should also exist
        return new Promise((resolve, reject) => {
            if (localStorage.getItem(LS_KEY_CURRENTLOCATION)) {
                commit('setCurrentLocation', JSON.parse(localStorage.getItem(LS_KEY_CURRENTLOCATION) || '{}'));
                commit('setAvailableLocations', JSON.parse(localStorage.getItem(LS_KEY_AVAILABLELOCATIONS) || '{}'));
                resolve();
            } else if (state.coordinates) {
                const currentLocale: string = rootGetters[GET_CURRENT_LOCALE.namespacedName] as string;
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
    [UPDATE_CURRENT_GEOLOCATION_DETAILS.actionName]({commit}, locationDetails: GeolocationDetails) {
        return new Promise((resolve) => {
            commit('setCurrentLocation', locationDetails);
            commit('setCurrentLocationLS', locationDetails);
            resolve();
        });
    },
    [UPDATE_GEOLOCATION_DETAILS_NEW_LOCALE.actionName]({commit, rootGetters}) {
        return new Promise((resolve, reject) => {
            if (state.coordinates) {
                const currentLocationId = state.currentLocation ? state.currentLocation.id : '';
                const currentLocale: string = rootGetters[GET_CURRENT_LOCALE.namespacedName] as string;
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
    // TODO: temporary placeholder, needs to be replaced with fetching geolocation coordinates from Homey API
    [UPDATE_GEOLOCATION_COORDINATES.actionName]({commit}) {
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
