<template>
    <v-container fluid id="view-container" pa-0>
        <v-toolbar fixed app flat color="#303030">
            <v-toolbar-title class="display-2 text-uppercase">{{$t('views.climate')}}</v-toolbar-title>
        </v-toolbar>
        <v-container grid-list-md fluid id="view-content-container">
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md4 shrink order-xs1>
                    <v-card tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex shrink>
                                <v-card-title>Title</v-card-title>
                            </v-flex>
                            <v-flex grow>
                                <v-card-text>Content<br /><br /><br /><br /><br /></v-card-text>
                            </v-flex>
                            <v-flex shrink>
                                <v-card-actions class="pa-3">Actions</v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md4 order-xs2>
                    <v-card color="pink" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex shrink>
                                <v-card-title>Title</v-card-title>
                            </v-flex>
                            <v-flex grow>
                                <v-card-text>Content<br /><br /><br /><br /><br /></v-card-text>
                            </v-flex>
                            <v-flex shrink>
                                <v-card-actions class="pa-3">Actions</v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md4 order-xs3>
                    <v-card color="purple darken-2" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex shrink>
                                <v-card-title>Title</v-card-title>
                            </v-flex>
                            <v-flex grow>
                                <v-card-text>Content<br /><br /><br /><br /><br /></v-card-text>
                            </v-flex>
                            <v-flex shrink>
                                <v-card-actions class="pa-3">Actions</v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md4 shrink order-xs4>
                    <v-card color="cyan" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex shrink>
                                <v-card-title>Title</v-card-title>
                            </v-flex>
                            <v-flex grow>
                                <v-card-text>Content<br /><br /><br /><br /><br /></v-card-text>
                            </v-flex>
                            <v-flex shrink>
                                <v-card-actions class="pa-3">Actions</v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md4 order-xs5>
                    <v-card color="teal" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex shrink>
                                <v-card-title>Title</v-card-title>
                            </v-flex>
                            <v-flex grow>
                                <v-card-text>Content<br /><br /><br /><br /><br /></v-card-text>
                            </v-flex>
                            <v-flex shrink>
                                <v-card-actions class="pa-3">Actions</v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md4 order-xs6>
                    <v-card color="light-blue" tile>
                        <v-layout column ma-0 fill-height>
                            <v-flex shrink>
                                <v-card-title>Title</v-card-title>
                            </v-flex>
                            <v-flex grow>
                                <v-card-text>Content<br /><br /><br /><br /><br /></v-card-text>
                            </v-flex>
                            <v-flex shrink>
                                <v-card-actions class="pa-3">Actions</v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({})
    export default class Climate extends Vue {
    }
</script>
