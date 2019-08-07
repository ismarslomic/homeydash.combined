<template>
    <div>
        <v-content>
            <v-container fluid id="default-layout-container">
                <v-fade-transition hide-on-leave>
                    <slot></slot>
                </v-fade-transition>
            </v-container>
        </v-content>
        <BottomNav></BottomNav>
    </div>
</template>

<script lang="ts">
    import BottomNav from '@/components/BottomNav.vue';
    import { FETCH_ACTIVITIES, FETCH_WEATHER_FORECAST } from '@/store/actions.type';
    import { Component, Vue } from 'vue-property-decorator';
    import { Action } from 'vuex-class';

    @Component({
        components: {
            BottomNav
        }
    })
    export default class extends Vue {
        @Action(FETCH_ACTIVITIES.actionName,
            {namespace: FETCH_ACTIVITIES.namespace}) fetchActivities!: any;
        @Action(FETCH_WEATHER_FORECAST.actionName,
            {namespace: FETCH_WEATHER_FORECAST.namespace}) fetchWeatherForecast!: any;

        created() {
            this.fetchActivities();
            this.fetchWeatherForecast();
        }
    }
</script>
