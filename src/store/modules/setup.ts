import {RootState, SetupState} from '@/types/types';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {UPDATE_IS_SETUP_COMPLETED} from '@/store/actions.type';
import {IS_SETUP_COMPLETED} from '@/store/getters.type';
import {SET_IS_SETUP_COMPLETED} from '@/store/mutations.type';

const state: SetupState = {
    isSetupCompleted: false
};

export const getters: GetterTree<SetupState, RootState> = {
    [IS_SETUP_COMPLETED.getterName]: (theState: SetupState): boolean => {
        return theState.isSetupCompleted;
    }
};

const mutations: MutationTree<SetupState> = {
    [SET_IS_SETUP_COMPLETED.mutationName](theState: SetupState, theIsSetupCompleted: boolean) {
        theState.isSetupCompleted = theIsSetupCompleted;
    }
};

export const actions: ActionTree<SetupState, RootState> = {
    [UPDATE_IS_SETUP_COMPLETED.actionName]({commit}, theIsSetupCompleted: boolean) {
        return new Promise((resolve) => {
            commit(SET_IS_SETUP_COMPLETED.mutationName, theIsSetupCompleted);
            resolve();
        });
    }
};

export const setup: Module<SetupState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
