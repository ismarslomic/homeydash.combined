<template>
    <v-container pa-0 text-xs-center>
        <v-layout column ma-0 wrap>
            <v-flex xs4 class="caption" pa-0>
                {{date | shortTime}}
            </v-flex>
            <v-flex xs4 pa-0>
                <svgicon :name="iconFileName" width="24" height="24"></svgicon>
            </v-flex>
            <v-flex xs4 class="caption" pa-0>
                {{temperature | temperature}}&#8451;
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import '@/icons/yws';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class WeatherForecastHour extends Vue {
        @Prop() private date!: Date;
        @Prop() private iconFileName!: string;
        @Prop() private temperature!: number;
    }

</script>

<style scoped>
    .svg-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        color: inherit;
        vertical-align: middle;
        fill: none;
        stroke: currentColor;
    }

    .svg-fill {
        fill: currentColor;
        stroke: none;
    }

    .svg-up {
        /* default */
        transform: rotate(0deg);
    }

    .svg-right {
        transform: rotate(90deg);
    }

    .svg-down {
        transform: rotate(180deg);
    }

    .svg-left {
        transform: rotate(-90deg);
    }
</style>