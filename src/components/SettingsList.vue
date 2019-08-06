<template>
    <div>
        <v-list>
            <v-list-item>
                <v-list-item-avatar color="teal">
                    <img :src="user.avatar" alt="Avatar">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{user.name}} ({{user.role}})</v-list-item-title>
                    <v-list-item-subtitle>{{homey.name}} (v.{{homey.softwareVersion}})</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list two-line>
            <v-list-item @click="$emit('settingsItemClicked', localesPicker)">
                <v-list-item-avatar>
                    <v-icon class="grey lighten-1 white--text">language</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{$t(localesPicker.title)}}</v-list-item-title>
                    <v-list-item-subtitle>{{$t(`locales.${locale}`)}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item @click="$emit('settingsItemClicked', locationPicker)">
                <v-list-item-avatar>
                    <v-icon class="grey lighten-1 white--text">mdi-weather-partly-cloudy</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{$t(locationPicker.title)}}</v-list-item-title>
                    <v-list-item-subtitle v-if="isWeatherLocationLoaded">{{weatherLocation.name}} -
                        {{weatherLocation.category.name}} - {{weatherLocation.country.name}}/{{weatherLocation.region.name}}/{{weatherLocation.subregion.name}}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item @click="">
                <v-list-item-avatar>
                    <v-icon class="grey lighten-1 white--text">place</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{$t(coordinatesRefresh.title)}}</v-list-item-title>
                    <v-list-item-subtitle v-if="isHomeyGeoCoordinatesLoaded">
                        {{$t('components.settings.coordinates.long')}}: {{homeyGeoCoordinates.longitude}} |
                        {{$t('components.settings.coordinates.lat')}}: {{homeyGeoCoordinates.latitude}}
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon ripple :loading="isLoadingHomeyGeoCoordinates" :disabled="isLoadingHomeyGeoCoordinates" @click="$emit('settingsItemClicked', coordinatesRefresh)">
                        <v-icon color="grey lighten-1">refresh</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
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
