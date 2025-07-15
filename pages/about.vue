<template>
    <div>
        <Head>
            <Title>{{ definePageTitle($t("pages.about.title")) }}</Title>
        </Head>
        <Nuxt-Layout v-if="$vuetify.display.mdAndUp" name="right-drawer">
            <Author compact />
        </Nuxt-Layout>

        <Nuxt-Layout name="list">
            <v-toolbar>
                <template #prepend>
                    <BackBtn />
                </template>
                <v-toolbar-title>
                    {{ $t("pages.about.title") }}
                </v-toolbar-title>
            </v-toolbar>

            <v-container>
                <v-row>
                    <v-col cols="12" lg="4">
                        <v-card
                            :title="$t('pages.about.stack')"
                            prepend-icon="mdi-tools"
                        >
                            <StackList />
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card height="100%">
                            <v-toolbar color="surface">
                                <v-toolbar-title> Devops </v-toolbar-title>
                                <v-tabs v-model="active">
                                    <v-tab
                                        value="scheme"
                                        prepend-icon="mdi-image"
                                        >{{ $t("pages.about.scheme") }}</v-tab
                                    >
                                    <v-tab
                                        value="code"
                                        prepend-icon="mdi-code-tags"
                                        >compose.yaml</v-tab
                                    >
                                </v-tabs>
                            </v-toolbar>
                            <v-card-text>
                                <v-tabs-window v-model="active">
                                    <v-tabs-window-item value="scheme">
                                        <v-sheet height="100%">
                                            <div
                                                class="fill-height d-flex justify-center align-center"
                                            >
                                                <v-img
                                                    src="public/img/scheme.webp"
                                                    alt="scheme"
                                                    :class="theme.current.value.dark ? '' :  'inverted'"
                                                >
                                                    <template #placeholder>
                                                        <ImgPlaceholder />
                                                    </template>
                                                </v-img>
                                            </div>
                                        </v-sheet>
                                    </v-tabs-window-item>
                                    <v-tabs-window-item value="code">
                                        <ComposeYamlCode />
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row v-if="$vuetify.display.smAndDown">
                    <v-col>
                        <Author :compact="false" />
                    </v-col>
                </v-row>
            </v-container>
        </Nuxt-Layout>
    </div>
</template>

<script lang="ts" setup>
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import definePageTitle from "~/utils/definePageTitle";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";
import Author from "~/components/AboutPartials/Author.vue";
import ComposeYamlCode from "~/components/AboutPartials/ComposeYamlCode.vue";
import StackList from "~/components/AboutPartials/StackList.vue";

const active = ref<string>("scheme");

const theme = useTheme();
definePageMeta({
    name: "about",
    path: "/about",
    title: "About",
});
</script>

<style>
.inverted {
    mix-blend-mode: difference;
}
</style>
