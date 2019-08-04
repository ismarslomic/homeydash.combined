import {GeolocationCoordinates, GeolocationDetails} from '@/types/geolocation';
import {User} from '@/types/user';
import {Weatherdata} from '@/types/weather';
import {Homey} from '@/types/homey';
import {AthomApiToken} from '@/types/athomapi';

// Store root state
export interface RootState {
    weatherState: WeatherState;
    loadingState: LoadingState;
    locale: LocaleState;
    user: AuthState;
    setup: SetupState;
    homey: HomeyState;
}

// Store weather state for geolocation
export interface WeatherState {
    weatherForecast?: Weatherdata;
    availableWeatherLocations?: GeolocationDetails[];
    weatherLocation?: GeolocationDetails;
}

// Store locale state
export interface LocaleState {
    locale: string;
}

// Store api loading state
export interface LoadingState {
    weatherLocationWaitingCount: number;
    homeyWaitingCount: number;
    weatherForecastWaitingCount: number;
    userAuthenticationWaitingCount: number;
    userWaitingCount: number;
}

// Store homey authentication state
export interface AuthState {
    user?: User;
    athomApiToken?: AthomApiToken;
}

// Store setup state
export interface SetupState {
    isSetupCompleted: boolean;
}

// Store homey state
export interface HomeyState {
    homey?: Homey;
}
