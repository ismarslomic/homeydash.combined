<template>

    <v-bottom-navigation
            fixed
            :value="true"
            flat
            app
            grow>
        <template v-for="(item) in navItems">
            <v-btn :to="item.route" :class="item.visibilityClassNav">
                <span>{{item.title}}</span>
                <v-icon>{{item.icon}}</v-icon>
            </v-btn>
        </template>

        <v-bottom-sheet v-model="sheet">
            <template v-slot:activator="{ on }">
                <v-btn
                        v-on="on"
                        class="hidden-lg-and-up"
                        v-model="sheet"
                >
                    <span>More</span>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                        v-for="(item) in filterItems "
                        :key="item.title"
                        @click="sheet = false"
                        :class="item.visibilityClassOverflow"
                        :to="item.route"
                >
                    <v-list-item-avatar>
                        <v-avatar size="32px" tile>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-bottom-sheet>

    </v-bottom-navigation>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class BottomNav extends Vue {
    sheet: boolean = false;
    navItems = [
        {
            title: 'Dashboard',
            route: { path: '/'},
            icon: 'mdi-view-dashboard-outline',
            visibilityClassNav: '',
            visibilityClassOverflow: ''
        },
        {
            title: 'Weather',
            route: { name: 'weather'},
            icon: 'mdi-weather-partlycloudy',
            visibilityClassNav: '',
            visibilityClassOverflow: ''
        },
        {
            title: 'Climate',
            route: { name: 'climate'},
            icon: 'mdi-thermometer',
            visibilityClassNav: '',
            visibilityClassOverflow: ''
        },
        {
            title: 'Security',
            route: { name: 'security'},
            icon: 'mdi-lock-open-outline',
            visibilityClassNav: 'hidden-sm-and-down',
            visibilityClassOverflow: 'hidden-md-and-up'
        },
        {
            title: 'Lightning',
            route: { name: 'lightning'},
            icon: 'mdi-lightbulb-outline',
            visibilityClassNav: 'hidden-sm-and-down',
            visibilityClassOverflow: 'hidden-md-and-up'
        },
        {
            title: 'Devices',
            route: { name: 'devices'},
            icon: 'mdi-access-point-network',
            visibilityClassNav: 'hidden-md-and-down',
            visibilityClassOverflow: 'hidden-lg-and-up'
        },
        {
            title: 'Flows',
            route: { name: 'flows'},
            icon: 'mdi-arrow-decision-auto',
            visibilityClassNav: 'hidden-md-and-down',
            visibilityClassOverflow: 'hidden-lg-and-up'
        },
        {
            title: 'Energy',
            route: { name: 'energy'},
            icon: 'mdi-power-plug',
            visibilityClassNav: 'hidden-md-and-down',
            visibilityClassOverflow: 'hidden-lg-and-up'
        }
    ];


    get filterItems() {
       return this.navItems.filter( (item) => {
           return item.visibilityClassNav;
       });
    }

}
</script>
