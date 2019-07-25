# Development principles

## Views and Components
1. `Views` are composition of multiple `Components` and typically represents an `Page` or `Dialog` in the application
2. `Components` are either one single UI component or composition of multiple small `Components` representing one unit

## State / data propagation
1. `Components` shall retrieve all data it needs through props
2. `Views` shall retrieve states through use of `getters` only

## API calls
1. API calls shall be done from the `store` only, flow will be as following: 
    - `View` -> `Store action` -> `Service` -> `Axios call` -> Response stored in the `Store` (and `local storage` if needed)
2. Every API call shall update the `loading state` by using Axios interceptor, see `Services` in service folder
    
## i18n
1. Static text that needs to be translated shall be stored in `locales` folder
2. Translations using `vue-i18n` can be done from `Views` and `Components`

## Local storage
1. `States` and `data` that does not update frequently (such as Homey geo coordinates or weather location details or that needs to be 
persistent for longer periode shall be stored in the `local storage`, in addition to the `Store`