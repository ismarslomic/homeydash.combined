<template>
    <div class="text-xs-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-btn
                    dark
                    v-on="on">
                    {{$t(`locales.${currentLocale}`)}}
                </v-btn>
            </template>
            <v-list>
                <v-list-tile
                    v-for="option in options"
                    :key="option.locale"
                    @click="changeLocale(option)">
                    <v-list-tile-title>{{ option.title }}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';

    interface LocaleOption {
        locale: string;
        title: string;
    }

    @Component
    export default class LocalePicker extends Vue {
        @Getter('currentLocale', {namespace: 'locale'}) currentLocale!: string;

        get options(): LocaleOption[] {
            return this.$i18n.availableLocales.map((locale) => {
                return {
                    locale,
                    title: this.$parent.$t(`locales.${locale}`) as string
                };
            });
        }

        changeLocale(option: LocaleOption) {
            this.$store.dispatch('locale/setLocale', option.locale);
        }
    }
</script>

<style scoped>

</style>