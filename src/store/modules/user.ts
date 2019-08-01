import AthomService from '@/services/AthomService';
import {RootState, UserState} from '@/types/types';
import {User} from '@/types/user';
import {AxiosError} from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {FETCH_AUTHENTICATED_USER} from '@/store/actions.type';
import {GET_USER, IS_USER_AUTHENTICATED} from '@/store/getters.type';
import {SET_USER, SET_USER_LS} from '@/store/mutations.type';

const state: UserState = {
    user: undefined
};

const LS_KEY_USER: string = 'homeydash:user';

export const getters: GetterTree<UserState, RootState> = {
    [IS_USER_AUTHENTICATED.getterName]: (theState: UserState): boolean => {
        return !!(theState.user);
    },
    [GET_USER.getterName]: (theState: UserState): User | undefined => {
        return theState.user;
    }
};

const mutations: MutationTree<UserState> = {
    [SET_USER.mutationName](theState: UserState, theUser: User) {
        theState.user = theUser;
    },
    [SET_USER_LS.mutationName](theState: UserState, theUser: User) {
        localStorage.setItem(LS_KEY_USER, JSON.stringify(theUser));
    }
};

export const actions: ActionTree<UserState, RootState> = {
    [FETCH_AUTHENTICATED_USER.actionName]({commit}) {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem(LS_KEY_USER)) {
                commit(SET_USER.mutationName, JSON.parse(localStorage.getItem(LS_KEY_USER) || '{}'));
                resolve();
            } else {
                AthomService.getAuthenticatedUser()
                    .then((response: User) => {
                        if (response) {
                            commit(SET_USER.mutationName, response);
                            commit(SET_USER_LS.mutationName, response);
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
            }
        });
    }
};

export const user: Module<UserState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
