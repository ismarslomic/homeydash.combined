<template>
    <v-app>
        <component :is="layout">
            <router-view></router-view>
        </component>
    </v-app>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator';

    const DEFAULT_LAYOUT = 'no-toolbar';
    @Component({})
    export default class App extends Vue {
        get layout() {
            return (this.$route.meta.layout || DEFAULT_LAYOUT) + '-layout';
        }
    }
</script>

<style scoped>

</style>
