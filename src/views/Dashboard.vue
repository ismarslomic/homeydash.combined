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
                    <v-card color="red" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex>
                                <v-card-title>Weather</v-card-title>
                            </v-flex>
                            <v-flex>
                                <v-card-text>
                                    <h2>Oslo</h2>
                                    <h4>Sat 10:00, Sunny</h4>
                                    <v-layout row>
                                        <v-flex class="display-3">23&#8451;</v-flex>
                                        <v-flex>
                                            <v-icon x-large>mdi-weather-sunny</v-icon>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex >
                                            <v-flex d-inline-flex align-center>
                                                <v-icon class="mr-2">mdi-weather-pouring</v-icon>
                                                <span>2% Precipation</span>
                                            </v-flex>
                                        </v-flex>
                                        <v-flex>
                                            <v-flex d-inline-flex align-center>
                                                <v-icon class="mr-2">mdi-weather-windy</v-icon>
                                                <span>5 km/h Winds</span>
                                            </v-flex>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-flex>
                            <v-flex>
                                <v-card-actions class="pa-3">
                                    <v-container text-xs-center pa-0>
                                        <v-layout row>
                                            <v-flex class="caption" py-0>
                                                10:00
                                            </v-flex>
                                            <v-flex class="caption" py-0>
                                                11:00
                                            </v-flex>
                                            <v-flex class="caption" py-0>
                                                12:00
                                            </v-flex>
                                            <v-flex class="caption" py-0>
                                                13:00
                                            </v-flex>
                                            <v-flex class="caption" py-0>
                                                14:00
                                            </v-flex>
                                            <v-flex class="caption" py-0>
                                                15:00
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row>
                                            <v-flex py-0>
                                                <v-icon x-small>mdi-weather-sunny</v-icon>
                                            </v-flex>
                                            <v-flex py-0>
                                                <v-icon x-small>mdi-weather-rainy</v-icon>
                                            </v-flex>
                                            <v-flex py-0>
                                                <v-icon x-small>mdi-weather-cloudy</v-icon>
                                            </v-flex>
                                            <v-flex py-0>
                                                <v-icon x-small>mdi-weather-snowy-rainy</v-icon>
                                            </v-flex>
                                            <v-flex py-0>
                                                <v-icon x-small>mdi-weather-pouring</v-icon>
                                            </v-flex>
                                            <v-flex py-0>
                                                <v-icon x-small>mdi-weather-sunny</v-icon>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex class="caption" py-0>
                                                25
                                            </v-flex>
                                            <v-flex class="caption" py-0>
                                                25
                                            </v-flex>
                                            <v-flex class="caption" py-0>
                                                26
                                            </v-flex>
                                            <v-flex class="caption" py-0>
                                                27
                                            </v-flex>
                                            <v-flex class="caption" py-0>
                                                28
                                            </v-flex>
                                            <v-flex class="caption" py-0>
                                                25
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md4 order-xs2>
                    <v-card color="pink" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex shrink>
                                <v-card-title>Lightning</v-card-title>
                            </v-flex>
                            <v-flex grow>
                                <v-card-text>Content<br/><br/><br/></v-card-text>
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
                                <v-card-title>Climate</v-card-title>
                            </v-flex>
                            <v-flex>
                                <v-card-text>Content<br/><br/><br/><br/><br/></v-card-text>
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
                                <v-card-title>Security</v-card-title>
                            </v-flex>
                            <v-flex>
                                <v-card-text>Content<br/><br/><br/><br/><br/></v-card-text>
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
                                <v-card-title>Energy Monitor</v-card-title>
                            </v-flex>
                            <v-flex>
                                <v-card-text>Content<br/><br/><br/><br/><br/></v-card-text>
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
                                <v-card-title>Recent Activity</v-card-title>
                            </v-flex>
                            <v-flex>
                                <v-card-text>Content<br/><br/><br/><br/><br/></v-card-text>
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
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Dashboard extends Vue {

}
</script>
