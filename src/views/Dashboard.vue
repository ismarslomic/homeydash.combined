<template>
    <v-container fluid id="view-container" pa-0>
        <v-toolbar fixed app flat color="#303030">
            <v-toolbar-title class="display-2 text-uppercase">Dashboard</v-toolbar-title>
            <v-spacer></v-spacer>
            Wednesday, February 10
        </v-toolbar>
        <v-container grid-list-md fluid id="view-content-container">
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md4 shrink order-xs1>
                    <weather-short :weather="weatherState.weather" :geolocation="geolocationState.location"></weather-short>
                </v-flex>
                <v-flex d-flex xs12 sm6 md4 order-xs2>
                    <v-card color="pink" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex shrink>
                                <v-card-title>
                                    <v-icon class="mr-2">mdi-lightbulb-outline</v-icon>
                                    Lightning
                                </v-card-title>
                            </v-flex>
                            <v-flex grow>
                                <v-card-text>Content<br /><br /><br /><br /><br /><br /></v-card-text>
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
                                    Climate
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
                                    Security
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
                                    Energy Monitor
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
                                    Recent Activity
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
    import store from '@/store/store';
    import { GeolocationState, WeatherState } from '@/types/types';
    import { Component, Vue } from 'vue-property-decorator';
    import { State } from 'vuex-class';

    @Component({
        components: {
            WeatherShort
        }
    })
    export default class Dashboard extends Vue {
        @State('weather') weatherState?: WeatherState;
        @State('geolocation') geolocationState?: GeolocationState;

        private created() {
            store.dispatch('weather/fetchWeather');
            store.dispatch('geolocation/fetchGeolocationDetails');
        }
    }
</script>

<style>
</style>
