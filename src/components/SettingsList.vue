<template>
    <div>
        <v-list>
            <v-list-tile avatar>
                <v-list-tile-avatar color="teal">
                    <img :src="user.avatar" alt="Avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{user.name}} ({{user.role}})</v-list-tile-title>
                    <v-list-tile-sub-title>{{homey.name}} (v.{{homey.softwareVersion}})</v-list-tile-sub-title>
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
                    <v-list-tile-sub-title>{{$t(`locales.${locale}`)}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar @click="$emit('settingsItemClicked', locationPicker)">
                <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text">mdi-weather-partly-cloudy</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{$t(locationPicker.title)}}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="isWeatherLocationLoaded">{{weatherLocation.name}} -
                        {{weatherLocation.category.name}} - {{weatherLocation.country.name}}/{{weatherLocation.region.name}}/{{weatherLocation.subregion.name}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar @click="">
                <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text">place</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{$t(coordinatesRefresh.title)}}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="isHomeyGeoCoordinatesLoaded">
                        {{$t('components.settings.coordinates.long')}}: {{homeyGeoCoordinates.longitude}} |
                        {{$t('components.settings.coordinates.lat')}}: {{homeyGeoCoordinates.latitude}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon ripple :loading="isLoadingHomeyGeoCoordinates" :disabled="isLoadingHomeyGeoCoordinates" @click="$emit('settingsItemClicked', coordinatesRefresh)">
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
    import { Homey } from '@/types/homey';
    import { SettingsComponent } from '@/types/settings';
    import { User } from '@/types/user';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class SettingsList extends Vue {
        localesPicker: SettingsComponent = localesPicker;
        locationPicker: SettingsComponent = locationPicker;
        coordinatesRefresh: SettingsComponent = coordinatesRefresh;

        @Prop() private locale!: string;
        @Prop() private weatherLocation!: GeolocationDetails;
        @Prop() private homeyGeoCoordinates!: GeolocationCoordinates;
        @Prop() private isWeatherLocationLoaded!: boolean;
        @Prop() private isHomeyGeoCoordinatesLoaded!: boolean;
        @Prop() private isLoadingHomeyGeoCoordinates!: boolean;
        @Prop() private user!: User;
        @Prop() private homey!: Homey;

    }
</script>

<style scoped>

</style>
