import i18n from '@/plugins/i18n';
import { LocaleState, RootState } from '@/types/types';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: LocaleState = {
    locale: 'en'
};

const LOCAL_STORAGE_KEY: string = 'homeydash:locale';

export const getters: GetterTree<LocaleState, RootState> = {
    currentLocale: (theState: LocaleState): string => {
        return theState.locale;
    }
};

const mutations: MutationTree<LocaleState> = {
    setLocale(theState: LocaleState, theLocale: string) {
        theState.locale = theLocale;
        localStorage.setItem(LOCAL_STORAGE_KEY, theLocale);
        i18n.locale = theState.locale;
    },
    initialiseLocale(theState: LocaleState) {
        if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
            theState.locale = localStorage.getItem(LOCAL_STORAGE_KEY) || 'en';
            i18n.locale = theState.locale;
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY, theState.locale);
            i18n.locale = theState.locale;
        }
    }
};

export const actions: ActionTree<LocaleState, RootState> = {
    setLocale({commit}, theLocale: string) {
        commit('setLocale', theLocale);
    },
    initialiseLocale({commit}) {
        commit('initialiseLocale');
    }
};

export const locale: Module<LocaleState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
