<template>
  <v-list nav>
    <div>
      <v-card
        v-if="person?.actedInFilms?.length"
        :title="t('pages.persons.featuredInFilms')"
        prepend-icon="mdi-format-list-bulleted"
        variant="elevated"
      >
        <v-divider />

        <v-table hover>
          <thead class="text-primary glassed">
            <tr>
              <th style="width: 20%">
                {{ $t("pages.films.release_year") }}
              </th>
              <th>
                {{ $t("pages.films.name") }}
              </th>
              <!-- <th>
                  {{ $t("pages.persons.role") }}
                </th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="film in person?.actedInFilms" :key="film.id">
              <td>{{ film.releaseYear || $t("general.no_data") }}</td>
              <td>
                <nuxt-link :to="`/films/${film.id}`" class="text-accent">
                  {{ film.name }}</nuxt-link
                >
              </td>
              <!-- <td>
                  {{
                    film.roleNames ? film.roleNames.join(", ") : $t("general.no_data")
                  }}
                </td> -->
            </tr>
          </tbody>
        </v-table>
      </v-card>
      <v-empty-state
        v-else-if="!person?.specialtyIds.includes(1)"
        :title="$t('empty_states.filmography')"
        icon="mdi-note-off"
        :action-text="$t('empty_states.actions.to_films')"
        @click:action="navigateTo('/films')"
      />
    </div>
    <div>
      <v-card
        v-if="person?.directedFilms?.length"
        :title="t('pages.persons.directedFilms')"
        prepend-icon="mdi-format-list-bulleted"
        variant="elevated"
      >
        <v-divider />

        <v-table hover>
          <thead class="text-primary glassed">
            <tr>
              <th style="width: 20%">
                {{ $t("pages.films.release_year") }}
              </th>
              <th>
                {{ $t("pages.films.name") }}
              </th>
              <!-- <th>
                  {{ $t("pages.persons.role") }}
                </th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="film in person?.directedFilms" :key="film.id">
              <td>{{ film.releaseYear || $t("general.no_data") }}</td>
              <td>
                <nuxt-link :to="`/films/${film.id}`" class="text-accent">
                  {{ film.name }}</nuxt-link
                >
              </td>
              <!-- <td>
                  {{
                    film.roleNames ? film.roleNames.join(", ") : $t("general.no_data")
                  }}
                </td> -->
            </tr>
          </tbody>
        </v-table>
      </v-card>
      <v-empty-state
        v-else-if="!person?.specialtyIds.includes(1)"
        :title="$t('empty_states.filmography')"
        icon="mdi-note-off"
        :action-text="$t('empty_states.actions.to_films')"
        @click:action="navigateTo('/films')"
      />
    </div>
  </v-list>
</template>

<script lang="ts" setup>
defineProps<{
  person?: IPerson | null;
}>();

const { t } = useI18n();
</script>

<style></style>
