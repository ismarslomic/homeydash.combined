<template>
    <v-bottom-nav fixed :value="true" flat app dark>
        <v-layout row justify-space-between>
            <template v-for="(item) in navItems">
                <v-flex :class="item.visibilityClassNav">
                    <v-btn :to="item.route">
                        <span>{{$t(item.title)}}</span>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-btn>
                </v-flex>
            </template>
            <v-flex class="hidden-lg-and-up">
                <v-bottom-sheet v-model="sheet">
                    <v-btn slot="activator">
                        <span>{{$t('views.more')}}</span>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>

                    <v-list>
                        <v-list-tile v-for="(item) in filterItems "
                            :key="item.title"
                            @click="sheet = false"
                            :class="item.visibilityClassOverflow"
                            :to="item.route">
                            <v-list-tile-action>
                                <v-icon>{{ item.icon}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-bottom-sheet>
            </v-flex>
        </v-layout>
    </v-bottom-nav>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class BottomNav extends Vue {
        sheet: boolean = false;
        navItems = [
            {
                title: 'views.dashboard',
                route: {path: '/'},
                icon: 'mdi-view-dashboard-outline',
                visibilityClassNav: '',
                visibilityClassOverflow: ''
            },
            {
                title: 'views.weather',
                route: {name: 'weather'},
                icon: 'mdi-weather-partly-cloudy',
                visibilityClassNav: '',
                visibilityClassOverflow: ''
            },
            {
                title: 'views.climate',
                route: {name: 'climate'},
                icon: 'mdi-thermometer',
                visibilityClassNav: '',
                visibilityClassOverflow: ''
            },
            {
                title: 'views.security',
                route: {name: 'security'},
                icon: 'mdi-lock-open-outline',
                visibilityClassNav: 'hidden-sm-and-down',
                visibilityClassOverflow: 'hidden-md-and-up'
            },
            {
                title: 'views.lightning',
                route: {name: 'lightning'},
                icon: 'mdi-lightbulb-outline',
                visibilityClassNav: 'hidden-sm-and-down',
                visibilityClassOverflow: 'hidden-md-and-up'
            },
            {
                title: 'views.devices',
                route: {name: 'devices'},
                icon: 'mdi-access-point-network',
                visibilityClassNav: 'hidden-md-and-down',
                visibilityClassOverflow: 'hidden-lg-and-up'
            },
            {
                title: 'views.flows',
                route: {name: 'flows'},
                icon: 'mdi-arrow-decision-auto',
                visibilityClassNav: 'hidden-md-and-down',
                visibilityClassOverflow: 'hidden-lg-and-up'
            },
            {
                title: 'views.energy',
                route: {name: 'energy'},
                icon: 'mdi-power-plug',
                visibilityClassNav: 'hidden-md-and-down',
                visibilityClassOverflow: 'hidden-lg-and-up'
            }
        ];

        get filterItems() {
            return this.navItems.filter((item) => {
                return item.visibilityClassNav;
            });
        }
    }
</script>
