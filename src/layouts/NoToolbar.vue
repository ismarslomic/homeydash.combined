<template>
    <div>
        <v-content>
            <v-container fluid id="no-toolbar-layout-container">
                <v-fade-transition hide-on-leave>
                    <slot></slot>
                </v-fade-transition>
            </v-container>
        </v-content>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({})
    export default class extends Vue {
    }
</script>
