class GettersType {
    getterName = '';
    namespace = '';

    constructor(getterName: string, namespace: string) {
        this.getterName = getterName;
        this.namespace = namespace;
    }

    get namespacedName(): string {
        return this.namespace + '/' + this.getterName;
    }
}

// Homey
export const IS_HOMEY_GEO_COORDINATES_LOADED: GettersType =
    new GettersType('isHomeyGeoCoordinatesLoaded', 'homey');

export const GET_HOMEY_GEO_COORDINATES: GettersType =
    new GettersType('getHomeyGeoCoordinates', 'homey');

export const GET_HOMEY: GettersType =
    new GettersType('getHomey', 'homey');

// Weather
export const IS_WEATHER_FORECAST_LOADED: GettersType =
    new GettersType('isWeatherForecastLoaded', 'weather');

export const IS_WEATHER_LOCATION_LOADED: GettersType =
    new GettersType('isWeatherLocationLoaded', 'weather');

export const GET_WEATHER_FORECAST: GettersType =
    new GettersType('getWeatherForecast', 'weather');

export const GET_WEATHER_LOCATION: GettersType =
    new GettersType('getWeatherLocation', 'weather');

export const GET_AVAILABLE_WEATHER_LOCATIONS: GettersType =
    new GettersType('getAvailableWeatherLocations', 'weather');

// Locale
export const GET_LOCALE: GettersType =
    new GettersType('getLocale', 'locale');

// Loading
export const IS_LOADING_WEATHER_LOCATION: GettersType =
    new GettersType('isLoadingWeatherLocation', 'loading');

export const IS_LOADING_WEATHER_FORECAST: GettersType =
    new GettersType('isLoadingWeatherForecast', 'loading');

export const IS_LOADING_HOMEY_GEO_COORDINATES: GettersType =
    new GettersType('isLoadingHomeyGeoCoordinates', 'loading');

export const IS_LOADING_USER: GettersType =
    new GettersType('isLoadingUser', 'loading');

export const IS_LOADING_AUTHENTICATION: GettersType =
    new GettersType('isLoadingAuthentication', 'loading');

export const IS_LOADING_ACTIVITIES: GettersType =
    new GettersType('isLoadingActivities', 'loading');

// Auth
export const GET_AUTH_USER: GettersType =
    new GettersType('getAuthUser', 'auth');

export const GET_ATHOM_API_TOKEN: GettersType =
    new GettersType('getAthomApiToken', 'auth');

// Setup
export const IS_SETUP_COMPLETED: GettersType =
    new GettersType('isSetupCompleted', 'setup');

// Activities
export const GET_ACTIVITIES: GettersType =
    new GettersType('getActivities', 'activity');

