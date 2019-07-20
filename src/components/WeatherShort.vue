<template>
    <v-card tile>
        <v-layout column ma-0 fill-height>
            <v-flex pa-0 shrink>
                <v-card-title>
                    <v-icon class="mr-2">mdi-weather-partly-cloudy</v-icon>
                    Weather
                </v-card-title>
            </v-flex>
            <v-flex pa-0 v-if="loadingWeather" shrink>
                <v-card-text>
                    Loading weather...
                    <v-progress-linear :indeterminate="true"></v-progress-linear>
                </v-card-text>
            </v-flex>
            <v-flex pa-0 v-if="!loadingWeather" grow>
                <v-card-text>
                    <h2>{{geolocation.details.name}}</h2>
                    <h4>{{nowForecast.start | shortTimeIntervals(nowForecast.end)}}</h4>
                    <v-layout row ma-0 align-center justify-space-between fill-height>
                        <v-flex pa-0>
                            <div>
                                <div class="display-3" style="float:left; margin-top: -3px">{{nowForecast.temperature.value | temperature}}</div>
                                <div style="float:left; font-size: 16px; margin-top: 6px">&#8451;</div>
                            </div>
                        </v-flex>
                        <v-flex>
                            <svgicon :name="nowForecast.symbol.iconFileName" scale="6"></svgicon>
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
            <v-flex pa-0 v-if="!loadingWeather" shrink>
                <v-card-actions class="pa-3">
                    <v-container pa-0 text-xs-center>
                        <v-layout row ma-0 wrap>
                            <v-flex xs2 class="caption" pa-0 v-for="interval in sixHoursForecasts">
                                {{interval.start | shortTime}}
                            </v-flex>
                            <v-flex xs2 pa-0 v-for="interval in sixHoursForecasts">
                                <svgicon :name="interval.symbol.iconFileName" width="24" height="24"></svgicon>
                            </v-flex>
                            <v-flex xs2 class="caption" pa-0 v-for="interval in sixHoursForecasts">
                                {{interval.temperature.value | temperature}}&#8451;
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-actions>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script lang="ts">
    import '@/icons/yws';
    import { Weatherdata, WeatherInterval } from '@/types/weather';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class WeatherShort extends Vue {
        @Prop() private weather!: Weatherdata;
        @Prop() private geolocation!: Geolocation;
        private loadingWeather: boolean = true;

        private mounted() {
            setTimeout(() => {
                this.loadingWeather = false;
            }, 5000); // 2 sek
        }

        /**
         * We jump over the first forecast interval, since that is now and we already show it
         */
        get sixHoursForecasts(): WeatherInterval[] {
            return this.weather.shortIntervals.slice(1, 7);
        }

        /**
         * We don´t need to check if weather and shortIntervals are set because this
         * computed method is called from v-if directive in template
         */
        get nowForecast(): WeatherInterval {
            return this.weather.shortIntervals[0];
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