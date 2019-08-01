import AthomService from '@/services/AthomService';
import GeolocationDetailsService from '@/services/GeolocationDetailsService';
import {GeolocationCoordinates, GeolocationDetails} from '@/types/geolocation';
import {GeolocationState, RootState} from '@/types/types';
import {AxiosError} from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {
    INITIALIZE_GEOLOCATION_COORDINATES,
    INITIALIZE_GEOLOCATION_DETAILS,
    UPDATE_CURRENT_GEOLOCATION_DETAILS,
    UPDATE_GEOLOCATION_COORDINATES,
    UPDATE_GEOLOCATION_DETAILS_NEW_LOCALE
} from '@/store/actions.type';
import {
    GET_AVAILABLE_LOCATIONS,
    GET_CURRENT_COORDINATES,
    GET_CURRENT_LOCALE,
    GET_CURRENT_LOCATION,
    IS_COORDINATE_DATA_LOADED,
    IS_DETAILS_DATA_LOADED
} from '@/store/getters.type';
import {
    SET_AVAILABLE_LOCATIONS,
    SET_AVAILABLE_LOCATIONS_LS,
    SET_COORDINATES,
    SET_COORDINATES_LS,
    SET_CURRENT_LOCATION,
    SET_CURRENT_LOCATION_LS
} from '@/store/mutations.type';

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
    [SET_CURRENT_LOCATION.mutationName](theState: GeolocationState, currentLocation: GeolocationDetails) {
        theState.currentLocation = currentLocation;
    },
    [SET_CURRENT_LOCATION_LS.mutationName](theState: GeolocationState, currentLocation: GeolocationDetails) {
        localStorage.setItem(LS_KEY_CURRENTLOCATION, JSON.stringify(currentLocation));
    },
    [SET_COORDINATES.mutationName](theState: GeolocationState, coordinates: GeolocationCoordinates) {
        theState.coordinates = coordinates;
    },
    [SET_COORDINATES_LS.mutationName](theState: GeolocationState, coordinates: GeolocationCoordinates) {
        localStorage.setItem(LS_KEY_COORDINATES, JSON.stringify(coordinates));
    },
    [SET_AVAILABLE_LOCATIONS.mutationName](theState: GeolocationState, availableLocations: GeolocationDetails[]) {
        theState.availableLocations = availableLocations;
    },
    [SET_AVAILABLE_LOCATIONS_LS.mutationName](theState: GeolocationState, availableLocations: GeolocationDetails[]) {
        localStorage.setItem(LS_KEY_AVAILABLELOCATIONS, JSON.stringify(availableLocations));
    }
};

export const actions: ActionTree<GeolocationState, RootState> = {
    [INITIALIZE_GEOLOCATION_COORDINATES.actionName]({commit}) {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem(LS_KEY_COORDINATES)) {
                commit(SET_COORDINATES.mutationName, JSON.parse(localStorage.getItem(LS_KEY_COORDINATES) || '{}'));
                resolve();
            } else {
                AthomService.getGeolocationCoordinatesForHomey()
                    .then((response: GeolocationCoordinates) => {
                        if (response) {
                            commit(SET_COORDINATES.mutationName, response);
                            commit(SET_COORDINATES_LS.mutationName, response);
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
                commit(SET_CURRENT_LOCATION.mutationName,
                    JSON.parse(localStorage.getItem(LS_KEY_CURRENTLOCATION) || '{}'));
                commit(SET_AVAILABLE_LOCATIONS.mutationName,
                    JSON.parse(localStorage.getItem(LS_KEY_AVAILABLELOCATIONS) || '{}'));
                resolve();
            } else if (state.coordinates) {
                const currentLocale: string = rootGetters[GET_CURRENT_LOCALE.namespacedName] as string;
                GeolocationDetailsService.getGeolocationDetails(state.coordinates, currentLocale)
                    .then((response: GeolocationDetails[]) => {
                        if (response && response.length > 0) {
                            commit(SET_CURRENT_LOCATION.mutationName, response[0]);
                            commit(SET_AVAILABLE_LOCATIONS.mutationName, response);
                            commit(SET_CURRENT_LOCATION_LS.mutationName, response[0]);
                            commit(SET_AVAILABLE_LOCATIONS_LS.mutationName, response);
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
            commit(SET_CURRENT_LOCATION.mutationName, locationDetails);
            commit(SET_CURRENT_LOCATION_LS.mutationName, locationDetails);
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
                            commit(SET_CURRENT_LOCATION.mutationName, currentLocation[0]);
                            commit(SET_AVAILABLE_LOCATIONS.mutationName, response);
                            commit(SET_CURRENT_LOCATION_LS.mutationName, currentLocation[0]);
                            commit(SET_AVAILABLE_LOCATIONS_LS.mutationName, response);
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
            commit(SET_COORDINATES.mutationName, coordinates);
            commit(SET_COORDINATES_LS.mutationName, coordinates);
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
