<template>
    <v-list variant="plain">
        <v-list-subheader>{{ $t("pages.films.starring") }}</v-list-subheader>
        <v-list-item
            v-for="(actor, index) in starring"
            :key="index"
            :title="actor.value"
            :value="index"
            :to="$localeRoute(actor.to || '/')"
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
        <v-divider></v-divider>
        <v-list-subheader>{{ $t("pages.films.team") }}</v-list-subheader>
        <v-list variant="plain">
            <v-list-item
                v-for="(person, index) in team"
                :key="index"
                rounded="lg"
                :subtitle="$t(person.title)"
                :title="person.value"
                :value="index"
                :to="$localeRoute(person.to || '/')"
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
    </v-list>
</template>

<script lang="ts" setup>
import ErrorPlaceHolder from "../Containment/Img/ErrorPlaceHolder.vue";

defineProps<{
    starring: Detail[];
    team: Detail[];
}>();
</script>

<style></style>
