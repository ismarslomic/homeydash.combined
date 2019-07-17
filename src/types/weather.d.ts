export interface Weatherdata {
    /** Date and time when the weather forecast were created (at service provider)
     * example: 2019-07-17T04:31:05+02:00
     */
    created: Date;

    /** Date and time when the weather forecast were created (at service provider)
     * example: 2019-07-17T12:00:00+02:00
     */
    update: Date;

    /** Intervals for short term forecasting, showing 1 hour intervals */
    shortIntervals: WeatherInterval[];
}

export interface WeatherInterval {
    symbol?: WeatherSymbol;
    precipitation?: PrecipitationData;
    temperature: TemperatureData;
    wind?: WindData;
    feelsLike: FeelsLike;
    pressure?: PressureData;
    cloudCover?: CloudCover;
    humidity: HumidityData;
    dewPoint: DewPointData;
    start: Date;
    end: Date;
}

/** See https://github.com/YR/weather-symbols */
export interface WeatherSymbol {
    n?: number;
    clouds?: number;
    thunder?: boolean;
    precipPhase?: PrecipPhaseEnum;
    precip?: number;
    _var?: VarEnum;
    sunup?: boolean;
    iconFileName?: string;
}

export enum PrecipPhaseEnum {
    None = 'None',
    Rain = 'Rain',
    Sleet = 'Sleet',
    Snow = 'Snow'
}

export enum VarEnum {
    None = 'None',
    Sun = 'Sun',
    Moon = 'Moon',
    PolarNight = 'PolarNight'
}

export interface PrecipitationData {
    min?: number;
    max?: number;
    value?: number;
    pop?: number;
}

export interface TemperatureData {
    value: number;
    min?: number;
    max?: number;
}

export interface WindData {
    direction: number;
    gust?: number;
    speed: number;
    areaMaxSpeed?: number;
}

export interface FeelsLike {
    value?: number;
}

export interface PressureData {
    value: number;
}

export interface CloudCover {
    value: number;
    high: number;
    middle: number;
    low: number;
    fog: number;
}

export interface HumidityData {
    value?: number;
}

export interface DewPointData {
    value?: number;
}
