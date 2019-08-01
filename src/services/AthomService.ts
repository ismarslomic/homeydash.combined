import store from '@/store/store';
import { AthomApiToken } from '@/types/athomapi';
import { GeolocationCoordinates } from '@/types/geolocation';
import { User } from '@/types/user';
import { AthomCloudAPI, HomeyAPI } from 'athom-api';
import {
    DONE_LOADING_HOMEY_GEOLOCATION_COORDINATES,
    DONE_LOADING_USER,
    DONE_LOADING_USER_AUTHENTICATION, START_LOADING_HOMEY_GEOLOCATION_COORDINATES,
    START_LOADING_USER,
    START_LOADING_USER_AUTHENTICATION
} from '@/store/actions.type';

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

    authenticate(token: AthomApiToken): Promise<void> {
        this.athomCloudAPI.setToken(token);
        store.dispatch(START_LOADING_USER_AUTHENTICATION.namespacedName);
        return this.athomCloudAPI.getAuthenticatedUser()
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
                return Promise.resolve();
            })
            .catch((error: any) => {
                // tslint:disable-next-line:no-console
                console.error(error);
                Promise.reject(error);
            });
    }

    getAuthenticatedUser(): Promise<User> {
        if (!this.homeyAPI) {
            return Promise.reject('User not authenticated, homeyAPI not initiated');
        } else {
            store.dispatch(START_LOADING_USER.namespacedName);
            return this.homeyAPI.users.getUserMe()
            // @ts-ignore
                .then((homeyUser: any) => {
                    store.dispatch(DONE_LOADING_USER.namespacedName);
                    return Promise.resolve(mapUser(homeyUser));
                })
                .catch((error: any) => {
                    // tslint:disable-next-line:no-console
                    console.error(error);
                    Promise.reject(error);
                });
        }
    }

    getGeolocationCoordinatesForHomey(): Promise<GeolocationCoordinates> {
        if (!this.homeyAPI) {
            return Promise.reject('User not authenticated');
        } else {
            store.dispatch(START_LOADING_HOMEY_GEOLOCATION_COORDINATES.namespacedName);
            return this.homeyAPI.geolocation.getOptionLocation()
            // @ts-ignore
                .then((homeyCoordinates: any) => {
                    store.dispatch(DONE_LOADING_HOMEY_GEOLOCATION_COORDINATES.namespacedName);
                    return Promise.resolve(mapGeolocationCoordinates(homeyCoordinates));
                })
                .catch((error: any) => {
                    // tslint:disable-next-line:no-console
                    console.error(error);
                });
        }
    }
}

function mapUser(userJson: any): User {
    return {
        name: userJson.name,
        role: userJson.role,
        avatar: userJson.avatar
    };
}

function mapGeolocationCoordinates(homeyJson: any): GeolocationCoordinates {
    return {
        latitude: homeyJson.value.latitude,
        longitude: homeyJson.value.longitude,
        accuracy: homeyJson.value.accuracy
    };
}

export default new AthomService();
