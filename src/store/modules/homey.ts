import AthomService from '@/services/AthomService';
import {GeolocationCoordinates} from '@/types/geolocation';
import {HomeyState, RootState} from '@/types/types';
import {AxiosError} from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {FETCH_HOMEY} from '@/store/actions.type';
import {GET_HOMEY, GET_HOMEY_GEO_COORDINATES, IS_HOMEY_GEO_COORDINATES_LOADED} from '@/store/getters.type';
import {SET_HOMEY} from '@/store/mutations.type';
import {Homey} from '@/types/homey';

const state: HomeyState = {
    homey: undefined
};

export const getters: GetterTree<HomeyState, RootState> = {
    [IS_HOMEY_GEO_COORDINATES_LOADED.getterName]: (theState: HomeyState): boolean => {
        return !!(theState.homey && theState.homey.homeyGeoCoordinates);
    },
    [GET_HOMEY_GEO_COORDINATES.getterName]: (theState: HomeyState): GeolocationCoordinates | undefined => {
        return theState.homey ? theState.homey.homeyGeoCoordinates : undefined;
    },
    [GET_HOMEY.getterName]: (theState: HomeyState): Homey | undefined => {
        return theState.homey;
    }
};

const mutations: MutationTree<HomeyState> = {
    [SET_HOMEY.mutationName](theState: HomeyState, theHomey: Homey) {
        theState.homey = theHomey;
    }
};

export const actions: ActionTree<HomeyState, RootState> = {
    [FETCH_HOMEY.actionName]({commit}) {
        return new Promise((resolve, reject) => {
            AthomService.getHomey()
                .then((response: Homey) => {
                    if (response) {
                        commit(SET_HOMEY.mutationName, response);
                    }
                    resolve();
                })
                .catch((error: AxiosError) => {
                    // tslint:disable-next-line:no-console
                    console.error('Fetching homey from Athom failed');
                    // tslint:disable-next-line:no-console
                    console.error(error.message);
                    reject(error);
                });
        });
    }
};

export const homey: Module<HomeyState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
