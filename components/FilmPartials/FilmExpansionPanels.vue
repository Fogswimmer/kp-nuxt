<template>
  <v-expansion-panels
    v-model="accordion"
    variant="accordion"
    bg-color="transparent"
    border
  >
    <v-expansion-panel :title="$t('pages.films.starring')" value="starring">
      <v-expansion-panel-text>
        <v-list rounded="lg" nav border>
          <v-list-item
            v-for="(actor, index) in starring"
            :key="index"
            :title="actor.value"
            :value="index"
            :to="$localeRoute(actor.to || '/')"
            base-color="secondary"
          >
            <template #prepend>
              <v-avatar>
                <v-img v-if="actor.avatar" :src="actor.avatar">
                  <template #placeholder>
                    <v-icon size="x-small">mdi-account</v-icon>
                  </template>
                  <template #error>
                    <ErrorPlaceHolder />
                  </template>
                </v-img>
                <v-icon v-else icon="mdi-account" />
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel value="team" :title="$t('pages.films.team')">
      <v-expansion-panel-text>
        <v-list rounded="lg" nav border>
          <v-list-item
            v-for="(person, index) in team"
            :key="index"
            rounded="lg"
            :subtitle="$t(person.title)"
            :title="person.value"
            :value="index"
            :to="$localeRoute(person.to || '/')"
            base-color="secondary"
          >
            <template #prepend>
              <v-avatar>
                <v-img :src="person.avatar">
                  <template #placeholder>
                    <v-icon size="x-small">mdi-account</v-icon>
                  </template>
                  <template #error>
                    <ErrorPlaceHolder />
                  </template>
                </v-img>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel
      id="description"
      :title="$t('pages.films.description')"
      tag="section"
      value="description"
    >
      <v-expansion-panel-text>
        <slot name="description" />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel
      id="gallery"
      value="gallery"
      tag="section"
      :title="$t('pages.films.gallery')"
    >
      <v-expansion-panel-text>
        <slot name="gallery-viewer" />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel
      id="rating"
      tag="section"
      value="rating"
      :title="$t('pages.films.comments')"
    >
      <v-expansion-panel-text>
        <slot name="rating" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import ErrorPlaceHolder from "../Containment/Img/ErrorPlaceHolder.vue";

const accordion = ref<string[]>([]);
const props = defineProps<{
  film: IFilm | null;
}>();

const starring = computed((): Detail[] => {
  return props.film
    ? props.film.actorsData?.map((person: FilmPerson): Detail => {
        return {
          title: "",
          value: person?.name || "",
          to: "/persons/" + person?.slug || "",
          avatar: person.avatar || "",
        };
      })
    : [];
});

const team = computed((): Detail[] => {
  const teamMembersTitles = [
    "forms.film.director",
    "forms.film.writer",
    "forms.film.producer",
    "forms.film.composer",
    "forms.film.actors",
  ];
  return props.film
    ? props.film.teamData?.map((person: FilmPerson, index: number): Detail => {
        return {
          title: teamMembersTitles[index],
          value: person?.name || "",
          to: "/persons/" + person?.slug || "",
          avatar: person.avatar || "",
        };
      })
    : [];
});
</script>

<style></style>
