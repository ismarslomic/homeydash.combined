import {
    DONE_LOADING_HOMEY,
    DONE_LOADING_USER,
    DONE_LOADING_USER_AUTHENTICATION,
    START_LOADING_HOMEY,
    START_LOADING_USER,
    START_LOADING_USER_AUTHENTICATION
} from '@/store/actions.type';
import { GET_ATHOM_API_TOKEN } from '@/store/getters.type';
import store from '@/store/store';
import { AthomApiToken } from '@/types/athomapi';
import { GeolocationCoordinates } from '@/types/geolocation';
import { Homey } from '@/types/homey';
import { User } from '@/types/user';
import { AthomCloudAPI, HomeyAPI } from 'athom-api';

class AthomService {
    private readonly CLIENT_ID: string = '5cbb504da1fc782009f52e46';
    private readonly CLIENT_SECRET: string = 'gvhs0gebgir8vz8yo2l0jfb49u9xzzhrkuo1uvs8';
    private athomCloudAPI: AthomCloudAPI;
    private homeyAPI: HomeyAPI | null;

    constructor() {
        this.athomCloudAPI = new AthomCloudAPI({
            clientId: this.CLIENT_ID,
            clientSecret: this.CLIENT_SECRET
        });
        this.homeyAPI = null;
    }

    authenticate(): Promise<void> {
        return new Promise((resolve, reject) => {
            const token: AthomApiToken = store.getters[GET_ATHOM_API_TOKEN.namespacedName];
            this.athomCloudAPI.setToken(token);
            store.dispatch(START_LOADING_USER_AUTHENTICATION.namespacedName);
            this.athomCloudAPI.getAuthenticatedUser()
            // @ts-ignore
                .then((authenticatedUser: any) => {
                    return authenticatedUser.getFirstHomey();
                })
                .then((firstHomey: any) => {
                    return firstHomey.authenticate();
                })
                .then((api: any) => {
                    this.homeyAPI = api;
                    store.dispatch(DONE_LOADING_USER_AUTHENTICATION.namespacedName);
                    resolve();
                })
                .catch((error: any) => {
                    // tslint:disable-next-line:no-console
                    console.error(error);
                    store.dispatch(DONE_LOADING_USER_AUTHENTICATION.namespacedName);
                    reject(error);
                });
        });
    }

    getAuthenticatedUser(): Promise<User> {
        if (!this.homeyAPI) {
            return this.authenticate()
                .then(() => {
                    return this._getAuthenticatedUser();
                });
        } else {
            return this._getAuthenticatedUser();
        }
    }

    getHomey(): Promise<Homey> {
        if (!this.homeyAPI) {
            return this.authenticate()
                .then(() => {
                    return this._getHomey();
                });
        } else {
            return this._getHomey();
        }
    }

    private _getAuthenticatedUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            store.dispatch(START_LOADING_USER.namespacedName);
            // @ts-ignore
            this.homeyAPI.users.getUserMe()
            // @ts-ignore
                .then((homeyUser: any) => {
                    store.dispatch(DONE_LOADING_USER.namespacedName);
                    resolve(mapUser(homeyUser));
                })
                .catch((error: any) => {
                    // tslint:disable-next-line:no-console
                    console.error(error);
                    store.dispatch(DONE_LOADING_USER.namespacedName);
                    reject(error);
                });
        });
    }

    private _getHomey(): Promise<Homey> {
        return new Promise((resolve, reject) => {
            store.dispatch(START_LOADING_HOMEY.namespacedName);
            // @ts-ignore
            this.athomCloudAPI.getAuthenticatedUser()
            // @ts-ignore
                .then((authenticatedUser: any) => {
                    return authenticatedUser.getFirstHomey();
                })
                .then((firstHomey: any) => {
                    store.dispatch(DONE_LOADING_HOMEY.namespacedName);
                    resolve(mapHomey(firstHomey));
                })
                .catch((error: any) => {
                    // tslint:disable-next-line:no-console
                    console.error(error);
                    store.dispatch(DONE_LOADING_HOMEY.namespacedName);
                    reject(error);
                });
        });
    }
}

function mapUser(userJson: any): User {
    return {
        name: userJson.name,
        role: userJson.role,
        avatar: userJson.avatar
    };
}

function mapHomey(homeyJson: any): Homey {
    return {
        _id: homeyJson._id,
        name: homeyJson.name,
        language: homeyJson.language,
        softwareVersion: homeyJson.softwareVersion,
        state: homeyJson.state,
        stateSince: homeyJson.stateSince,
        mobileAppVersionSupported: homeyJson.mobileAppVersionSupported,
        apiVersion: homeyJson.apiVersion,
        id: homeyJson.id,
        role: homeyJson.role,
        homeyGeoCoordinates: mapGeolocationCoordinates(homeyJson.geolocation)
    };
}

function mapGeolocationCoordinates(geoLocationJson: any): GeolocationCoordinates {
    return {
        latitude: geoLocationJson.latitude,
        longitude: geoLocationJson.longitude,
        accuracy: geoLocationJson.accuracy
    };
}

export default new AthomService();
