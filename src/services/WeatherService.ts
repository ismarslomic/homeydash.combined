import store from '@/store/store';
import { Weatherdata, WeatherInterval, WeatherSymbol } from '@/types/weather';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

class WeatherService {
    private readonly BASE_URL: string = 'https://cors-proxy-me.herokuapp.com/https://www.yr.no/api/v0';
    private readonly TIMEOUT_IN_MILLIS: number = 10000;
    private apiClient: AxiosInstance;

    constructor() {
        this.apiClient = axios.create({
            baseURL: this.BASE_URL,
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: this.TIMEOUT_IN_MILLIS
        });
        this.apiClient.interceptors.request.use((config: any) => {
            store.dispatch('loading/startLoadingWeather');
            return config;
        }, (error) => {
            store.dispatch('loading/doneLoadingWeather');
            return Promise.reject(error);
        });
        this.apiClient.interceptors.response.use((response: any) => {
            store.dispatch('loading/doneLoadingWeather');
            return response;
        }, (error) => {
            store.dispatch('loading/doneLoadingWeather');
            return Promise.reject(error);
        });
    }

    getWeatherForecast(locationId: string): Promise<any> {
        const apiPath = '/locations/' + locationId + '/forecast';
        return this.apiClient.get(apiPath)
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .then((weatherDataJson) => {
                return mapWeatherdata(weatherDataJson);
            })
            .catch((error: AxiosError) => {
                // tslint:disable-next-line:no-console
                console.error('Fetching weather forecast failed');
                // tslint:disable-next-line:no-console
                console.error(error.message);
            });
    }
}

function mapWeatherdata(weatherDataJson: any): Weatherdata {
    return {
        created: weatherDataJson.created,
        update: weatherDataJson.update,
        shortIntervals: weatherDataJson.shortIntervals.map(mapShortInterval)
    } as Weatherdata;
}

function mapShortInterval(interval: any): WeatherInterval {
    return {
        start: interval.start,
        end: interval.end,
        symbol: mapWeatherSymbol(interval.symbol),
        precipitation: interval.precipitation,
        temperature: interval.temperature,
        wind: interval.wind,
        feelsLike: interval.feelsLike,
        pressure: interval.pressure,
        cloudCover: interval.cloudCover,
        humidity: interval.humidity,
        dewPoint: interval.dewPoint
    } as WeatherInterval;
}

function mapWeatherSymbol(weatherSymbol: any): WeatherSymbol {
    return {
        n: weatherSymbol.n,
        clouds: weatherSymbol.clouds,
        thunder: weatherSymbol.thunder,
        precipPhase: weatherSymbol.precipPhase,
        precip: weatherSymbol.precip,
        _var: weatherSymbol.var,
        sunup: weatherSymbol.sunup,
        iconFileName: mapIconFileName(weatherSymbol.n, weatherSymbol.sunup),
        text: mapIconText(weatherSymbol.n)
    } as WeatherSymbol;
}

function mapIconFileName(n: number, sunup: boolean): string {
    const dayAndNightIcons = [4, 9, 10, 11, 12, 13, 14, 15, 22, 23, 30, 31, 32, 33, 34, 46, 47, 48, 49, 50];
    if (!n) {
        return '';
    } else {
        if (dayAndNightIcons.includes(n)) {
            return addLeadingZero(n);
        } else {
            return sunup ? addLeadingZero(n) + 'd' : addLeadingZero(n) + 'n';
        }
    }
}

function mapIconText(n: number): string {
    const iconText: {[s: number]: string; } = {
        1: 'ClearSky',
        2: 'Fair',
        3: 'PartlyCloudy',
        4: 'Cloudy',
        5: 'RainShowers',
        6: 'RainShowersAndThunder',
        7: 'SleetShowers',
        8: 'SnowShowers',
        9: 'Rain',
        10: 'HeavyRain',
        11: 'HeavyRainAndThunder',
        12: 'Sleet',
        13: 'Snow',
        14: 'SnowAndThunder',
        15: 'Fog',
        20: 'SleetShowersAndThunder',
        21: 'SnowShowersAndThunder',
        22: 'RainAndThunder',
        23: 'SleetAndThunder',
        24: 'LightRainShowersAndThunder',
        25: 'HeavyRainShowersAndThunder',
        26: 'LightsSleetShowersAndThunder',
        27: 'HeavySleetShowersAndThunder',
        28: 'LightsSnowShowersAndThunder',
        29: 'HeavySnowShowersAndThunder',
        30: 'LightRainAndThunder',
        31: 'LightSleetAndThunder',
        32: 'HeavySleetAndThunder',
        33: 'LightSnowAndThunder',
        34: 'HeavySnowAndThunder',
        40: 'LightRainShowers',
        41: 'HeavyRainShowers',
        42: 'LightSleetShowers',
        43: 'HeavySleetShowers',
        44: 'LightSnowShowers',
        45: 'HeavySnowShowers',
        46: 'LightRain',
        47: 'LightSleet',
        48: 'HeavySleet',
        49: 'LightSnow',
        50: 'HeavySnow'
    };
    return iconText[n];
}

function addLeadingZero(n: number): string {
    return n < 10 ? '0' + n : '' + n;
}

export default new WeatherService();
