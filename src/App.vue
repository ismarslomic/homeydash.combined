<template>
    <v-app>

        <AppBar></AppBar>

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
    import AppBar from '@/components/AppBar.vue';
    import BottomNav from '@/components/BottomNav.vue';
    @Component({
        components: {
            AppBar,
            BottomNav
        }
    })
    export default class extends Vue {
    }
</script>
