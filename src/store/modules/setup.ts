import {RootState, StoreState} from '@/types/types';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {FETCH_IS_SETUP_COMPLETED, SET_IS_SETUP_COMPLETED} from '@/store/actions.type';
import {IS_SETUP_COMPLETED} from '@/store/getters.type';
import {SET_SETUP_COMPLETED} from '@/store/mutations.type';

const state: StoreState = {
    isSetupCompleted: false
};

const LS_KEY_IS_SETUP_COMPLETED: string = 'homeydash:setup:isSetupCompleted';

export const getters: GetterTree<StoreState, RootState> = {
    [IS_SETUP_COMPLETED.getterName]: (theState: StoreState): boolean => {
        return theState.isSetupCompleted;
    }
};

const mutations: MutationTree<StoreState> = {
    [SET_SETUP_COMPLETED.mutationName](theState: StoreState, theIsSetupCompleted: boolean) {
        theState.isSetupCompleted = theIsSetupCompleted;
        localStorage.setItem(LS_KEY_IS_SETUP_COMPLETED, theIsSetupCompleted.toString());
    }
};

export const actions: ActionTree<StoreState, RootState> = {
    [SET_IS_SETUP_COMPLETED.actionName]({commit}, theIsSetupCompleted: boolean) {
        return new Promise((resolve) => {
            commit(SET_SETUP_COMPLETED.mutationName, theIsSetupCompleted);
            resolve();
        });
    },
    [FETCH_IS_SETUP_COMPLETED.actionName]({commit}) {
        return new Promise((resolve) => {
            if (localStorage.getItem(LS_KEY_IS_SETUP_COMPLETED)) {
                const isCompletedBoolean: boolean = (localStorage.getItem(LS_KEY_IS_SETUP_COMPLETED) === 'true');
                commit(SET_SETUP_COMPLETED.mutationName, isCompletedBoolean);
                resolve();
            } else {
                resolve();
            }
        });
    }
};

export const setup: Module<StoreState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
