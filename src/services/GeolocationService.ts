import store from '@/store/store';
import { GeolocationCoordinates, GeolocationDetails } from '@/types/geolocation';
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
                if (!detailsJson && !detailsJson._embedded &&
                    !detailsJson._embedded.location &&
                    detailsJson._embedded.location.size === 0) {
                    return detailsJson;
                } else {
                    return detailsJson._embedded.location.map(mapGeolocationDetails);
                }
            })
            .catch((error: AxiosError) => {
                // tslint:disable-next-line:no-console
                console.error('Fetching geolocation failed');
                // tslint:disable-next-line:no-console
                console.error(error.message);
                return Promise.reject(error);
            });
    }
}

function mapGeolocationDetails(detailsJson: any): GeolocationDetails {
    return {
        category: detailsJson.category,
        id: detailsJson.id,
        name: detailsJson.name,
        elevation: detailsJson.elevation,
        timeZone: detailsJson.timeZone,
        country: detailsJson.country,
        region: detailsJson.region,
        subregion: detailsJson.subregion
    } as GeolocationDetails;
}

export default new GeolocationService();
