<template>
    <v-alert closable type="warning" variant="tonal" density="compact">
        <nuxt-link :to="$localeRoute('/auth/sign-in')">
            <span class="text-caption"> {{ $t("auth.not_auth") }}</span>
        </nuxt-link>
    </v-alert>
</template>

<script lang="ts" setup></script>

<style></style>
