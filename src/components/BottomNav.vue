<template>

    <v-bottom-nav app fixed flat :value="true" dark shift>

        <v-btn flat dark :to="{ path: '/'}">
            <span>Dashboard</span>
            <v-icon>mdi-view-dashboard-outline</v-icon>
        </v-btn>

        <v-btn flat dark :to="{ name: 'weather'}">
            <span>Weather</span>
            <v-icon>mdi-weather-partlycloudy</v-icon>
        </v-btn>

        <v-btn flat dark :to="{ name: 'climate'}">
            <span>Climate</span>
            <v-icon>mdi-thermometer</v-icon>
        </v-btn>

        <v-btn flat dark :to="{ name: 'security'}">
            <span>Security</span>
            <v-icon>mdi-lock-open-outline</v-icon>
        </v-btn>

        <v-btn flat dark :to="{ name: 'lightning'}">
            <span>Lightning</span>
            <v-icon>mdi-lightbulb-outline</v-icon>
        </v-btn>

        <v-btn flat dark :to="{ name: 'devices'}">
            <span>Devices</span>
            <v-icon>mdi-access-point-network</v-icon>
        </v-btn>

        <v-btn flat dark :to="{ name: 'flows'}">
            <span>Flows</span>
            <v-icon>mdi-arrow-decision-auto</v-icon>
        </v-btn>

        <v-btn flat dark :to="{ name: 'energy'}">
            <span>Energy</span>
            <v-icon>mdi-power-plug</v-icon>
        </v-btn>

        <v-btn flat dark>
            <span>More</span>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

    </v-bottom-nav>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class BottomNav extends Vue {
}
</script>
