import i18n from '@/plugins/i18n';
import {LocaleState, RootState} from '@/types/types';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {INITIALIZE_LOCALE, SET_LOCALE} from '@/store/actions.type';

const state: LocaleState = {
    locale: ''
};

const LS_KEY_LOCALE: string = 'homeydash:locale';
const DEFAULT_LOCALE: string = 'en';

export const getters: GetterTree<LocaleState, RootState> = {
    currentLocale: (theState: LocaleState): string => {
        return theState.locale;
    }
};

const mutations: MutationTree<LocaleState> = {
    setLocale(theState: LocaleState, theLocale: string) {
        theState.locale = theLocale;
        localStorage.setItem(LS_KEY_LOCALE, theLocale);
        i18n.locale = theState.locale;
    },
    initialiseLocale(theState: LocaleState) {
        if (localStorage.getItem(LS_KEY_LOCALE)) {
            theState.locale = localStorage.getItem(LS_KEY_LOCALE) || DEFAULT_LOCALE;
            i18n.locale = theState.locale;
        } else {
            localStorage.setItem(LS_KEY_LOCALE, DEFAULT_LOCALE);
            theState.locale = DEFAULT_LOCALE;
            i18n.locale = DEFAULT_LOCALE;
        }
    }
};

export const actions: ActionTree<LocaleState, RootState> = {
    [SET_LOCALE.actionName]({commit}, theLocale: string) {
        return new Promise((resolve) => {
            commit('setLocale', theLocale);
            resolve();
        });
    },
    [INITIALIZE_LOCALE.actionName]({commit}) {
        return new Promise((resolve) => {
            commit('initialiseLocale');
            resolve();
        });
    }
};

export const locale: Module<LocaleState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
