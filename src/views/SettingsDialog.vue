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
    import { Getter } from 'vuex-class';

    @Component({
        components: {
            SettingsList,
            LocationsPicker,
            LocalesPicker
        }
    })
    export default class SettingsDialog extends Vue {
        @Getter('currentLocation', {namespace: 'geolocation'}) currentLocation?: GeolocationDetails;
        @Getter('currentCoordinates', {namespace: 'geolocation'}) currentCoordinates?: GeolocationCoordinates;
        @Getter('availableLocations', {namespace: 'geolocation'}) availableLocations!: GeolocationDetails[];
        @Getter('isDetailsDataLoaded', {namespace: 'geolocation'}) isDetailsDataLoaded!: boolean;
        @Getter('isCoordinateDataLoaded', {namespace: 'geolocation'}) isCoordinateDataLoaded!: boolean;
        @Getter('currentLocale', {namespace: 'locale'}) currentLocale!: string;

        isDialogOpen: boolean = false;
        currentSettingsComponent: SettingsComponent = settingsList;
        localesPicker: SettingsComponent = localesPicker;
        locationPicker: SettingsComponent = locationPicker;
        settingsList: SettingsComponent = settingsList;

        updateCurrentLocation(location: GeolocationDetails): void {
            this.$store.dispatch('geolocation/updateCurrentGeolocationDetails', location);
            this.closeSubMenu();
        }

        updateCurrentLocale(locale: string): void {
            this.$store.dispatch('locale/setLocale', locale);
            this.closeSubMenu();
        }

        settingsItemClicked(component: SettingsComponent): void {
            if (component.id === coordinatesRefresh.id) {
                this.$store.dispatch('geolocation/updateGeolocationCoordinates');
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
