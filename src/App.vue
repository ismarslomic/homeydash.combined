<template>
    <v-app dark>

        <TopToolbar></TopToolbar>

        <v-content>
            <v-container fluid>
                <v-fade-transition hide-on-leave>
                    <router-view></router-view>
                </v-fade-transition>
            </v-container>
        </v-content>

        <BottomNav></BottomNav>

    </v-app>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import TopToolbar from '@/components/TopToolbar.vue';
    import BottomNav from '@/components/BottomNav.vue';
    @Component({
        components: {
            TopToolbar,
            BottomNav
        }
    })
    export default class extends Vue {
    }
</script>
