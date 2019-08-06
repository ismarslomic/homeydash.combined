<template>
    <v-list two-line>
        <v-list-item
            v-for="option in availableLocalesOptions"
            :key="option.locale"
            @click="$emit('updateLocale', option.locale)">
            <v-list-item-content>
                <v-list-item-title>{{option.title}}</v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn icon ripple>
                    <v-icon color="grey lighten-1">{{locale === option.locale ? 'radio_button_checked' : 'radio_button_unchecked'}}</v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
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
