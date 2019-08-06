import AthomService from '@/services/AthomService';
import { FETCH_NOTIFICATIONS } from '@/store/actions.type';
import { GET_NOTIFICATIONS } from '@/store/getters.type';
import { SET_NOTIFICATIONS } from '@/store/mutations.type';
import { Notification } from '@/types/notification';
import { NotificationState, RootState } from '@/types/types';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: NotificationState = {
    notifications: []
};

export const getters: GetterTree<NotificationState, RootState> = {
    [GET_NOTIFICATIONS.getterName]: (theState: NotificationState): Notification[] => {
        return theState.notifications;
    }
};

const mutations: MutationTree<NotificationState> = {
    [SET_NOTIFICATIONS.mutationName](theState: NotificationState, theNotifications: Notification[]) {
        theState.notifications = theNotifications;
    }
};

export const actions: ActionTree<NotificationState, RootState> = {
    [FETCH_NOTIFICATIONS.actionName]({commit}) {
        return new Promise((resolve, reject) => {
            AthomService.getNotifications()
                .then((response: Notification[]) => {
                    commit(SET_NOTIFICATIONS.mutationName, response);
                    resolve();
                })
                .catch((error: any) => {
                    // tslint:disable-next-line:no-console
                    console.error('Fetching notifications failed');
                    // tslint:disable-next-line:no-console
                    console.error(error.message);
                    reject(error);
                });
        });
    }
};

export const notification: Module<NotificationState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
