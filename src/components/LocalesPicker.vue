<template>
    <v-list two-line>
        <v-list-tile
            v-for="option in availableLocalesOptions"
            :key="option.locale"
            @click="$emit('updateLocale', option.locale)">
            <v-list-tile-content>
                <v-list-tile-title>{{option.title}}</v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon ripple>
                    <v-icon color="grey lighten-1">{{locale === option.locale ? 'radio_button_checked' : 'radio_button_unchecked'}}</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    interface LocaleOption {
        locale: string;
        title: string;
    }

    @Component({})
    export default class LocalesPicker extends Vue {
        @Prop() private availableLocales!: string[];
        @Prop() private locale!: string;

        get availableLocalesOptions(): LocaleOption[] {
            return this.availableLocales.map((locale) => {
                return {
                    locale,
                    title: this.$parent.$t(`locales.${locale}`) as string
                };
            });
        }
    }
</script>

<style scoped>

</style>
