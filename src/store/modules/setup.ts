import {RootState, StoreState} from '@/types/types';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {UPDATE_IS_SETUP_COMPLETED} from '@/store/actions.type';
import {IS_SETUP_COMPLETED} from '@/store/getters.type';
import {SET_IS_SETUP_COMPLETED} from '@/store/mutations.type';

const state: StoreState = {
    isSetupCompleted: false
};

export const getters: GetterTree<StoreState, RootState> = {
    [IS_SETUP_COMPLETED.getterName]: (theState: StoreState): boolean => {
        return theState.isSetupCompleted;
    }
};

const mutations: MutationTree<StoreState> = {
    [SET_IS_SETUP_COMPLETED.mutationName](theState: StoreState, theIsSetupCompleted: boolean) {
        theState.isSetupCompleted = theIsSetupCompleted;
    }
};

export const actions: ActionTree<StoreState, RootState> = {
    [UPDATE_IS_SETUP_COMPLETED.actionName]({commit}, theIsSetupCompleted: boolean) {
        return new Promise((resolve) => {
            commit(SET_IS_SETUP_COMPLETED.mutationName, theIsSetupCompleted);
            resolve();
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
