import { AthomApiToken } from '@/types/athomapi';
import { GeolocationDetails } from '@/types/geolocation';
import { Homey } from '@/types/homey';
import { Activity } from '@/types/activity';
import { User } from '@/types/user';
import { Weatherdata } from '@/types/weather';

// Store root state
export interface RootState {
    weather: WeatherState;
    loading: LoadingState;
    locale: LocaleState;
    user: AuthState;
    setup: SetupState;
    homey: HomeyState;
    auth: AuthState;
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
    activitiesWaitingCount: number;
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

// Store activity state
export interface ActivityState {
    activities: Activity[];
}
