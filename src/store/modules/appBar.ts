import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { AppBarState, RootState } from '@/types';

const state: AppBarState = {
    title: 'Dashboard',
};

export const getters: GetterTree<AppBarState, RootState> = {
    title: (theState: AppBarState) => {
        return theState.title;
    }
};

const mutations: MutationTree<AppBarState> = {
    setTitle(theState: AppBarState, title: string) {
        theState.title = title;
    },
};

export const actions: ActionTree<AppBarState, RootState> = {
    changeTitle({commit}, title: string) {
        commit('setTitle', title);
    },
};

export const appBar: Module<AppBarState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
