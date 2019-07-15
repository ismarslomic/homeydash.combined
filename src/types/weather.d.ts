/**
 * Schema to be used for presenting weather parameters for specific locations.
 */
export interface Weatherdata {
    meta?: Meta;
    product?: Product;
    created?: Date;
}

export interface Meta {
    model: Model[];
}

/**
 * Element for naming the forecast models used, and the respective time intervals for each of them.
 */
export interface Model {
    to: Date;
    nextrun: Date;
    from: Date;
    name: string;
    runended: Date;
    termin: Date;
}

/**
 * Element describing a weatherproduct by time-elements, location-elements and a set of weather-elements.
 */
export interface Product {
    time: Time[];
    class: string;
}

/**
 * Element containing forecasts for the specified time and duration.
 */
export interface Time {
    from: Date;
    datatype: string;
    to: Date;
    location: WeatherLocation;
}

export interface WeatherLocation {
    temperature: Temperature;
    cloudiness: Cloudiness;
    windSpeed: WindSpeed;
    humidity: Humidity;
    windGust: WindGust;
    altitude: string;
    pressure: Pressure;
    mediumClouds: MediumClouds;
    latitude: string;
    fog: Fog;
    dewpointTemperature: DewpointTemperature;
    lowClouds: LowClouds;
    windDirection: WindDirection;
    areaMaxWindSpeed: AreaMaxWindSpeed;
    highClouds: HighClouds;
    longitude: string;
    precipitation: Precipitation;
    symbol: WeatherSymbol;
    maxTemperature: MaxTemperature;
    minTemperature: MinTemperature;
    windProbability: WindProbability;
    temperatureProbability: TemperatureProbability;
    symbolProbability: SymbolProbability;
}

export interface Temperature {
    unit: string;
    value: string;
    id: string;
}

export interface Cloudiness {
    percent: string;
    id: string;
}

/**
 * Element denoting the wind speed by name, at 10 m above ground, in meters per second or the Beaufort scale.
 */
export interface WindSpeed {
    id: string;
    beaufort: string;
    name: string;
    mps: string;
}

export interface Humidity {
    value: string;
    unit: string;
}

export interface WindGust {
    id: string;
    mps: string;
}

export interface Pressure {
    id: string;
    value: string;
    unit: string;
}

export interface MediumClouds {
    id: string;
    percent: string;
}

export interface Fog {
    id: string;
    percent: string;
}

export interface DewpointTemperature {
    unit: string;
    value: string;
    id: string;
}

export interface LowClouds {
    percent: string;
    id: string;
}

export interface WindDirection {
    id: string;
    name: string;
    deg: string;
}

export interface AreaMaxWindSpeed {
    mps: string;
}

export interface HighClouds {
    id: string;
    percent: string;
}

/**
 * Element denoting the precipitation in mm.
 */
export interface Precipitation {
    maxvalue: string;
    unit: string;
    value: string;
    minvalue: string;
}

export interface WeatherSymbol {
    id: string;
    number: string;
}

export interface MaxTemperature {
    value: string;
    id: string;
    unit: string;
}

export interface MinTemperature {
    value: string;
    id: string;
    unit: string;
}

export interface WindProbability {
    unit: string;
    value: string;
}

export interface TemperatureProbability {
    value: string;
    unit: string;
}

export interface SymbolProbability {
    unit: string;
    value: string;
}
