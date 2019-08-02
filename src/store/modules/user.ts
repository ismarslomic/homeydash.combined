import AthomService from '@/services/AthomService';
import {RootState, UserState} from '@/types/types';
import {User} from '@/types/user';
import {AxiosError} from 'axios';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {FETCH_AUTHENTICATED_USER} from '@/store/actions.type';
import {GET_USER, IS_USER_AUTHENTICATED} from '@/store/getters.type';
import {SET_USER} from '@/store/mutations.type';

const state: UserState = {
    user: undefined
};

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
    }
};

export const actions: ActionTree<UserState, RootState> = {
    // tslint:disable-next-line:no-shadowed-variable
    [FETCH_AUTHENTICATED_USER.actionName]({commit, getters}) {
        return new Promise((resolve, reject) => {
            const stateUser: User = getters[GET_USER.getterName];
            if (stateUser) {
                resolve();
            } else {
                AthomService.getAuthenticatedUser()
                    .then((response: User) => {
                        if (response) {
                            commit(SET_USER.mutationName, response);
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
