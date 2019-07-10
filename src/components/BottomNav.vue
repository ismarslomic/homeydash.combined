<template>

    <v-bottom-navigation
            fixed
            :value="true"
            shift
            flat
            app
            grow>
        <template v-for="(item, index) in navItems">
            <v-btn :to="item.route">
                <span>{{item.title}}</span>
                <v-icon>{{item.icon}}</v-icon>
            </v-btn>
        </template>
    </v-bottom-navigation>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class BottomNav extends Vue {
    navItems = [
        {
            title: 'Dashboard',
            route: { path: '/'},
            icon: 'mdi-view-dashboard-outline'
        },
        {
            title: 'Weather',
            route: { name: 'weather'},
            icon: 'mdi-weather-partlycloudy'
        },
        {
            title: 'Climate',
            route: { name: 'climate'},
            icon: 'mdi-thermometer'
        },
        {
            title: 'Security',
            route: { name: 'security'},
            icon: 'mdi-lock-open-outline'
        },
        {
            title: 'Lightning',
            route: { name: 'lightning'},
            icon: 'mdi-lightbulb-outline'
        },
        {
            title: 'Devices',
            route: { name: 'devices'},
            icon: 'mdi-access-point-network'
        },
        {
            title: 'Flows',
            route: { name: 'flows'},
            icon: 'mdi-arrow-decision-auto'
        },
        {
            title: 'Energy',
            route: { name: 'energy'},
            icon: 'mdi-power-plug'
        },
        {
            title: 'More',
            icon: 'mdi-dots-vertical'
        },
    ];
}
</script>
