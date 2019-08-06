<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12" tile>
                    <v-app-bar color="accent" flat>
                        <v-toolbar-title>{{$t('views.setup.title')}}</v-toolbar-title>
                    </v-app-bar>

                    <v-stepper v-model="currentStep" vertical class="background: transparent">
                        <v-stepper-step step="1" :complete="isStepCompleted(1)" :editable="isStepEditable(1)" :color="stepColor(1)">
                            {{$t('views.setup.locale.title')}}
                        </v-stepper-step>
                        <v-stepper-content step="1">
                            <locales-picker
                                    :availableLocales="availableLocales"
                                    :locale="locale"
                                    @updateLocale="changeLocale">
                            </locales-picker>
                            <v-btn @click="nextStep(1)" color="primary">{{$t('actions.continue')}}</v-btn>
                        </v-stepper-content>

                        <v-stepper-step step="2" :complete="isStepCompleted(2)" :editable="isStepEditable(2)" :color="stepColor(2)">
                            {{$t('views.setup.welcome.title')}}
                        </v-stepper-step>
                        <v-stepper-content step="2">
                            <p>{{$t('views.setup.welcome.introduction')}}</p>
                            <v-btn @click="previousStep(2)" text>{{$t('actions.back')}}</v-btn>
                            <v-btn @click="nextStep(2)" color="primary">{{$t('actions.continue')}}</v-btn>
                        </v-stepper-content>

                        <v-stepper-step step="3" :complete="isStepCompleted(3)" :editable="isStepEditable(3)" :color="stepColor(3)">
                            {{$t('views.setup.apitoken.title')}}
                        </v-stepper-step>
                        <v-stepper-content step="3">
                            <p>
                                {{$t('views.setup.apitoken.introduction')}}
                                <a href="https://homey.ink" target="_blank">homey.ink</a>
                                {{$t('views.setup.apitoken.introduction-step')}}
                            </p>
                            <ol v-html="$t('views.setup.apitoken.steps')"></ol>
                            <br class="mb-3">
                            <v-textarea
                                    prepend-inner-icon="code"
                                    name="token"
                                    label="Athom API token"
                                    counter="298"
                                    maxlength="298"
                                    clearable
                                    :rules="[rules.required, rules.min, rules.max, rules.canDecode]"
                                    :hint="$t('hints.token', {number: 298})"
                                    auto-grow
                                    :readonly="isTokenDecodedValid()"
                                    :loading="isLoadingData"
                                    filled
                                    class="caption"
                                    v-model="tokenInput"
                            >
                            </v-textarea>
                            <v-btn @click="previousStep(3)" text>{{$t('actions.back')}}</v-btn>
                            <v-btn @click="nextStep(3)" color="primary"  :disabled="!isGeolocationLoaded">{{$t('actions.continue')}}</v-btn>
                        </v-stepper-content>

                        <v-stepper-step step="4">
                            {{$t('views.setup.geolocation.title')}}
                        </v-stepper-step>
                        <v-stepper-content step="4">
                            <weather-locations-picker
                                    :availableWeatherLocations="availableWeatherLocations"
                                    :weatherLocation="weatherLocation"
                                    @updateWeatherLocation="updateWeatherLocation">
                            </weather-locations-picker>
                            <v-btn @click="previousStep(4)" text>{{$t('actions.back')}}</v-btn>
                            <v-btn @click="completeSetup()" color="primary">{{$t('actions.finish')}}</v-btn>
                        </v-stepper-content>
                    </v-stepper>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import LocalesPicker from '@/components/LocalesPicker.vue';
import WeatherLocationsPicker from '@/components/WeatherLocationsPicker.vue';
import {
    CHANGE_ATHOM_API_TOKEN,
    CHANGE_WEATHER_LOCATION,
    FETCH_AUTHENTICATED_USER,
    FETCH_HOMEY,
    FETCH_WEATHER_LOCATIONS,
    CHANGE_IS_SETUP_COMPLETED, CHANGE_LOCALE
} from '@/store/actions.type';
import {
    GET_AVAILABLE_WEATHER_LOCATIONS,
    GET_LOCALE,
    GET_WEATHER_LOCATION,
    IS_LOADING_AUTHENTICATION,
    IS_LOADING_HOMEY_GEO_COORDINATES,
    IS_LOADING_WEATHER_LOCATION,
    IS_LOADING_USER
} from '@/store/getters.type';
import {AthomApiToken} from '@/types/athomapi';
import {GeolocationDetails} from '@/types/geolocation';
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

@Component({
    components: {
        LocalesPicker,
        WeatherLocationsPicker
    }
})
export default class Setup extends Vue {
    @Getter(IS_LOADING_AUTHENTICATION.getterName,
        {namespace: IS_LOADING_AUTHENTICATION.namespace}) isLoadingAuthentication!: boolean;
    @Getter(IS_LOADING_USER.getterName,
        {namespace: IS_LOADING_USER.namespace}) isLoadingUser!: boolean;
    @Getter(IS_LOADING_HOMEY_GEO_COORDINATES.getterName,
        {namespace: IS_LOADING_HOMEY_GEO_COORDINATES.namespace}) isLoadingHomeyGeoCoordinates!: boolean;
    @Getter(IS_LOADING_WEATHER_LOCATION.getterName,
        {namespace: IS_LOADING_WEATHER_LOCATION.namespace}) isLoadingWeatherLocation!: boolean;
    @Getter(GET_LOCALE.getterName,
        {namespace: GET_LOCALE.namespace}) locale!: string;
    @Getter(GET_AVAILABLE_WEATHER_LOCATIONS.getterName,
        {namespace: GET_AVAILABLE_WEATHER_LOCATIONS.namespace}) availableWeatherLocations!: GeolocationDetails[];
    @Getter(GET_WEATHER_LOCATION.getterName,
        {namespace: GET_WEATHER_LOCATION.namespace}) weatherLocation?: GeolocationDetails;
    @Action(FETCH_AUTHENTICATED_USER.actionName,
        {namespace: FETCH_AUTHENTICATED_USER.namespace}) fetchAuthenticatedUser: any;
    @Action(FETCH_HOMEY.actionName,
        {namespace: FETCH_HOMEY.namespace}) fetchHomey: any;
    @Action(FETCH_WEATHER_LOCATIONS.actionName,
        {namespace: FETCH_WEATHER_LOCATIONS.namespace}) fetchWeatherLocations: any;
    @Action(CHANGE_WEATHER_LOCATION.actionName,
        {namespace: CHANGE_WEATHER_LOCATION.namespace}) changeWeatherLocation: any;
    @Action(CHANGE_LOCALE.actionName,
        {namespace: CHANGE_LOCALE.namespace}) changeLocale: any;
    @Action(CHANGE_IS_SETUP_COMPLETED.actionName,
        {namespace: CHANGE_IS_SETUP_COMPLETED.namespace}) changeIsSetupCompleted: any;
    @Action(CHANGE_ATHOM_API_TOKEN.actionName,
        {namespace: CHANGE_ATHOM_API_TOKEN.namespace}) changeAthomApiToken: any;

    currentStep: number = 0;
    tokenInput: string = '';
    tokenDecoded: AthomApiToken | null = null;
    isGeolocationLoaded: boolean = false;

    private rules = {
        min: (v: string) => v && v.length >= 298 || this.$parent.$t('validations.minChars', {number: 298}),
        max: (v: string) => v && v.length <= 298 || this.$parent.$t('validations.maxChars', {number: 298}),
        required: (v: string) => !!v || this.$parent.$t('validations.required'),
        canDecode: (v: string) => !!this.decodeToken(v) || this.$parent.$t('validations.decodingTokenFailed')
    };

    get isLoadingData(): boolean {
        return this.isLoadingAuthentication ||
            this.isLoadingUser ||
            this.isLoadingHomeyGeoCoordinates ||
            this.isLoadingWeatherLocation;
    }

    get availableLocales(): string[] {
        return this.$i18n.availableLocales;
    }

    @Watch('tokenInput')
    onTokenInputChange(newValue: string) {
        this.tokenDecoded = this.decodeToken(newValue);
        if (this.isTokenDecodedValid()) {
            // @ts-ignore
            this.fetchGeolocationDetails(this.tokenDecoded);
        }
    }

    decodeToken(value: string): AthomApiToken | null {
        try {
            const urlDecoded: string = decodeURIComponent(value);
            const base64Decoded: AthomApiToken = JSON.parse(atob(urlDecoded));
            return base64Decoded;
        } catch (err) {
            return null;
        }
    }

    isStepCompleted(step: number): boolean {
        return this.currentStep > step;
    }

    isStepEditable(step: number): boolean {
        return this.currentStep > step;
    }

    stepColor(step: number): string {
        return this.currentStep > step ? 'success' : 'primary';
    }

    nextStep(step: number): void {
        if (step !== 4) {
            this.currentStep = step + 1;
        }
    }

    previousStep(step: number): void {
        if (step !== 1) {
            this.currentStep = step - 1;
        }
    }

    completeSetup(): void {
        this.changeIsSetupCompleted(true).then(() => {
            this.$router.push({
                name: 'dashboard'
            });
        });
    }

    fetchGeolocationDetails(token: AthomApiToken) {
        this.changeAthomApiToken(token)
            .then(() => {
                this.fetchAuthenticatedUser().then(() => {
                    this.fetchHomey()
                        .then(() => {
                            this.fetchWeatherLocations()
                                .then(() => {
                                    this.isGeolocationLoaded = true;
                                });
                        });
                });
            });
    }

    isTokenDecodedValid(): boolean {
        return (!!this.tokenDecoded);
    }

    updateLocale(locale: string): void {
        this.changeLocale(locale);
    }

    updateWeatherLocation(location: GeolocationDetails): void {
        this.changeWeatherLocation(location);
    }
}
</script>

<style scoped>
</style>
