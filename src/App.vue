<template>
    <v-app dark>
        <v-content>
            <v-container fluid id="app-container" pa-0>
                <v-fade-transition hide-on-leave>
                    <router-view></router-view>
                </v-fade-transition>
            </v-container>
        </v-content>
        <BottomNav v-if="isUserAuthenticated"></BottomNav>
    </v-app>
</template>

<script lang="ts">
    import BottomNav from '@/components/BottomNav.vue';
    import { Component, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';

    @Component({
        components: {
            BottomNav
        }
    })
    export default class extends Vue {
        @Getter('isUserAuthenticated', {namespace: 'user'}) isUserAuthenticated?: boolean;
    }
</script>
