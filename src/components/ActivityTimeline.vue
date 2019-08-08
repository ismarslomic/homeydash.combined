<template>
    <v-card tile :loading="isRefreshingData" max-height="400" class="scroll">
        <v-layout column ma-0 fill-height>
            <v-flex pa-0 shrink>
                <v-card-title>
                    <v-icon class="mr-2">sms</v-icon>
                    {{$t('components.activity.title')}}
                </v-card-title>
            </v-flex>
            <v-flex pa-0 v-if="isDataLoaded" grow>
                <v-card-text>
                    <v-timeline dense>
                        <v-list two-line>
                            <v-list-item-group
                                v-model="selected"
                                multiple
                                active-class="">
                                <v-slide-x-transition group>
                                    <template v-for="(activity, index) in latestActivities">
                                        <v-timeline-item
                                            :key="activity.id"
                                            :icon="activity.icon"
                                            :color="index % 2 === 0 ? 'accent' : 'primary'"
                                            fill-dot>
                                            <v-list-item two-line :key="activity.id">
                                                <template v-slot:default="{ active, toggle }">
                                                    <v-list-item-content>
                                                        <v-list-item-title>{{activity.excerpt}}</v-list-item-title>
                                                        <v-list-item-subtitle v-if="!active">{{activity.dateCreated | fromNow(now)}}</v-list-item-subtitle>
                                                        <v-list-item-subtitle v-else>{{activity.dateCreated | calendarTime}}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </template>
                                            </v-list-item>
                                        </v-timeline-item>
                                    </template>
                                </v-slide-x-transition>
                            </v-list-item-group>
                        </v-list>
                    </v-timeline>
                </v-card-text>
            </v-flex>

        </v-layout>
    </v-card>
</template>

<script lang="ts">
    import { Activity } from '@/types/activity';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class ActivityTimeline extends Vue {
        now: Date = new Date();
        selected = [-1];

        @Prop() private activities!: Activity[];
        @Prop() private isRefreshingData!: boolean;
        @Prop() private isDataLoaded!: boolean;

        get latestActivities() {
            return this.activities.slice(0, 10);
        }

        created() {
            setInterval(() => {
                this.now = new Date();
            }, 1000 * 60); // every 60 seconds
        }
    }
</script>

<style scoped>
    .scroll {
        overflow-y: auto;
    }
</style>
