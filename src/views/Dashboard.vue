<template>
    <v-container fluid id="view-container" pa-0>
        <v-app-bar app fixed flat color="#303030">
            <v-toolbar-title class="display-2 text-uppercase">{{$t('views.dashboard')}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <settings-dialog></settings-dialog>
            {{$d(now, 'shortDateTime')}}
        </v-app-bar>
        <v-container grid-list-md fluid id="view-content-container" pa-1>
            <v-layout row wrap>
                <v-flex d-flex child-flex xs12 sm6 md4 shrink order-xs1>
                    <weather-forecast-summary
                        :weatherForecast="weatherForecast"
                        :weatherLocation="weatherLocation"
                        :isRefreshingData="isRefreshingWeather"
                        :isDataLoaded="isWeatherLoaded">
                    </weather-forecast-summary>
                </v-flex>
                <v-flex d-flex child-flex xs12 sm6 md4 order-xs2>
                    <v-card color="pink" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex shrink>
                                <v-card-title>
                                    <v-icon class="mr-2">mdi-lightbulb-outline</v-icon>
                                    {{$t('components.lightning.title')}}
                                </v-card-title>
                            </v-flex>
                            <v-flex grow>
                                <v-card-text>Content<br /><br /><br /><br /><br /></v-card-text>
                            </v-flex>
                            <v-flex shrink>
                                <v-card-actions class="pa-3">Actions</v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex d-flex child-flex xs12 sm6 md4 order-xs3>
                    <v-card color="purple darken-2" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex>
                                <v-card-title>
                                    <v-icon class="mr-2">mdi-thermometer</v-icon>
                                    {{$t('components.climate.title')}}
                                </v-card-title>
                            </v-flex>
                            <v-flex>
                                <v-card-text>Content<br /><br /><br /><br /><br /></v-card-text>
                            </v-flex>
                            <v-flex>
                                <v-card-actions class="pa-3">Actions</v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex d-flex child-flex xs12 sm6 md4 shrink order-xs4>
                    <v-card color="cyan" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex>
                                <v-card-title>
                                    <v-icon class="mr-2">mdi-lock-open-outline</v-icon>
                                    {{$t('components.security.title')}}
                                </v-card-title>
                            </v-flex>
                            <v-flex>
                                <v-card-text>Content<br /><br /><br /><br /><br /></v-card-text>
                            </v-flex>
                            <v-flex>
                                <v-card-actions class="pa-3">Actions</v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex d-flex child-flex xs12 sm6 md4 order-xs5>
                    <v-card color="teal" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex>
                                <v-card-title>
                                    <v-icon class="mr-2">mdi-power-plug</v-icon>
                                    {{$t('components.energy.title')}}
                                </v-card-title>
                            </v-flex>
                            <v-flex>
                                <v-card-text>Content<br /><br /><br /><br /><br /></v-card-text>
                            </v-flex>
                            <v-flex>
                                <v-card-actions class="pa-3">Actions</v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex d-flex child-flex xs12 sm6 md4 order-xs6>
                    <activity-timeline
                        :activities="activities"
                        :isRefreshingData="isLoadingActivities"
                        isDataLoaded="isActivitiesLoaded">
                    </activity-timeline>
                </v-flex>
            </v-layout>
        </v-container>

    </v-container>
</template>

<script lang="ts">
    import ActivityTimeline from '@/components/ActivityTimeline.vue';
    import WeatherForecastSummary from '@/components/WeatherForecastSummary.vue';
    import {
        GET_ACTIVITIES,
        GET_WEATHER_FORECAST,
        GET_WEATHER_LOCATION,
        IS_ACTIVITIES_LOADED,
        IS_HOMEY_GEO_COORDINATES_LOADED,
        IS_LOADING_ACTIVITIES,
        IS_LOADING_WEATHER_FORECAST,
        IS_LOADING_WEATHER_LOCATION,
        IS_WEATHER_FORECAST_LOADED,
        IS_WEATHER_LOCATION_LOADED
    } from '@/store/getters.type';
    import { Activity } from '@/types/activity';
    import { GeolocationDetails } from '@/types/geolocation';
    import { Weatherdata } from '@/types/weather';
    import SettingsDialog from '@/views/SettingsDialog.vue';
    import { Component, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';

    @Component({
        components: {
            WeatherForecastSummary,
            SettingsDialog,
            ActivityTimeline
        }
    })
    export default class Dashboard extends Vue {
        @Getter(GET_WEATHER_LOCATION.getterName,
            {namespace: GET_WEATHER_LOCATION.namespace}) weatherLocation?: GeolocationDetails;
        @Getter(IS_LOADING_WEATHER_LOCATION.getterName,
            {namespace: IS_LOADING_WEATHER_LOCATION.namespace}) isLoadingWeatherLocation!: boolean;
        @Getter(IS_LOADING_WEATHER_FORECAST.getterName,
            {namespace: IS_LOADING_WEATHER_FORECAST.namespace}) isLoadingWeatherForecast!: boolean;
        @Getter(IS_WEATHER_FORECAST_LOADED.getterName,
            {namespace: IS_WEATHER_FORECAST_LOADED.namespace}) isWeatherForecastLoaded!: boolean;
        @Getter(GET_WEATHER_FORECAST.getterName,
            {namespace: GET_WEATHER_FORECAST.namespace}) weatherForecast?: Weatherdata;
        @Getter(IS_HOMEY_GEO_COORDINATES_LOADED.getterName,
            {namespace: IS_HOMEY_GEO_COORDINATES_LOADED.namespace}) isHomeyGeoCoordinatesLoaded!: boolean;
        @Getter(IS_WEATHER_LOCATION_LOADED.getterName,
            {namespace: IS_WEATHER_LOCATION_LOADED.namespace}) isWeatherLocationLoaded!: boolean;
        @Getter(GET_ACTIVITIES.getterName,
            {namespace: GET_ACTIVITIES.namespace}) activities!: Activity[];
        @Getter(IS_LOADING_ACTIVITIES.getterName,
            {namespace: IS_LOADING_ACTIVITIES.namespace}) isLoadingActivities!: boolean;
        @Getter(IS_ACTIVITIES_LOADED.getterName,
            {namespace: IS_ACTIVITIES_LOADED.namespace}) isActivitiesLoaded!: boolean;

        now: Date = new Date();

        private timerID = setInterval(this.updateNow, 1000); // 1000 ms = 1 sec

        get isRefreshingWeather(): boolean {
            return this.isLoadingWeatherLocation || this.isLoadingWeatherForecast;
        }

        get isWeatherLoaded(): boolean {
            return this.isWeatherForecastLoaded && this.isHomeyGeoCoordinatesLoaded && this.isWeatherLocationLoaded;
        }

        private updateNow(): void {
            this.now = new Date();
        }
    }
</script>

<style scoped>
</style>
