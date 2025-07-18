<template>
    <v-list>
        <v-list-item v-for="(film, i) in films" :key="i">
            <v-list-item-title>
                {{ getName(film?.name || '', film?.internationalName || '') }}
            </v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script lang="ts" setup>
defineProps<{
    films: IFilm[]
}>()

const getName = useInternationalName()
</script>

<style></style>
