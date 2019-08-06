class MutationsType {
    mutationName = '';

    constructor(mutationName: string) {
        this.mutationName = mutationName;
    }
}

// Homey
export const SET_HOMEY: MutationsType =
    new MutationsType('setHomey');

// Weather
export const SET_WEATHER_FORECAST: MutationsType =
    new MutationsType('setWeatherForecast');

export const SET_WEATHER_LOCATION: MutationsType =
    new MutationsType('setWeatherLocation');

export const SET_AVAILABLE_WEATHER_LOCATIONS: MutationsType =
    new MutationsType('setAvailableWeatherLocations');

// Loading
export const INCREASE_WEATHER_LOCATION_WAITING_COUNT: MutationsType =
    new MutationsType('increaseWeatherLocationWaitingCount');

export const DECREASE_WEATHER_LOCATION_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseWeatherLocationWaitingCount');

export const INCREASE_WEATHER_FORECAST_WAITING_COUNT: MutationsType =
    new MutationsType('increaseWeatherForecastWaitingCount');

export const DECREASE_WEATHER_FORECAST_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseWeatherForecastWaitingCount');

export const INCREASE_HOMEY_WAITING_COUNT: MutationsType =
    new MutationsType('increaseHomeyWaitingCount');

export const DECREASE_HOMEY_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseHomeyWaitingCount');

export const INCREASE_USER_AUTHENTICATION_WAITING_COUNT: MutationsType =
    new MutationsType('increaseUserAuthenticationWaitingCount');

export const DECREASE_USER_AUTHENTICATION_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseUserAuthenticationWaitingCount');

export const INCREASE_USER_WAITING_COUNT: MutationsType =
    new MutationsType('increaseUserWaitingCount');

export const DEACREASE_USER_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseUserWaitingCount');

export const INCREASE_NOTIFICATIONS_WAITING_COUNT: MutationsType =
    new MutationsType('increaseNotificationsWaitingCount');

export const DEACREASE_NOTIFICATIONS_WAITING_COUNT: MutationsType =
    new MutationsType('decreaseNotificationsWaitingCount');

// Locale
export const SET_LOCALE: MutationsType =
    new MutationsType('setLocale');

// Auth
export const SET_AUTH_USER: MutationsType =
    new MutationsType('setAuthUser');

export const SET_ATHOM_API_TOKEN: MutationsType =
    new MutationsType('setAthomApiToken');

// Setup
export const SET_IS_SETUP_COMPLETED: MutationsType =
    new MutationsType('setIsSetupCompleted');

// Notification
export const SET_NOTIFICATIONS: MutationsType =
    new MutationsType('setNotifications');

