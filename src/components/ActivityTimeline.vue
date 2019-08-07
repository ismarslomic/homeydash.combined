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
                    <v-timeline align-top dense>
                        <v-timeline-item
                            v-for="activity in latestActivities"
                            :key="activity.id"
                            icon="mdi-arrow-decision-auto">
                            <v-layout pt-1>
                                <v-flex xs3>
                                    <strong> {{$d(new Date(activity.dateCreated), 'shortTime')}}</strong>
                                </v-flex>
                                <v-flex>
                                    <strong> {{activity.excerpt}}</strong>
                                </v-flex>
                            </v-layout>
                        </v-timeline-item>
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
        @Prop() private activities!: Activity[];
        @Prop() private isRefreshingData!: boolean;
        @Prop() private isDataLoaded!: boolean;

        get latestActivities() {
            return this.activities.slice(0, 10);
        }
    }
</script>

<style scoped>
    .scroll {
        overflow-y: auto;
    }
</style>
