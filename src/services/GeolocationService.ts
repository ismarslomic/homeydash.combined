import store from '@/store/store';
import { Geolocation, GeolocationCoordinates, GeolocationDetails } from '@/types/geolocation';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

class GeolocationService {
    private readonly BASE_URL: string = 'https://cors-proxy-me.herokuapp.com/https://www.yr.no/api/v0';
    private readonly TIMEOUT_IN_MILLIS: number = 10000;
    private apiClient: AxiosInstance;

    constructor() {
        this.apiClient = axios.create({
            baseURL: this.BASE_URL,
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: this.TIMEOUT_IN_MILLIS
        });
        this.apiClient.interceptors.request.use((config: any) => {
            store.dispatch('loading/startLoadingGeolocation');
            return config;
        }, (error) => {
            store.dispatch('loading/doneLoadingGeolocation');
            return Promise.reject(error);
        });
        this.apiClient.interceptors.response.use((response: any) => {
            store.dispatch('loading/doneLoadingGeolocation');
            return response;
        }, (error) => {
            store.dispatch('loading/doneLoadingGeolocation');
            return Promise.reject(error);
        });
    }

    getGeolocationDetails(coordinates: GeolocationCoordinates, language: string): Promise<any> {
        const apiPath: string = '/locations/Search?' +
            'lat=' + coordinates.latitude +
            '&lon=' + coordinates.longitude +
            '&accuracy=1000' +
            '&language=' + language;
        return this.apiClient.get(apiPath)
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .then((detailsJson) => {
                const details: GeolocationDetails = mapGeolocationDetails(detailsJson);
                const geolocation: Geolocation = {
                    coordinates,
                    details
                };
                return geolocation;
            })
            .catch((error: AxiosError) => {
                // tslint:disable-next-line:no-console
                console.error('Fetching geolocation failed');
                // tslint:disable-next-line:no-console
                console.error(error.message);
            });
    }
}

function mapGeolocationDetails(detailsJson: any): GeolocationDetails {
    if (!detailsJson && !detailsJson._embedded &&
        !detailsJson._embedded.location &&
        detailsJson._embedded.location.size === 0) {
        return undefined as unknown as GeolocationDetails;
    } else {
        const firstLocation: any = detailsJson._embedded.location[0];
        return {
            category: firstLocation.category,
            id: firstLocation.id,
            name: firstLocation.name,
            elevation: firstLocation.elevation,
            timeZone: firstLocation.timeZone,
            country: firstLocation.country,
            region: firstLocation.region,
            subregion: firstLocation.subregion
        } as GeolocationDetails;
    }
}

export default new GeolocationService();
