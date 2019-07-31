import {GeolocationCoordinates, GeolocationDetails} from '@/types/geolocation';
import {User} from '@/types/user';
import {Weatherdata} from '@/types/weather';

// Store root state
export interface RootState {
    weatherState: WeatherState;
    geolocationState: GeolocationState;
    loadingState: LoadingState;
    user: UserState;
}

// Store geolocation state
export interface GeolocationState {
    coordinates?: GeolocationCoordinates;
    currentLocation?: GeolocationDetails;
    availableLocations?: GeolocationDetails[];
}

// Store weather state for geolocation
export interface WeatherState {
    weather?: Weatherdata;
}

// Store locale state
export interface LocaleState {
    locale: string;
}

// Store api loading state
export interface LoadingState {
    geolocationWaitingCount: number;
    weatherWaitingCount: number;
    userAuthenticationWaitingCount: number;
    userWaitingCount: number;
    geolocationCoordinatesWaitingCount: number;
}

// Store homey user profile state
export interface UserState {
    user?: User;
}

// Store setup state
export interface StoreState {
    isSetupCompleted: boolean;
}
