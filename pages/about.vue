<template>
    <div>
        <Head>
            <Title>{{ definePageTitle($t("pages.about.title")) }}</Title>
        </Head>
        <Nuxt-Layout v-if="$vuetify.display.mdAndUp" name="right-drawer">
            <v-card :title="$t('pages.about.stack')" prepend-icon="mdi-tools">
                <StackList />
                <v-divider></v-divider>
                <div class="w-100 text-center">
                    <span class="text-h6">
                        {{ $t("pages.about.author.title") }}</span
                    >
                </div>
                <Author compact />
            </v-card>
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

            <v-card>
                <v-toolbar color="surface">
                    <v-toolbar-title> Devops </v-toolbar-title>
                    <v-tabs v-model="active">
                        <v-tab value="scheme" prepend-icon="mdi-image">{{
                            $t("pages.about.scheme")
                        }}</v-tab>
                        <v-tab value="code" prepend-icon="mdi-code-tags"
                            >compose.yaml</v-tab
                        >
                    </v-tabs>
                </v-toolbar>
                <v-card-text>
                    <v-tabs-window v-model="active">
                        <v-tabs-window-item value="scheme">
                            <v-sheet>
                                <div
                                    class="fill-height d-flex justify-center align-center pa-2"
                                >
                                    <v-img
                                        src="public/img/scheme.webp"
                                        alt="scheme"
                                        :class="
                                            theme.current.value.dark
                                                ? ''
                                                : 'inverted'
                                        "
                                        :height="$vuetify.display.mdAndUp ? 500 : 300"
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

            <template v-if="$vuetify.display.smAndDown">
                <v-col>
                    <StackList />
                    <div class="w-100 text-center">
                        <span class="text-h6">
                            {{ $t("pages.about.author.title") }}</span
                        >
                    </div>
                    <Author :compact="false" />
                </v-col>
            </template>
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
