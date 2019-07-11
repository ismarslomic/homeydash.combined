<template>
        <v-toolbar fixed app flat dark extended>
            <v-toolbar-title >{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            Wednesday, February 10
        </v-toolbar>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    @Component
    export default class TopToolbar extends Vue {
        @Getter('title', {namespace: 'topToolbar'}) title!: string;
    }
</script>
