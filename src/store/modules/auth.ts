import AthomService from '@/services/AthomService';
import {AuthState, RootState} from '@/types/types';
import {User} from '@/types/user';
import {AxiosError} from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {CHANGE_ATHOM_API_TOKEN, FETCH_AUTHENTICATED_USER} from '@/store/actions.type';
import {GET_ATHOM_API_TOKEN, GET_AUTH_USER, IS_USER_AUTHENTICATED} from '@/store/getters.type';
import {SET_ATHOM_API_TOKEN, SET_AUTH_USER} from '@/store/mutations.type';
import {AthomApiToken} from '@/types/athomapi';

const state: AuthState = {
    user: undefined,
    athomApiToken: undefined
};

export const getters: GetterTree<AuthState, RootState> = {
    [IS_USER_AUTHENTICATED.getterName]: (theState: AuthState): boolean => {
        return !!(theState.user);
    },
    [GET_AUTH_USER.getterName]: (theState: AuthState): User | undefined => {
        return theState.user;
    },
    [GET_ATHOM_API_TOKEN.getterName]: (theState: AuthState): AthomApiToken | undefined => {
        return theState.athomApiToken;
    }
};

const mutations: MutationTree<AuthState> = {
    [SET_AUTH_USER.mutationName](theState: AuthState, theUser: User) {
        theState.user = theUser;
    },
    [SET_ATHOM_API_TOKEN.mutationName](theState: AuthState, theAthomApiToken: AthomApiToken) {
        theState.athomApiToken = theAthomApiToken;
    }
};

export const actions: ActionTree<AuthState, RootState> = {
    // tslint:disable-next-line:no-shadowed-variable
    [FETCH_AUTHENTICATED_USER.actionName]({commit, getters}) {
        return new Promise((resolve, reject) => {
            AthomService.getAuthenticatedUser()
                .then((response: User) => {
                    if (response) {
                        commit(SET_AUTH_USER.mutationName, response);
                    }
                    resolve();
                })
                .catch((error: AxiosError) => {
                    // tslint:disable-next-line:no-console
                    console.error('Fetching user from Athom Homey failed');
                    // tslint:disable-next-line:no-console
                    console.error(error.message);
                    reject(error);
                });
        });
    },
    [CHANGE_ATHOM_API_TOKEN.actionName]({commit}, athomApiToken: string) {
        return new Promise((resolve) => {
            commit(SET_ATHOM_API_TOKEN.mutationName, athomApiToken);
            resolve();
        });
    }
};

export const auth: Module<AuthState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
