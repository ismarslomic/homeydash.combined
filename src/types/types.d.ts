import {Weatherdata} from '@/types/weather';
import {Geolocation} from '@/types/geolocation';

// Store root state
export interface RootState {
    weatherState: WeatherState;
    geolocationState: Geolocation;
}

// Store geolocation state
export interface GeolocationState {
    location?: Geolocation;
}

// Store weather state for geolocation
export interface WeatherState {
    weather?: Weatherdata;
}

// Store api loading state
export interface LoadingState {
    geolocationWaitingCount: number;
    weatherWaitingCount: number;
}
