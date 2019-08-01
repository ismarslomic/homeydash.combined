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

// Geolocation
export const UPDATE_GEOLOCATION_DETAILS_NEW_LOCALE: ActionsType =
    new ActionsType('updateGeolocationDetailsNewLocale', 'geolocation');

export const INITIALIZE_GEOLOCATION_COORDINATES: ActionsType =
    new ActionsType('initialiseGeolocationCoordinates', 'geolocation');

export const INITIALIZE_GEOLOCATION_DETAILS: ActionsType =
    new ActionsType('initialiseGeolocationDetails', 'geolocation');

export const UPDATE_CURRENT_GEOLOCATION_DETAILS: ActionsType =
    new ActionsType('updateCurrentGeolocationDetails', 'geolocation');

export const UPDATE_GEOLOCATION_COORDINATES: ActionsType =
    new ActionsType('updateGeolocationCoordinates', 'geolocation');

// Locale
export const INITIALIZE_LOCALE: ActionsType =
    new ActionsType('initialiseLocale', 'locale');

export const UPDATE_LOCALE: ActionsType =
    new ActionsType('updateLocale', 'locale');

// Weather
export const FETCH_WEATHER: ActionsType =
    new ActionsType('fetchWeather', 'weather');

// User
export const FETCH_AUTHENTICATED_USER: ActionsType =
    new ActionsType('fetchAuthenticatedUser', 'user');

// Setup
export const FETCH_IS_SETUP_COMPLETED: ActionsType =
    new ActionsType('fetchIsSetupCompleted', 'setup');

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
