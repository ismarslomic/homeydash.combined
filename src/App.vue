<template>
    <v-app>
        <v-content>
            <v-container fluid id="app-container">
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
    import {IS_USER_AUTHENTICATED} from '@/store/getters.type';

    @Component({
        components: {
            BottomNav
        }
    })
    export default class extends Vue {
        @Getter(IS_USER_AUTHENTICATED.getterName,
            {namespace: IS_USER_AUTHENTICATED.namespace}) isUserAuthenticated?: boolean;
    }
</script>
