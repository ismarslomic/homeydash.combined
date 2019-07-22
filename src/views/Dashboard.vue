<template>
    <v-container fluid id="view-container" pa-0>
        <v-toolbar fixed app flat color="#303030">
            <v-toolbar-title class="display-2 text-uppercase">{{$t('views.dashboard')}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <locale-picker></locale-picker>
            {{$d(now, 'shortDateTime')}}
        </v-toolbar>
        <v-container grid-list-md fluid id="view-content-container">
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md4 shrink order-xs1>
                    <weather-short
                        :weather="weatherState.weather"
                        :geolocation="geolocationState.location"
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
    import LocalePicker from '@/components/LocalePicker.vue';
    import WeatherShort from '@/components/WeatherShort.vue';
    import { GeolocationState, LoadingState, WeatherState } from '@/types/types';
    import { Component, Vue } from 'vue-property-decorator';
    import { Getter, State } from 'vuex-class';

    @Component({
        components: {
            WeatherShort,
            LocalePicker
        }
    })
    export default class Dashboard extends Vue {
        @State('weather') weatherState?: WeatherState;
        @State('geolocation') geolocationState?: GeolocationState;
        @State('loading') loadingState?: LoadingState;
        @Getter('isLoadingGeolocation', {namespace: 'loading'}) isLoadingGeolocation!: boolean;
        @Getter('isLoadingWeather', {namespace: 'loading'}) isLoadingWeather!: boolean;
        @Getter('isWeatherDataLoaded', {namespace: 'weather'}) isWeatherDataLoaded!: boolean;
        @Getter('isCoordinateDataLoaded', {namespace: 'geolocation'}) isCoordinateDataLoaded!: boolean;
        @Getter('isDetailsDataLoaded', {namespace: 'geolocation'}) isDetailsDataLoaded!: boolean;

        now: Date = new Date();

        private timerID = setInterval(this.updateNow, 1000); // 1000 ms = 1 sec

        private created() {
            this.$store.dispatch('weather/fetchWeather');
            this.$store.dispatch('geolocation/fetchGeolocationDetails');
        }

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
