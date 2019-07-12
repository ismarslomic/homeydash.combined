<template>
    <v-app dark>
        <v-content>
            <v-container fluid id="app-container" pa-0>
                <v-fade-transition hide-on-leave>
                    <router-view></router-view>
                </v-fade-transition>
            </v-container>
        </v-content>
        <BottomNav></BottomNav>
    </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BottomNav from '@/components/BottomNav.vue';

@Component({
    components: {
        BottomNav
    }
})
export default class extends Vue {
}
</script>
