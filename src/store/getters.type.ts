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

// Geolocation
export const IS_COORDINATE_DATA_LOADED: GettersType =
    new GettersType('isCoordinateDataLoaded', 'geolocation');

export const IS_DETAILS_DATA_LOADED: GettersType =
    new GettersType('isDetailsDataLoaded', 'geolocation');

export const GET_CURRENT_COORDINATES: GettersType =
    new GettersType('currentCoordinates', 'geolocation');

export const GET_AVAILABLE_LOCATIONS: GettersType =
    new GettersType('availableLocations', 'geolocation');

export const GET_CURRENT_LOCATION: GettersType =
    new GettersType('currentLocation', 'geolocation');

// Locale
export const GET_CURRENT_LOCALE: GettersType =
    new GettersType('currentLocale', 'locale');

// Loading
export const IS_LOADING_GEOLOCATION: GettersType =
    new GettersType('isLoadingGeolocation', 'loading');

export const IS_LOADING_COORDINATES: GettersType =
    new GettersType('isLoadingCoordinates', 'loading');

export const IS_LOADING_USER: GettersType =
    new GettersType('isLoadingUser', 'loading');

export const IS_LOADING_AUTHENTICATION: GettersType =
    new GettersType('isLoadingAuthentication', 'loading');

export const IS_LOADING_WEATHER: GettersType =
    new GettersType('isLoadingWeather', 'loading');

// Weather
export const IS_WEATHER_DATA_LOADED: GettersType =
    new GettersType('isWeatherDataLoaded', 'weather');

export const GET_WEATHER: GettersType =
    new GettersType('weather', 'weather');

// User
export const GET_USER: GettersType =
    new GettersType('user', 'user');

export const IS_USER_AUTHENTICATED: GettersType =
    new GettersType('isUserAuthenticated', 'user');

// Setup
export const IS_SETUP_COMPLETED: GettersType =
    new GettersType('isSetupCompleted', 'setup');
