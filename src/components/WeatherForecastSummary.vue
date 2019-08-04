<template>
    <v-card tile>
        <v-layout column ma-0 fill-height>
            <v-flex pa-0 shrink>
                <v-card-title>
                    <v-icon class="mr-2">mdi-weather-partly-cloudy</v-icon>
                    {{$t('components.weather.title')}}
                </v-card-title>
            </v-flex>
            <progress-bar :show="isRefreshingData" title="Refreshing weather..."></progress-bar>
            <v-flex pa-0 v-if="isDataLoaded" grow>
                <v-card-text>
                    <h2>{{weatherLocation.name}}</h2>
                    <h4>{{$d(new Date(this.nowForecast.start), 'longTime')}} - {{$d(new Date(this.nowForecast.end), 'shortTime')}}, {{$t(`weather.${nowForecast.symbol.text}`)}}</h4>
                    <v-layout row ma-0 align-center justify-space-between fill-height>
                        <v-flex pa-0>
                            <div>
                                <div class="display-3" style="float:left; margin-top: -3px">{{nowForecast.temperature.value | temperature}}</div>
                                <div style="float:left; font-size: 16px; margin-top: 6px">&#8451;</div>
                            </div>
                        </v-flex>
                        <v-flex>
                            <svgicon :name="nowForecast.symbol.iconFileName" scale="6" :title="$t(`weather.${nowForecast.symbol.text}`)"></svgicon>
                        </v-flex>
                    </v-layout>
                    <v-layout row ma-0>
                        <v-flex pa-0>
                            <v-flex d-inline-flex align-center pa-0>
                                <v-icon class="mr-2">mdi-weather-pouring</v-icon>
                                <span>{{nowForecast.precipitation.min | precipation(nowForecast.precipitation.max)}}</span>
                            </v-flex>
                        </v-flex>
                        <v-flex pa-0>
                            <v-flex d-inline-flex align-center pa-0>
                                <v-icon class="mr-2">mdi-weather-windy</v-icon>
                                <span>{{nowForecast.wind.speed | windspeed}}</span>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-flex>
            <v-flex pa-0 v-if="isDataLoaded" shrink>
                <v-card-actions class="pa-3">
                    <v-container pa-0 text-xs-center>
                        <v-layout row ma-0>
                            <weather-forecast-hour
                                v-for="interval in sixHoursForecasts"
                                :key="interval.start.toString()"
                                :date="interval.start"
                                :iconFileName="interval.symbol.iconFileName"
                                :temperature="interval.temperature.value"
                                :symbolText="interval.symbol.text">
                            </weather-forecast-hour>
                        </v-layout>
                        <v-flex class="font-italic">
                            {{$t('components.weather.crediting')}}
                        </v-flex>
                    </v-container>
                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script lang="ts">
    import ProgressBar from '@/components/ProgressBar.vue';
    import WeatherForecastHour from '@/components/WeatherForecastHour.vue';
    import '@/icons/yws';
    import { Weatherdata, WeatherInterval } from '@/types/weather';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {
            WeatherForecastHour,
            ProgressBar
        }
    })
    export default class WeatherForecastSummary extends Vue {
        @Prop() private weatherForecast!: Weatherdata;
        @Prop() private weatherLocation!: Geolocation;
        @Prop() private isRefreshingData!: boolean;
        @Prop() private isDataLoaded!: boolean;

        /**
         * We jump over the first forecast interval, since that is now and we already show it
         */
        get sixHoursForecasts(): WeatherInterval[] {
            return this.weatherForecast.shortIntervals.slice(1, 7);
        }

        /**
         * We don´t need to check if weatherForecast and shortIntervals are set because this
         * computed method is called from v-if directive in template
         */
        get nowForecast(): WeatherInterval {
            return this.weatherForecast.shortIntervals[0];
        }
    }
</script>

<style scoped>
    .svg-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        color: inherit;
        vertical-align: middle;
        fill: none;
        stroke: currentColor;
    }

    .svg-fill {
        fill: currentColor;
        stroke: none;
    }

    .svg-up {
        /* default */
        transform: rotate(0deg);
    }

    .svg-right {
        transform: rotate(90deg);
    }

    .svg-down {
        transform: rotate(180deg);
    }

    .svg-left {
        transform: rotate(-90deg);
    }
</style>
