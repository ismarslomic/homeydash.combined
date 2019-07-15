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
                    <v-card tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex pa-0>
                                <v-card-title>Weather</v-card-title>
                            </v-flex>
                            <v-flex pa-0>
                                <v-card-text>
                                    <h2>Oslo</h2>
                                    <h4>Sat 10:00, Sunny</h4>
                                    <v-layout row ma-0 align-center justify-space-between fill-height>
                                        <v-flex pa-0>
                                            <div>
                                                <div class="display-3" style="float:left; margin-top: -3px">23</div>
                                                <div style="float:left; font-size: 16px; margin-top: 6px">&#8451;</div>
                                            </div>
                                        </v-flex>
                                        <v-flex>
                                            <svgicon name="01d" scale="6"/>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row ma-0>
                                        <v-flex pa-0>
                                            <v-flex d-inline-flex align-center pa-0>
                                                <v-icon class="mr-2">mdi-weather-pouring</v-icon>
                                                <span>2% Precipation</span>
                                            </v-flex>
                                        </v-flex>
                                        <v-flex pa-0>
                                            <v-flex d-inline-flex align-center pa-0>
                                                <v-icon class="mr-2">mdi-weather-windy</v-icon>
                                                <span>5 km/h Winds</span>
                                            </v-flex>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-flex>
                            <v-flex pa-0>
                                <v-card-actions class="pa-3">
                                    <v-container pa-0 text-xs-center>
                                        <v-layout row ma-0  wrap>
                                            <v-flex xs2 class="caption" pa-0>
                                                10:00
                                            </v-flex>
                                            <v-flex xs2 class="caption" pa-0>
                                                11:00
                                            </v-flex>
                                            <v-flex xs2 class="caption" pa-0>
                                                12:00
                                            </v-flex>
                                            <v-flex xs2 class="caption" pa-0>
                                                13:00
                                            </v-flex>
                                            <v-flex xs2 class="caption" pa-0>
                                                14:00
                                            </v-flex>
                                            <v-flex xs2 class="caption" pa-0>
                                                15:00
                                            </v-flex>
                                            <v-flex xs2 pa-0>
                                                <svgicon name="01d" width="24" height="24"></svgicon>
                                            </v-flex>
                                            <v-flex xs2 pa-0>
                                                <svgicon name="02d" width="24" height="24"></svgicon>
                                            </v-flex>
                                            <v-flex xs2 pa-0>
                                                <svgicon name="03d" width="24" height="24"></svgicon>
                                            </v-flex>
                                            <v-flex xs2 pa-0>
                                                <svgicon name="04" width="24" height="24"></svgicon>
                                            </v-flex>
                                            <v-flex xs2 pa-0>
                                                <svgicon name="05d" width="24" height="24"></svgicon>
                                            </v-flex>
                                            <v-flex xs2 pa-0>
                                                <svgicon name="06d" width="24" height="24"></svgicon>
                                            </v-flex>
                                            <v-flex class="caption" pa-0>
                                                25&#176;
                                            </v-flex>
                                            <v-flex class="caption" pa-0>
                                                25&#176;
                                            </v-flex>
                                            <v-flex class="caption" pa-0>
                                                26&#176;
                                            </v-flex>
                                            <v-flex class="caption" pa-0>
                                                27&#176;
                                            </v-flex>
                                            <v-flex class="caption" pa-0>
                                                28&#176;
                                            </v-flex>
                                            <v-flex class="caption" pa-0>
                                                25&#176;
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
import '@/icons/yws/01d';
import '@/icons/yws/02d';
import '@/icons/yws/03d';
import '@/icons/yws/04';
import '@/icons/yws/05d';
import '@/icons/yws/06d';

@Component({})
export default class Dashboard extends Vue {
}
</script>

<style>
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
