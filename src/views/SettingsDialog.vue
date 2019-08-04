<template>
    <div>
        <v-btn icon dark @click="openDialog">
            <v-icon>settings</v-icon>
        </v-btn>
        <v-dialog v-model="isDialogOpen" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
            <v-card tile>
                <v-toolbar card dark>
                    <v-btn icon dark @click="closeDialog" v-if="!isSubMenuOpen">
                        <v-icon>close</v-icon>
                    </v-btn>

                    <v-btn icon v-if="isSubMenuOpen" @click="closeSubMenu">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{$t(currentSettingsComponent.title)}}</v-toolbar-title>
                </v-toolbar>

                <settings-list
                    v-if="currentSettingsComponent === settingsList"
                    :currentLocale="currentLocale"
                    :currentLocation="currentLocation"
                    @settingsItemClicked="settingsItemClicked"
                    :isDetailsDataLoaded="isDetailsDataLoaded"
                    :currentCoordinates="currentCoordinates"
                    :isCoordinateDataLoaded="isCoordinateDataLoaded">
                </settings-list>

                <locales-picker
                    v-if="currentSettingsComponent === localesPicker"
                    :availableLocales="availableLocales"
                    :currentLocale="currentLocale"
                    @updateCurrentLocale="updateCurrentLocale">
                </locales-picker>

                <locations-picker
                    v-if="currentSettingsComponent === locationPicker"
                    :availableLocations="availableLocations"
                    :currentLocation="currentLocation"
                    @updateCurrentLocation="updateCurrentLocation">
                </locations-picker>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import LocalesPicker from '@/components/LocalesPicker.vue';
import LocationsPicker from '@/components/LocationsPicker.vue';
import SettingsList from '@/components/SettingsList.vue';
import { coordinatesRefresh, localesPicker, locationPicker, settingsList } from '@/constants/settings';
import { GeolocationCoordinates, GeolocationDetails } from '@/types/geolocation';
import { SettingsComponent } from '@/types/settings';
import { Component, Vue, Watch } from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';
import {UPDATE_LOCALE, CHANGE_WEATHER_LOCATION, FETCH_HOMEY} from '@/store/actions.type';
import {
    GET_AVAILABLE_WEATHER_LOCATIONS,
    GET_HOMEY_GEO_COORDINATES, GET_CURRENT_LOCALE,
    GET_WEATHER_LOCATION,
    IS_HOMEY_GEO_COORDINATES_LOADED,
    IS_WEATHER_LOCATION_LOADED
} from '@/store/getters.type';

@Component({
    components: {
        SettingsList,
        LocationsPicker,
        LocalesPicker
    }
})
export default class SettingsDialog extends Vue {
    @Getter(GET_WEATHER_LOCATION.getterName,
        {namespace: GET_WEATHER_LOCATION.namespace}) currentLocation?: GeolocationDetails;
    @Getter(GET_HOMEY_GEO_COORDINATES.getterName,
        {namespace: GET_HOMEY_GEO_COORDINATES.namespace}) currentCoordinates?: GeolocationCoordinates;
    @Getter(GET_AVAILABLE_WEATHER_LOCATIONS.getterName,
        {namespace: GET_AVAILABLE_WEATHER_LOCATIONS.namespace}) availableLocations!: GeolocationDetails[];
    @Getter(IS_WEATHER_LOCATION_LOADED.getterName,
        {namespace: IS_WEATHER_LOCATION_LOADED.namespace}) isDetailsDataLoaded!: boolean;
    @Getter(IS_HOMEY_GEO_COORDINATES_LOADED.getterName,
        {namespace: IS_HOMEY_GEO_COORDINATES_LOADED.namespace}) isCoordinateDataLoaded!: boolean;
    @Getter(GET_CURRENT_LOCALE.getterName,
        {namespace: GET_CURRENT_LOCALE.namespace}) currentLocale!: string;
    @Action(CHANGE_WEATHER_LOCATION.actionName,
        {namespace: CHANGE_WEATHER_LOCATION.namespace}) updateCurrentGeolocationDetails: any;
    @Action(FETCH_HOMEY.actionName,
        {namespace: FETCH_HOMEY.namespace}) fetchHomey: any;
    @Action(UPDATE_LOCALE.actionName,
        {namespace: UPDATE_LOCALE.namespace}) setLocale: any;
    isDialogOpen: boolean = false;
    currentSettingsComponent: SettingsComponent = settingsList;
    localesPicker: SettingsComponent = localesPicker;
    locationPicker: SettingsComponent = locationPicker;
    settingsList: SettingsComponent = settingsList;

    updateCurrentLocation(location: GeolocationDetails): void {
        this.updateCurrentGeolocationDetails(location);
        this.closeSubMenu();
    }

    updateCurrentLocale(locale: string): void {
        this.setLocale(locale);
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
