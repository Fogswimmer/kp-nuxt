<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("pages.about.title")) }}</Title>
    </Head>
    <v-card max-width="1000" class="mx-auto" border>
      <v-toolbar>
        <template #prepend>
          <BackBtn />
        </template>
        <v-toolbar-title>
          {{ $t("pages.about.title") }}
        </v-toolbar-title>
      </v-toolbar>

      <v-expansion-panels v-model="accordion">
        <v-expansion-panel :title="$t('pages.about.stack')" value="stack">
          <v-expansion-panel-text>
            <StackList />

            <v-btn
              :prepend-icon="showMore ? 'mdi-menu-up' : 'mdi-menu-down'"
              block
              class="mt-2"
              @click="showMore = !showMore"
              >{{ showMore ? $t("general.hide") : $t("general.show_more") }}
            </v-btn>

            <v-card v-if="showMore" border class="mt-2" theme="dark">
              <v-toolbar>
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
                    <v-img
                      src="public/img/scheme-no-bg.png"
                      alt="scheme"
                      height="400"
                    >
                      <template #placeholder>
                        <ImgPlaceholder />
                      </template>
                    </v-img>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="code">
                    <ComposeYamlCode />
                  </v-tabs-window-item>
                </v-tabs-window>
              </v-card-text>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel
          value="author"
          :title="$t('pages.about.author.title')"
        >
          <v-expansion-panel-text>
            <Author />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import definePageTitle from "~/utils/definePageTitle";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";
import Author from "~/components/AboutPartials/Author.vue";
import ComposeYamlCode from "~/components/AboutPartials/ComposeYamlCode.vue";
import StackList from "~/components/AboutPartials/StackList.vue";

const accordion = ref<string[]>(["stack"]);
const active = ref<string>("scheme");
const showMore = ref<boolean>(false);
definePageMeta({
  name: "about",
  path: "/about",
  title: "About",
});
</script>

<style></style>
