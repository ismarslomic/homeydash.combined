class ActionsType {
    actionName = '';
    namespace = '';

    constructor(actionName: string, namespace: string) {
        this.actionName = actionName;
        this.namespace = namespace;
    }

    get namespacedName(): string {
        return this.namespace + '/' + this.actionName;
    }
}

// Homey
export const FETCH_HOMEY: ActionsType =
    new ActionsType('fetchHomey', 'homey');

// Weather
export const FETCH_WEATHER_FORECAST: ActionsType =
    new ActionsType('fetchWeatherForecast', 'weather');

export const FETCH_WEATHER_LOCATIONS: ActionsType =
    new ActionsType('fetchWeatherLocations', 'weather');

export const CHANGE_WEATHER_LOCATION: ActionsType =
    new ActionsType('changeWeatherLocation', 'weather');

// Locale
export const INITIALIZE_LOCALE: ActionsType =
    new ActionsType('initialiseLocale', 'locale');

export const UPDATE_LOCALE: ActionsType =
    new ActionsType('updateLocale', 'locale');

// Auth
export const FETCH_AUTHENTICATED_USER: ActionsType =
    new ActionsType('fetchAuthenticatedUser', 'auth');

export const CHANGE_ATHOM_API_TOKEN: ActionsType =
    new ActionsType('changeAthomApiToken', 'auth');

// Setup
export const UPDATE_IS_SETUP_COMPLETED: ActionsType =
    new ActionsType('updateIsSetupCompleted', 'setup');

// Loading
export const START_LOADING_GEOLOCATION: ActionsType =
    new ActionsType('startLoadingGeolocation', 'loading');

export const DONE_LOADING_GEOLOCATION: ActionsType =
    new ActionsType('doneLoadingGeolocation', 'loading');

export const START_LOADING_WEATHER: ActionsType =
    new ActionsType('startLoadingWeather', 'loading');

export const DONE_LOADING_WEATHER: ActionsType =
    new ActionsType('doneLoadingWeather', 'loading');

export const START_LOADING_USER_AUTHENTICATION: ActionsType =
    new ActionsType('startLoadingUserAuthentication', 'loading');

export const DONE_LOADING_USER_AUTHENTICATION: ActionsType =
    new ActionsType('doneLoadingUserAuthentication', 'loading');

export const START_LOADING_USER: ActionsType =
    new ActionsType('startLoadingUser', 'loading');

export const DONE_LOADING_USER: ActionsType =
    new ActionsType('doneLoadingUser', 'loading');

export const START_LOADING_HOMEY_GEOLOCATION_COORDINATES: ActionsType =
    new ActionsType('startLoadingHomeyGeolocationCoordinates', 'loading');

export const DONE_LOADING_HOMEY_GEOLOCATION_COORDINATES: ActionsType =
    new ActionsType('doneLoadingHomeyGeolocationCoordinates', 'loading');
