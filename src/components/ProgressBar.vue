<template>
    <v-flex pa-0 v-if="show" shrink>
        <v-card-text>
            {{title}}
            <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-card-text>
    </v-flex>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class ProgressBar extends Vue {
        @Prop() private show!: boolean;
        @Prop() private title!: string;
    }

</script>

<style scoped>
</style>