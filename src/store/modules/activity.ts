import AthomService from '@/services/AthomService';
import { FETCH_ACTIVITIES } from '@/store/actions.type';
import { GET_ACTIVITIES } from '@/store/getters.type';
import { SET_ACTIVITIES } from '@/store/mutations.type';
import { Activity } from '@/types/activity';
import { ActivityState, RootState } from '@/types/types';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const state: ActivityState = {
    activities: []
};

export const getters: GetterTree<ActivityState, RootState> = {
    [GET_ACTIVITIES.getterName]: (theState: ActivityState): Activity[] => {
        return theState.activities;
    }
};

const mutations: MutationTree<ActivityState> = {
    [SET_ACTIVITIES.mutationName](theState: ActivityState, theActivities: Activity[]) {
        theState.activities = theActivities;
    }
};

export const actions: ActionTree<ActivityState, RootState> = {
    [FETCH_ACTIVITIES.actionName]({commit}) {
        return new Promise((resolve, reject) => {
            AthomService.getActivities()
                .then((response: Activity[]) => {
                    commit(SET_ACTIVITIES.mutationName, response);
                    resolve();
                })
                .catch((error: any) => {
                    // tslint:disable-next-line:no-console
                    console.error('Fetching activities failed');
                    // tslint:disable-next-line:no-console
                    console.error(error.message);
                    reject(error);
                });
        });
    }
};

export const activity: Module<ActivityState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
