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
                    <v-icon class="grey lighten-1 white--text">location_on</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{$t(locationPicker.title)}}</v-list-tile-title>
                    <v-list-tile-sub-title v-if="isDetailsDataLoaded">{{currentLocation.name}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script lang="ts">
    import { localesPicker, locationPicker } from '@/constants/settings';
    import { GeolocationDetails } from '@/types/geolocation';
    import { SettingsComponent } from '@/types/settings';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({})
    export default class SettingsList extends Vue {
        localesPicker: SettingsComponent = localesPicker;
        locationPicker: SettingsComponent = locationPicker;

        @Prop() private currentLocale!: string;
        @Prop() private currentLocation!: GeolocationDetails;
        @Prop() private isDetailsDataLoaded!: boolean;
    }
</script>

<style scoped>

</style>