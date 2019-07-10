<template>
        <v-toolbar app fixed dark flat>
            <v-toolbar-title >{{ title }}</v-toolbar-title>
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
