<template>
    <v-list two-line>
        <v-list-item
            v-for="availableWeatherLocation in availableWeatherLocations"
            :key="availableWeatherLocation.id"
            @click="$emit('updateWeatherLocation', availableWeatherLocation)">
            <v-list-item-content>
                <v-list-item-title>{{availableWeatherLocation.name}}</v-list-item-title>
                <v-list-item-subtitle>
                    {{availableWeatherLocation.category.name}} - {{availableWeatherLocation.country.name}}/{{availableWeatherLocation.region.name}}/{{availableWeatherLocation.subregion.name}}
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn icon ripple>
                    <v-icon color="grey lighten-1">{{weatherLocation.id === availableWeatherLocation.id ? 'radio_button_checked' : 'radio_button_unchecked'}}</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
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
