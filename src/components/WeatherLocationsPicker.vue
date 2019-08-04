<template>
    <v-list two-line>
        <v-list-tile
            v-for="availableWeatherLocation in availableWeatherLocations"
            :key="availableWeatherLocation.id"
            @click="$emit('updateWeatherLocation', availableWeatherLocation)">
            <v-list-tile-content>
                <v-list-tile-title>{{availableWeatherLocation.name}}</v-list-tile-title>
                <v-list-tile-sub-title>
                    {{availableWeatherLocation.category.name}} - {{availableWeatherLocation.country.name}}/{{availableWeatherLocation.region.name}}/{{availableWeatherLocation.subregion.name}}
                </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon ripple>
                    <v-icon color="grey lighten-1">{{weatherLocation.id === availableWeatherLocation.id ? 'radio_button_checked' : 'radio_button_unchecked'}}</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
</template>

<script lang="ts">
    import { GeolocationDetails } from '@/types/geolocation';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class WeatherLocationsPicker extends Vue {
        @Prop() private availableWeatherLocations!: GeolocationDetails[];
        @Prop() private weatherLocation?: GeolocationDetails;
    }
</script>

<style scoped>

</style>
