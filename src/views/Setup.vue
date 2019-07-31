<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>{{$t('views.setup.title')}}</v-toolbar-title>
                    </v-toolbar>

                    <v-stepper v-model="currentStep" vertical class="background: transparent">
                        <v-stepper-step step="1" :complete="isStepCompleted(1)" :editable="isStepEditable(1)" :color="stepColor(1)">
                            {{$t('views.setup.locale.title')}}
                        </v-stepper-step>
                        <v-stepper-content step="1">
                            <locales-picker
                                    :availableLocales="availableLocales"
                                    :currentLocale="currentLocale"
                                    @updateCurrentLocale="changeLocale">
                            </locales-picker>
                            <v-btn @click="nextStep(1)" color="primary" class="pa-0 ma-0">{{$t('actions.continue')}}</v-btn>
                        </v-stepper-content>

                        <v-stepper-step step="2" :complete="isStepCompleted(2)" :editable="isStepEditable(2)" :color="stepColor(2)">
                            {{$t('views.setup.welcome.title')}}
                        </v-stepper-step>
                        <v-stepper-content step="2">
                            <p>{{$t('views.setup.welcome.introduction')}}</p>
                            <v-btn @click="previousStep(2)" flat class="pa-0 ma-0">{{$t('actions.back')}}</v-btn>
                            <v-btn @click="nextStep(2)" color="primary" class="pa-0 ma-0">{{$t('actions.continue')}}</v-btn>
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
                                    :rules="[rules.required, rules.min, rules.max, rules.canDecode, rules.tokenExpired]"
                                    :hint="$t('hints.token', {number: 298})"
                                    auto-grow
                                    :readonly="isTokenDecodedValid()"
                                    :loading="isLoadingData"
                                    box
                                    class="caption"
                                    v-model="tokenInput"
                            >
                            </v-textarea>
                            <v-text-field
                                    prepend-inner-icon="alarm"
                                    v-if="tokenDecoded"
                                    :value="$d(new Date(tokenDecoded.expires_at), 'shortDateTime')"
                                    :label="$t('labels.expiresAt')"
                                    class="caption"
                                    box
                                    disabled
                            >
                            </v-text-field>
                            <v-btn @click="previousStep(3)" flat class="pa-0 ma-0">{{$t('actions.back')}}</v-btn>
                            <v-btn @click="nextStep(3)" color="primary" class="pa-0 ma-0" :disabled="!isGeolocationLoaded">{{$t('actions.continue')}}</v-btn>
                        </v-stepper-content>

                        <v-stepper-step step="4">
                            {{$t('views.setup.geolocation.title')}}
                        </v-stepper-step>
                        <v-stepper-content step="4">
                            <locations-picker
                                    :availableLocations="availableLocations"
                                    :currentLocation="currentLocation"
                                    @updateCurrentLocation="changeCurrentLocation">
                            </locations-picker>
                            <v-btn @click="previousStep(4)" flat class="pa-0 ma-0">{{$t('actions.back')}}</v-btn>
                            <v-btn @click="completeSetup()" color="primary" class="pa-0 ma-0">{{$t('actions.finish')}}</v-btn>
                        </v-stepper-content>
                    </v-stepper>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import LocalesPicker from '@/components/LocalesPicker.vue';
import LocationsPicker from '@/components/LocationsPicker.vue';
import AthomService from '@/services/AthomService';
import {
    FETCH_AUTHENTICATED_USER,
    INITIALIZE_GEOLOCATION_COORDINATES,
    INITIALIZE_GEOLOCATION_DETAILS,
    SET_IS_SETUP_COMPLETED,
    SET_LOCALE,
    UPDATE_CURRENT_GEOLOCATION_DETAILS
} from '@/store/actions.type';
import {
    GET_AVAILABLE_LOCATIONS,
    GET_CURRENT_COORDINATES,
    GET_CURRENT_LOCALE,
    GET_CURRENT_LOCATION,
    GET_USER,
    IS_LOADING_AUTHENTICATION,
    IS_LOADING_COORDINATES,
    IS_LOADING_GEOLOCATION,
    IS_LOADING_USER
} from '@/store/getters.type';
import {AthomApiToken} from '@/types/athomapi';
import {GeolocationCoordinates, GeolocationDetails} from '@/types/geolocation';
import {User} from '@/types/user';
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Action, Getter} from 'vuex-class';

@Component({
    components: {
        LocalesPicker,
        LocationsPicker
    }
})
export default class Setup extends Vue {

    get isLoadingData(): boolean {
        return this.isLoadingAuthentication ||
            this.isLoadingUser ||
            this.isLoadingCoordinates ||
            this.isLoadingGeolocation;
    }

    get availableLocales(): string[] {
        return this.$i18n.availableLocales;
    }

    @Getter(IS_LOADING_AUTHENTICATION.getterName,
        {namespace: IS_LOADING_AUTHENTICATION.namespace}) isLoadingAuthentication!: boolean;
    @Getter(IS_LOADING_USER.getterName,
        {namespace: IS_LOADING_USER.namespace}) isLoadingUser!: boolean;
    @Getter(IS_LOADING_COORDINATES.getterName,
        {namespace: IS_LOADING_COORDINATES.namespace}) isLoadingCoordinates!: boolean;
    @Getter(IS_LOADING_GEOLOCATION.getterName,
        {namespace: IS_LOADING_GEOLOCATION.namespace}) isLoadingGeolocation!: boolean;
    @Getter(GET_USER.getterName,
        {namespace: GET_USER.namespace}) user?: User;
    @Getter(GET_CURRENT_COORDINATES.getterName,
        {namespace: GET_CURRENT_COORDINATES.namespace}) currentCoordinates?: GeolocationCoordinates;
    @Getter(GET_CURRENT_LOCALE.getterName,
        {namespace: GET_CURRENT_LOCALE.namespace}) currentLocale!: string;
    @Getter(GET_AVAILABLE_LOCATIONS.getterName,
        {namespace: GET_AVAILABLE_LOCATIONS.namespace}) availableLocations!: GeolocationDetails[];
    @Getter(GET_CURRENT_LOCATION.getterName,
        {namespace: GET_CURRENT_LOCATION.namespace}) currentLocation?: GeolocationDetails;
    @Action(FETCH_AUTHENTICATED_USER.actionName,
        {namespace: FETCH_AUTHENTICATED_USER.namespace}) fetchAuthenticatedUser: any;
    @Action(INITIALIZE_GEOLOCATION_COORDINATES.actionName,
        {namespace: INITIALIZE_GEOLOCATION_COORDINATES.namespace}) initialiseGeolocationCoordinates: any;
    @Action(INITIALIZE_GEOLOCATION_DETAILS.actionName,
        {namespace: INITIALIZE_GEOLOCATION_DETAILS.namespace}) initialiseGeolocationDetails: any;
    @Action(UPDATE_CURRENT_GEOLOCATION_DETAILS.actionName,
        {namespace: UPDATE_CURRENT_GEOLOCATION_DETAILS.namespace}) updateCurrentGeolocationDetails: any;
    @Action(SET_LOCALE.actionName,
        {namespace: SET_LOCALE.namespace}) setLocale: any;
    @Action(SET_IS_SETUP_COMPLETED.actionName,
        {namespace: SET_IS_SETUP_COMPLETED.namespace}) setIsSetupCompleted: any;

    currentStep: number = 0;
    tokenInput: string = '';
    tokenDecoded: AthomApiToken | null = null;
    isGeolocationLoaded: boolean = false;

    private rules = {
        min: (v: string) => v && v.length >= 298 || this.$parent.$t('validations.minChars', {number: 298}),
        max: (v: string) => v && v.length <= 298 || this.$parent.$t('validations.maxChars', {number: 298}),
        required: (v: string) => !!v || this.$parent.$t('validations.required'),
        canDecode: (v: string) => !!this.decodeToken(v) || this.$parent.$t('validations.decodingTokenFailed'),
        tokenExpired: () => !this.isTokenExpired() || this.$parent.$t('validations.tokenExpired')
    };

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

    isTokenExpired(): boolean {
        if (this.tokenDecoded != null) {
            const expiresAtDate: Date = new Date(this.tokenDecoded.expires_at);
            const now: Date = new Date();
            return expiresAtDate <= now;
        } else {
            return false;
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
        this.setIsSetupCompleted(true).then(() => {
            this.$router.push({
                name: 'dashboard'
            });
        });
    }

    fetchGeolocationDetails(token: AthomApiToken) {
        AthomService.authenticate(token)
            .then(() => {
                this.fetchAuthenticatedUser();
                this.initialiseGeolocationCoordinates()
                    .then(() => {
                        this.initialiseGeolocationDetails()
                            .then(() => {
                                this.isGeolocationLoaded = true;
                            });
                    });
            })
            .catch((error: any) => {
                // tslint:disable-next-line:no-console
                console.error(error);
            });
    }

    isTokenDecodedValid(): boolean {
        return (!!this.tokenDecoded) && !this.isTokenExpired();
    }

    changeLocale(locale: string): void {
        this.setLocale(locale);
    }

    changeCurrentLocation(location: GeolocationDetails): void {
        this.updateCurrentGeolocationDetails(location);
    }
}
</script>

<style scoped>
</style>
