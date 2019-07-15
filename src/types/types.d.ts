import {Weatherdata} from '@/types/weather';

// Store root state
export interface RootState {
    weather: WeatherState;
    geolocation: Geolocation;
}

// Store location state
export interface GeolocationState {
    location: Geolocation;
}

// Store weather state for Geolocation, retrieved from internet
export interface WeatherState {
    weather: Weatherdata;
}

// Store the geolocation where Homey is placed
export interface Geolocation {
    latitude: number;
    longitude: number;
    accuracy: number;
    country: string;
    county: string;
    city: string;
}
