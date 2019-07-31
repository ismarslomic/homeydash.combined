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
export const INITIALIZE_GEOLOCATION_COORDINATES: ActionsType =
    new ActionsType('initialiseGeolocationCoordinates', 'geolocation');

export const INITIALIZE_GEOLOCATION_DETAILS: ActionsType =
    new ActionsType('initialiseGeolocationDetails', 'geolocation');

export const UPDATE_CURRENT_GEOLOCATION_DETAILS: ActionsType =
    new ActionsType('updateCurrentGeolocationDetails', 'geolocation');

// Locale
export const INITIALIZE_LOCALE: ActionsType =
    new ActionsType('initialiseLocale', 'locale');

export const SET_LOCALE: ActionsType =
    new ActionsType('setLocale', 'locale');

// User
export const FETCH_AUTHENTICATED_USER: ActionsType =
    new ActionsType('fetchAuthenticatedUser', 'user');

// Setup
export const FETCH_IS_SETUP_COMPLETED: ActionsType =
    new ActionsType('fetchIsSetupCompleted', 'setup');

export const SET_IS_SETUP_COMPLETED: ActionsType =
    new ActionsType('setIsSetupCompleted', 'setup');



