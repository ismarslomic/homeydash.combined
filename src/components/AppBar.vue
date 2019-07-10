<template>
        <v-app-bar absolute app flat dark extended>
            <v-toolbar-title >{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            Wednesday, February 10
        </v-app-bar>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    @Component
    export default class AppBar extends Vue {
        @Getter('title', {namespace: 'topToolbar'}) title!: string;
    }
</script>
