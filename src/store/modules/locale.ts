import i18n from '@/plugins/i18n';
import {LocaleState, RootState} from '@/types/types';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {INITIALIZE_LOCALE, UPDATE_LOCALE} from '@/store/actions.type';
import {GET_CURRENT_LOCALE} from '@/store/getters.type';
import {SET_LOCALE, SET_LOCALE_LS} from '@/store/mutations.type';

const state: LocaleState = {
    locale: ''
};

const LS_KEY_LOCALE: string = 'homeydash:locale';
const DEFAULT_LOCALE: string = 'en';

export const getters: GetterTree<LocaleState, RootState> = {
    [GET_CURRENT_LOCALE.getterName]: (theState: LocaleState): string => {
        return theState.locale;
    }
};

const mutations: MutationTree<LocaleState> = {
    [SET_LOCALE.mutationName](theState: LocaleState, theLocale: string) {
        theState.locale = theLocale;
    },
    [SET_LOCALE_LS.mutationName](theState: LocaleState, theLocale: string) {
        localStorage.setItem(LS_KEY_LOCALE, theLocale);
    }
};

export const actions: ActionTree<LocaleState, RootState> = {
    [UPDATE_LOCALE.actionName]({commit}, theLocale: string) {
        return new Promise((resolve) => {
            commit(SET_LOCALE.mutationName, theLocale);
            commit(SET_LOCALE_LS.mutationName, theLocale);
            i18n.locale = theLocale;
            resolve();
        });
    },
    [INITIALIZE_LOCALE.actionName]({commit}) {
        return new Promise((resolve) => {
            if (localStorage.getItem(LS_KEY_LOCALE)) {
                const theLocale: string = localStorage.getItem(LS_KEY_LOCALE) || DEFAULT_LOCALE;
                commit(SET_LOCALE.mutationName, theLocale);
                i18n.locale = theLocale;
            } else {
                commit(SET_LOCALE.mutationName, DEFAULT_LOCALE);
                commit(SET_LOCALE_LS.mutationName, DEFAULT_LOCALE);
                i18n.locale = DEFAULT_LOCALE;
            }
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
