<template>
    <v-container fluid id="view-container" pa-0>
        <v-toolbar fixed app flat color="#303030">
            <v-toolbar-title class="display-2 text-uppercase">{{$t('views.dashboard')}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <settings-dialog></settings-dialog>
            {{$d(now, 'shortDateTime')}}
        </v-toolbar>
        <v-container grid-list-md fluid id="view-content-container">
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md4 shrink order-xs1>
                    <weather-short
                        :weather="weather"
                        :selectedLoaction="currentLocation"
                        :isRefreshingData="isRefreshingWeather"
                        :isDataLoaded="isWeatherLoaded">
                    </weather-short>
                </v-flex>
                <v-flex d-flex xs12 sm6 md4 order-xs2>
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
                <v-flex d-flex xs12 sm6 md4 order-xs3>
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
                <v-flex d-flex xs12 sm6 md4 shrink order-xs4>
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
                <v-flex d-flex xs12 sm6 md4 order-xs5>
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
                <v-flex d-flex xs12 sm6 md4 order-xs6>
                    <v-card color="light-blue" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex>
                                <v-card-title>
                                    <v-icon class="mr-2">sms</v-icon>
                                    {{$t('components.activity.title')}}
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
            </v-layout>
        </v-container>

    </v-container>
</template>

<script lang="ts">
import WeatherShort from '@/components/WeatherShort.vue';
import { GeolocationDetails } from '@/types/geolocation';
import { Weatherdata } from '@/types/weather';
import SettingsDialog from '@/views/SettingsDialog.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import {
    GET_WEATHER_LOCATION, GET_WEATHER_FORECAST,
    IS_HOMEY_GEO_COORDINATES_LOADED,
    IS_WEATHER_LOCATION_LOADED,
    IS_LOADING_WEATHER_LOCATION,
    IS_LOADING_WEATHER_FORECAST, IS_WEATHER_FORECAST_LOADED
} from '@/store/getters.type';

@Component({
    components: {
        WeatherShort,
        SettingsDialog
    }
})
export default class Dashboard extends Vue {
    @Getter(GET_WEATHER_LOCATION.getterName,
        {namespace: GET_WEATHER_LOCATION.namespace}) currentLocation?: GeolocationDetails;
    @Getter(IS_LOADING_WEATHER_LOCATION.getterName,
        {namespace: IS_LOADING_WEATHER_LOCATION.namespace}) isLoadingGeolocation!: boolean;
    @Getter(IS_LOADING_WEATHER_FORECAST.getterName,
        {namespace: IS_LOADING_WEATHER_FORECAST.namespace}) isLoadingWeather!: boolean;
    @Getter(IS_WEATHER_FORECAST_LOADED.getterName,
        {namespace: IS_WEATHER_FORECAST_LOADED.namespace}) isWeatherDataLoaded!: boolean;
    @Getter(GET_WEATHER_FORECAST.getterName,
        {namespace: GET_WEATHER_FORECAST.namespace}) weather?: Weatherdata;
    @Getter(IS_HOMEY_GEO_COORDINATES_LOADED.getterName,
        {namespace: IS_HOMEY_GEO_COORDINATES_LOADED.namespace}) isCoordinateDataLoaded!: boolean;
    @Getter(IS_WEATHER_LOCATION_LOADED.getterName,
        {namespace: IS_WEATHER_LOCATION_LOADED.namespace}) isDetailsDataLoaded!: boolean;

    now: Date = new Date();

    private timerID = setInterval(this.updateNow, 1000); // 1000 ms = 1 sec

    get isRefreshingWeather(): boolean {
        return this.isLoadingGeolocation || this.isLoadingWeather;
    }

    get isWeatherLoaded(): boolean {
        return this.isWeatherDataLoaded && this.isCoordinateDataLoaded && this.isDetailsDataLoaded;
    }

    private updateNow(): void {
        this.now = new Date();
    }
}
</script>

<style>
</style>
