import i18n from '@/plugins/i18n';
import { CHANGE_LOCALE, INITIALIZE_LOCALE } from '@/store/actions.type';
import { GET_LOCALE } from '@/store/getters.type';
import { SET_LOCALE } from '@/store/mutations.type';
import { LocaleState, RootState } from '@/types/types';
import moment from 'moment';
import 'moment/locale/nb'; // norwegian-bokmål
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: LocaleState = {
    locale: ''
};

const DEFAULT_LOCALE: string = 'en';

export const getters: GetterTree<LocaleState, RootState> = {
    [GET_LOCALE.getterName]: (theState: LocaleState): string => {
        return theState.locale;
    }
};

const mutations: MutationTree<LocaleState> = {
    [SET_LOCALE.mutationName](theState: LocaleState, theLocale: string) {
        theState.locale = theLocale;
    }
};

export const actions: ActionTree<LocaleState, RootState> = {
    [CHANGE_LOCALE.actionName]({commit}, theLocale: string) {
        return new Promise((resolve) => {
            commit(SET_LOCALE.mutationName, theLocale);
            i18n.locale = theLocale;
            moment.locale(theLocale);
            resolve();
        });
    },
    // tslint:disable-next-line:no-shadowed-variable
    [INITIALIZE_LOCALE.actionName]({dispatch, getters}) {
        return new Promise((resolve) => {
            const stateLocale: string = getters[GET_LOCALE.getterName];
            if (stateLocale) {
                i18n.locale = stateLocale;
                moment.locale(stateLocale);
                resolve();
            } else {
                return dispatch(CHANGE_LOCALE.actionName, DEFAULT_LOCALE);
            }
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
