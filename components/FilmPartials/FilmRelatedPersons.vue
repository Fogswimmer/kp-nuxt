<template>
    <v-card variant="text" class="mt-2">
        <v-card-title>{{ $t('pages.films.related_persons') }}</v-card-title>
        <v-list variant="plain">
            <v-list-subheader>
                {{ $t('pages.films.starring') }}
            </v-list-subheader>
            <v-list-item
                v-for="(actor, index) in starring"
                :key="`starring-${actor?.id || 'unknown'}-${index}`"
                :title="actor.value"
                :value="index"
                :to="$localeRoute(actor.to || '/')"
            >
                <template #prepend>
                    <v-avatar>
                        <v-img v-if="actor.avatar" :src="actor.avatar">
                            <template #placeholder>
                                <v-icon size="x-small"> mdi-account </v-icon>
                            </template>
                            <template #error>
                                <ErrorPlaceHolder />
                            </template>
                        </v-img>
                        <v-icon v-else icon="mdi-account" />
                    </v-avatar>
                </template>
            </v-list-item>
            <v-divider />
            <v-list-subheader>{{ $t('pages.films.team') }}</v-list-subheader>
            <v-list-item
                v-for="(person, index) in team"
                :key="`team-${person?.id || 'unknown'}-${index}`"
                :subtitle="$t(person.title)"
                :title="person.value"
                :value="index"
                :to="$localeRoute(person.to || '/')"
            >
                <template #prepend>
                    <v-avatar>
                        <v-img :src="person.avatar">
                            <template #placeholder>
                                <v-icon size="x-small"> mdi-account </v-icon>
                            </template>
                            <template #error>
                                <ErrorPlaceHolder />
                            </template>
                        </v-img>
                    </v-avatar>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script lang="ts" setup>
import ErrorPlaceHolder from '../Containment/Img/ErrorPlaceHolder.vue'

defineProps<{
    starring: Detail[]
    team: Detail[]
}>()
</script>

<style></style>
