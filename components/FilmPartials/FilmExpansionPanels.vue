<template>
  <GradientWrapper>
    <v-expansion-panels
      v-model="accordion"
      variant="accordion"
      bg-color="transparent"
      border
    >
    <v-expansion-panel
        id="rating"
        tag="section"
        value="rating"
        class="content-item"
        :title="$t('pages.films.rating')"
      >
        <v-expansion-panel-text>
          <div class="d-flex flex-column justify-center ga-1">
            <slot name="rating" />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel :title="$t('pages.general_info')" value="info">
        <v-expansion-panel-text>
          <v-list rounded="lg" nav border>
            <div v-for="(detail, index) in generalInfo" :key="index">
              <v-list-item
                :key="index"
                :subtitle="$t(detail.title)"
                :prepend-icon="detail.icon"
                class="my-2"
              >
                <v-list-item-title :class="{ 'text-secondary': detail.to }">
                  {{ detail.value || $t("general.no_data") }}
                </v-list-item-title>
              </v-list-item>
              <v-tooltip
                v-if="
                  typeof detail.value === 'string' && detail.value.length > 50
                "
                activator="parent"
              >
                <span> {{ detail.value }}</span>
              </v-tooltip>
            </div>
          </v-list>
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

      <v-expansion-panel :title="$t('pages.films.starring')" value="starring">
        <v-expansion-panel-text>
          <v-list rounded="lg" nav border>
            <v-list-item
              v-for="(actor, index) in starring"
              :key="index"
              :title="actor.value"
              :value="index"
              :to="localeRoute(actor.to || '/')"
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
              :to="localeRoute(person.to || '/')"
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
        class="content-item"
        value="description"
      >
        <v-expansion-panel-text>
          <slot name="description" />
        </v-expansion-panel-text>
      </v-expansion-panel>
      
      <v-expansion-panel
        id="comments"
        tag="section"
        value="comments"
        class="content-item"
        :title="$t('pages.films.comments')"
      >
        <v-expansion-panel-text>
          <div class="d-flex flex-column justify-center ga-1">
            <slot name="comments" />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </GradientWrapper>
</template>

<script lang="ts" setup>
import ErrorPlaceHolder from "../Containment/Img/ErrorPlaceHolder.vue";
import GradientWrapper from "~/components/Containment/Cards/GradientWrapper.vue";

const localeRoute = useLocaleRoute();
const accordion = ref<string[]>(["rating"]);
const props = defineProps<{
  film: IFilm | null;
}>();

const generalInfo = computed((): Detail[] => {
  const info = [
    {
      title: "forms.film.name",
      value: props.film?.name || "",
      icon: "mdi-movie",
      tooltip: props.film && props.film.name?.length > 60 ? true : false,
    },
    {
      title: "forms.film.slogan",
      value: props.film?.slogan || "",
      icon: "mdi-format-title",
      tooltip:
        props.film?.slogan && props.film.slogan?.length > 60 ? true : false,
    },
    {
      title: "forms.film.duration",
      value: props.film?.duration || "",
      icon: "mdi-timer",
    },
    {
      title: "forms.film.genres",
      value: props.film?.genreNames ? props.film?.genreNames.join(", ") : "",
      icon: "mdi-filmstrip",
      tooltip:
        props.film?.genreNames && props.film?.genreNames.join(", ").length > 120
          ? true
          : false,
    },
    {
      title: "forms.film.age",
      value: props.film?.age + "+" || "",
      icon: "mdi-account-supervisor",
    },
  ];

  return info as Detail[];
});

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
