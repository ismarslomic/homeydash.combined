# Development principles

## Views and Components
1. `Views` are composition of multiple `Components` and typically represents an `Page` or `Dialog` in the application
2. `Components` are either one single UI component or composition of multiple small `Components` representing one unit

## State / data propagation
1. `Components` shall retrieve all data it needs through props
2. `Views` shall retrieve states through use of `getters` only

## API calls
1. API calls shall be done from the `Actions` only, flow will be as following: 
    - `View` -> `Store Action` -> `Service` -> `Axios call` -> Response stored in the `Store` (and `local storage` if needed)
2. Every API call shall update the `loading state` by using Axios interceptor, see `Services` in `service` folder

## State dependencies
1. In case where states has dependencies to each other, for instance changing `locale` state impacts `geolocation details` state, 
state `watch` shall be used and should be registered in the `store.ts`

## Initiating state on refresh
1. States that must be initiated when application is refresh/accessing for the first time shall be done from `store.ts`
    
## i18n
1. Static text that needs to be translated shall be stored in `locales` folder
2. Translations using `vue-i18n` can be done from `Views` and `Components`

## Local storage
1. `States` and `data` that does not update frequently (such as Homey geolocation coordinates or weather location details that needs to be 
persistent for longer period shall be stored in the `local storage`, in addition to the `Store`. 
2. Use the `vuex-persist` library to avoid unecessary boilerplate code and do the configuration in `store.ts`

## Vuex actions, mutations and getters
1. Define and use `constants` when referring to Vuex Action, Mutation and Getter, these shall be stored in the `store` folder
2. Always return Promise in `Actions` so the caller know when the action is completed. Return value of Promise shall be empty if you are using getters to retrieve updated state
3. `Actions` shall use `getters` (or `rootGetters`) to retrieve state
4. `Mutations` and `Getters` shall only mutate and return `Store data`. If you for instance need to access or mutate data in local storage, do this in Actions
