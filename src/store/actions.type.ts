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

export const CHANGE_LOCALE: ActionsType =
    new ActionsType('changeLocale', 'locale');

// Auth
export const FETCH_AUTHENTICATED_USER: ActionsType =
    new ActionsType('fetchAuthenticatedUser', 'auth');

export const CHANGE_ATHOM_API_TOKEN: ActionsType =
    new ActionsType('changeAthomApiToken', 'auth');

// Setup
export const CHANGE_IS_SETUP_COMPLETED: ActionsType =
    new ActionsType('changeIsSetupCompleted', 'setup');

// Loading
export const START_LOADING_WEATHER_LOCATION: ActionsType =
    new ActionsType('startLoadingWeatherLocation', 'loading');

export const DONE_LOADING_WEATHER_LOCATION: ActionsType =
    new ActionsType('doneLoadingWeatherLocation', 'loading');

export const START_LOADING_WEATHER_FORECAST: ActionsType =
    new ActionsType('startLoadingWeatherForecast', 'loading');

export const DONE_LOADING_WEATHER_FORECAST: ActionsType =
    new ActionsType('doneLoadingWeatherForecast', 'loading');

export const START_LOADING_HOMEY: ActionsType =
    new ActionsType('startLoadingHomey', 'loading');

export const DONE_LOADING_HOMEY: ActionsType =
    new ActionsType('doneLoadingHomey', 'loading');

export const START_LOADING_USER_AUTHENTICATION: ActionsType =
    new ActionsType('startLoadingUserAuthentication', 'loading');

export const DONE_LOADING_USER_AUTHENTICATION: ActionsType =
    new ActionsType('doneLoadingUserAuthentication', 'loading');

export const START_LOADING_USER: ActionsType =
    new ActionsType('startLoadingUser', 'loading');

export const DONE_LOADING_USER: ActionsType =
    new ActionsType('doneLoadingUser', 'loading');

export const START_LOADING_NOTIFICATIONS: ActionsType =
    new ActionsType('startLoadingNotifications', 'loading');

export const DONE_LOADING_NOTIFICATIONS: ActionsType =
    new ActionsType('doneLoadingNotifications', 'loading');

// Notification
export const FETCH_NOTIFICATIONS: ActionsType =
    new ActionsType('fetchNotifications', 'notification');
