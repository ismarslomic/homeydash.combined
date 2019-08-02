class MutationsType {
    mutationName = '';

    constructor(mutationName: string) {
        this.mutationName = mutationName;
    }
}

// Geolocation
export const SET_CURRENT_LOCATION: MutationsType =
    new MutationsType('setCurrentLocation');

export const SET_COORDINATES: MutationsType =
    new MutationsType('setCoordinates');

export const SET_AVAILABLE_LOCATIONS: MutationsType =
    new MutationsType('setAvailableLocations');

// Loading
export const INCREASE_GEOLOCATION_WAITING_COUNT: MutationsType =
    new MutationsType('increaseGeolocationWaitingCount');

export const DECREASE_GEOLOCATION_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseGeolocationWaitingCount');

export const INCREASE_WEATHER_WAITING_COUNT: MutationsType =
    new MutationsType('increaseWeatherWaitingCount');

export const DECREASE_WEATHER_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseWeatherWaitingCount');

export const INCREASE_USER_AUTHENTICATION_WAITING_COUNT: MutationsType =
    new MutationsType('increaseUserAuthenticationWaitingCount');

export const DECREASE_USER_AUTHENTICATION_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseUserAuthenticationWaitingCount');

export const INCREASE_USER_WAITING_COUNT: MutationsType =
    new MutationsType('increaseUserWaitingCount');

export const DEACREASE_USER_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseUserWaitingCount');

export const INCREASE_GEOLOCATION_COORDINATES_WAITING_COUNT: MutationsType =
    new MutationsType('increaseGeolocationCoordinatesWaitingCount');

export const DECREASE_GEOLOCATION_COORDINATES_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseGeolocationCoordinatesWaitingCount');

// Locale
export const SET_LOCALE: MutationsType =
    new MutationsType('setLocale');

// User
export const SET_USER: MutationsType =
    new MutationsType('setUser');

// Weather
export const SET_WEATHER: MutationsType =
    new MutationsType('setWeather');

// Setup
export const SET_IS_SETUP_COMPLETED: MutationsType =
    new MutationsType('setIsSetupCompleted');
