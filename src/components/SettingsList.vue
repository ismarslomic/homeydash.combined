<template>
    <div>
        <v-list>
            <v-list-tile avatar>
                <v-list-tile-avatar color="teal">
                    <span class="white--text headline">I</span>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>Ismar Slomic</v-list-tile-title>
                    <v-list-tile-sub-title>Admin</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list two-line>
            <v-list-tile avatar @click="$emit('settingsItemClicked', localesPicker)">
                <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text">language</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{$t(localesPicker.title)}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{$t(`locales.${currentLocale}`)}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar @click="$emit('settingsItemClicked', locationPicker)">
                <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text">mdi-weather-partly-cloudy</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{$t(locationPicker.title)}}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="isDetailsDataLoaded">{{currentLocation.name}} -
                        {{currentLocation.category.name}} - {{currentLocation.country.name}}/{{currentLocation.region.name}}/{{currentLocation.subregion.name}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar @click="$emit('settingsItemClicked', coordinatesRefresh)">
                <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text">place</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{$t(coordinatesRefresh.title)}}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="isCoordinateDataLoaded">
                        {{$t('components.settings.coordinates.long')}}: {{currentCoordinates.longitude}} |
                        {{$t('components.settings.coordinates.lat')}}: {{currentCoordinates.latitude}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon ripple :loading="isRefreshingCoordinates" :disabled="isRefreshingCoordinates" @click="$emit('settingsItemClicked', coordinatesRefresh)">
                        <v-icon color="grey lighten-1">refresh</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script lang="ts">
    import { coordinatesRefresh, localesPicker, locationPicker } from '@/constants/settings';
    import { GeolocationCoordinates, GeolocationDetails } from '@/types/geolocation';
    import { SettingsComponent } from '@/types/settings';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class SettingsList extends Vue {
        localesPicker: SettingsComponent = localesPicker;
        locationPicker: SettingsComponent = locationPicker;
        coordinatesRefresh: SettingsComponent = coordinatesRefresh;

        @Prop() private currentLocale!: string;
        @Prop() private currentLocation!: GeolocationDetails;
        @Prop() private currentCoordinates!: GeolocationCoordinates;
        @Prop() private isDetailsDataLoaded!: boolean;
        @Prop() private isCoordinateDataLoaded!: boolean;
        @Prop() private isRefreshingCoordinates!: boolean;

    }
</script>

<style scoped>

</style>