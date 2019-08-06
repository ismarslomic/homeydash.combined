<template>
    <div>
        <v-dialog v-model="isDialogOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-btn icon dark v-on="on">
                    <v-icon>settings</v-icon>
                </v-btn>
            </template>
            <v-card flat tile>
                <v-toolbar color="accent" flat>
                    <v-btn icon @click="closeDialog" v-if="!isSubMenuOpen">
                        <v-icon>close</v-icon>
                    </v-btn>

                    <v-btn icon v-if="isSubMenuOpen" @click="closeSubMenu">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{$t(currentSettingsComponent.title)}}</v-toolbar-title>
                </v-toolbar>

                <settings-list
                    v-if="currentSettingsComponent === settingsList"
                    :locale="locale"
                    :weatherLocation="weatherLocation"
                    @settingsItemClicked="settingsItemClicked"
                    :isWeatherLocationLoaded="isWeatherLocationLoaded"
                    :homeyGeoCoordinates="homeyGeoCoordinates"
                    :isHomeyGeoCoordinatesLoaded="isHomeyGeoCoordinatesLoaded"
                    :isLoadingHomeyGeoCoordinates="isLoadingHomeyGeoCoordinates"
                    :user="user"
                    :homey="homey">
                </settings-list>

                <locales-picker
                    v-if="currentSettingsComponent === localesPicker"
                    :availableLocales="availableLocales"
                    :locale="locale"
                    @updateLocale="updateLocale">
                </locales-picker>

                <weather-locations-picker
                    v-if="currentSettingsComponent === locationPicker"
                    :availableWeatherLocations="availableWeatherLocations"
                    :weatherLocation="weatherLocation"
                    @updateWeatherLocation="updateWeatherLocation">
                </weather-locations-picker>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import LocalesPicker from '@/components/LocalesPicker.vue';
    import SettingsList from '@/components/SettingsList.vue';
    import WeatherLocationsPicker from '@/components/WeatherLocationsPicker.vue';
    import { coordinatesRefresh, localesPicker, locationPicker, settingsList } from '@/constants/settings';
    import { CHANGE_LOCALE, CHANGE_WEATHER_LOCATION, FETCH_HOMEY } from '@/store/actions.type';
    import {
        GET_AUTH_USER,
        GET_AVAILABLE_WEATHER_LOCATIONS, GET_HOMEY,
        GET_HOMEY_GEO_COORDINATES,
        GET_LOCALE,
        GET_WEATHER_LOCATION,
        IS_HOMEY_GEO_COORDINATES_LOADED,
        IS_LOADING_HOMEY_GEO_COORDINATES,
        IS_WEATHER_LOCATION_LOADED
    } from '@/store/getters.type';
    import { GeolocationCoordinates, GeolocationDetails } from '@/types/geolocation';
    import { Homey } from '@/types/homey';
    import { SettingsComponent } from '@/types/settings';
    import { User } from '@/types/user';
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { Action, Getter } from 'vuex-class';

    @Component({
        components: {
            SettingsList,
            WeatherLocationsPicker,
            LocalesPicker
        }
    })
    export default class SettingsDialog extends Vue {
        @Getter(GET_WEATHER_LOCATION.getterName,
            {namespace: GET_WEATHER_LOCATION.namespace}) weatherLocation?: GeolocationDetails;
        @Getter(GET_HOMEY_GEO_COORDINATES.getterName,
            {namespace: GET_HOMEY_GEO_COORDINATES.namespace}) homeyGeoCoordinates?: GeolocationCoordinates;
        @Getter(GET_AVAILABLE_WEATHER_LOCATIONS.getterName,
            {namespace: GET_AVAILABLE_WEATHER_LOCATIONS.namespace}) availableWeatherLocations!: GeolocationDetails[];
        @Getter(IS_WEATHER_LOCATION_LOADED.getterName,
            {namespace: IS_WEATHER_LOCATION_LOADED.namespace}) isWeatherLocationLoaded!: boolean;
        @Getter(IS_HOMEY_GEO_COORDINATES_LOADED.getterName,
            {namespace: IS_HOMEY_GEO_COORDINATES_LOADED.namespace}) isHomeyGeoCoordinatesLoaded!: boolean;
        @Getter(GET_LOCALE.getterName,
            {namespace: GET_LOCALE.namespace}) locale!: string;
        @Getter(IS_LOADING_HOMEY_GEO_COORDINATES.getterName,
            {namespace: IS_LOADING_HOMEY_GEO_COORDINATES.namespace}) isLoadingHomeyGeoCoordinates!: boolean;
        @Getter(GET_AUTH_USER.getterName,
            {namespace: GET_AUTH_USER.namespace}) user!: User;
        @Getter(GET_HOMEY.getterName,
            {namespace: GET_HOMEY.namespace}) homey!: Homey;
        @Action(CHANGE_WEATHER_LOCATION.actionName,
            {namespace: CHANGE_WEATHER_LOCATION.namespace}) changeWeatherLocation: any;
        @Action(FETCH_HOMEY.actionName,
            {namespace: FETCH_HOMEY.namespace}) fetchHomey: any;
        @Action(CHANGE_LOCALE.actionName,
            {namespace: CHANGE_LOCALE.namespace}) changeLocale: any;
        isDialogOpen: boolean = false;
        currentSettingsComponent: SettingsComponent = settingsList;
        localesPicker: SettingsComponent = localesPicker;
        locationPicker: SettingsComponent = locationPicker;
        settingsList: SettingsComponent = settingsList;

        updateWeatherLocation(location: GeolocationDetails): void {
            this.changeWeatherLocation(location);
            this.closeSubMenu();
        }

        updateLocale(locale: string): void {
            this.changeLocale(locale);
            this.closeSubMenu();
        }

        settingsItemClicked(component: SettingsComponent): void {
            if (component.id === coordinatesRefresh.id) {
                this.fetchHomey();
            } else {
                this.showSettingsComponent(component);
            }
        }

        showSettingsComponent(component: SettingsComponent): void {
            this.currentSettingsComponent = component;
        }

        openDialog(): void {
            this.isDialogOpen = true;
        }

        closeSubMenu(): void {
            this.showSettingsComponent(settingsList);
        }

        closeDialog(): void {
            this.isDialogOpen = false;
        }

        get isSubMenuOpen(): boolean {
            return this.currentSettingsComponent !== settingsList;
        }

        get availableLocales(): string[] {
            return this.$i18n.availableLocales;
        }

        @Watch('isDialogOpen')
        onIsDialogOpenChange(newState: boolean, oldState: boolean) {
            if (!newState && oldState) {
                this.closeSubMenu();
            }
        }
    }
</script>
