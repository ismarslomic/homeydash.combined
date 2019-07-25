<template>
    <v-list two-line>
        <v-list-tile
            v-for="location in availableLocations"
            :key="location.id"
            @click="$emit('updateCurrentLocation', location)">
            <v-list-tile-content>
                <v-list-tile-title>{{location.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{location.category.name}} - {{location.country.name}}/{{location.region.name}}/{{location.subregion.name}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon ripple>
                    <v-icon color="grey lighten-1">{{currentLocation.id === location.id ? 'radio_button_checked' : 'radio_button_unchecked'}}</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
</template>

<script lang="ts">
    import { GeolocationDetails } from '@/types/geolocation';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class LocationsPicker extends Vue {
        @Prop() private availableLocations!: GeolocationDetails[];
        @Prop() private currentLocation?: GeolocationDetails;
    }
</script>

<style scoped>

</style>