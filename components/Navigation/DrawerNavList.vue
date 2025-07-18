<template>
    <v-list>
        <v-list-item
            :active="computedActiveNavBtn.home"
            prepend-icon="mdi-home"
            :to="$localeRoute('/')"
            :title="$t('nav.home')"
        />

        <v-list-item
            :active="computedActiveNavBtn.films"
            prepend-icon="mdi-filmstrip"
            :title="$t('nav.films_list')"
            :to="$localeRoute('/films')"
        />

        <v-list-item
            prepend-icon="mdi-account-multiple"
            :title="$t('nav.persons_list')"
            :to="$localeRoute('/persons')"
        />

        <v-list-item
            prepend-icon="mdi-information"
            :to="$localeRoute('/about')"
            :active="computedActiveNavBtn.about"
            :title="$t('general.about')"
        />
    </v-list>
</template>

<script lang="ts" setup>
const computedActiveNavBtn = computed((): { [key: string]: boolean } => {
    const route = useRoute()
    const routeName = (route.name as string) || ''
    return {
        home: routeName.startsWith('home'),
        films: routeName.startsWith('film') || routeName.startsWith('newFilm'),
        persons:
            routeName.startsWith('person') || routeName.startsWith('newPerson'),
        about: routeName.startsWith('about'),
    }
})
</script>

<style></style>
