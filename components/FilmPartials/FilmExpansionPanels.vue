<template>
    <v-expansion-panels v-model="accordion" variant="accordion" multiple>
        <v-expansion-panel
            v-if="$vuetify.display.smAndDown"
            id="general-info"
            :title="$t('pages.general_info')"
            tag="section"
            value="general-info"
        >
            <v-expansion-panel-text>
                <slot name="general-info" />
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel
            v-if="$vuetify.display.smAndDown"
            id="rating"
            :title="$t('pages.films.rating')"
            tag="section"
            value="general-rating"
        >
            <v-expansion-panel-text>
                <slot name="rating" />
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
            id="starring"
            :title="$t('pages.films.starring')"
            value="starring"
            tag="section"
        >
            <v-expansion-panel-text>
                <v-list rounded="lg" border>
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
                                        <v-icon size="x-small"
                                            >mdi-account</v-icon
                                        >
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
        <v-expansion-panel
            id="team"
            value="team"
            :title="$t('pages.films.team')"
            tag="section"
        >
            <v-expansion-panel-text>
                <v-list rounded="lg" border>
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
                                        <v-icon size="x-small"
                                            >mdi-account</v-icon
                                        >
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
            id="comments"
            tag="section"
            value="comments"
            :title="$t('pages.films.comments')"
        >
            <v-expansion-panel-text>
                <slot name="comments" />
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script lang="ts" setup>
import ErrorPlaceHolder from "../Containment/Img/ErrorPlaceHolder.vue";

defineEmits<{
    (e: "description:change", value: boolean): void;
}>();
const display = useDisplay();
const props = defineProps<{
    film: IFilm | null;
    isDescriptionPanelOpen: boolean;
}>();
const accordion = ref<string[]>(["description"]);
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
        ? props.film.teamData?.map(
              (person: FilmPerson, index: number): Detail => {
                  return {
                      title: teamMembersTitles[index],
                      value: person?.name || "",
                      to: "/persons/" + person?.slug || "",
                      avatar: person.avatar || "",
                  };
              },
          )
        : [];
});

watch(
    () => props.isDescriptionPanelOpen,
    () => {
        if (!accordion.value.includes("description")) {
            accordion.value.push("description");
        }
    },
);

onMounted(() => {
    if (display.name.value === "xs") {
        accordion.value = [];
    }
});
</script>

<style></style>
