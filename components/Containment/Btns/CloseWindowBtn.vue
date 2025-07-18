<template>
    <v-btn prepend-icon="mdi-close" @click="closeWindow">
        {{ $t('actions.close_window') }}
    </v-btn>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const closeWindow = () => {
    if (confirm(t('actions.close_window'))) {
        close()
    }
}
</script>

<style></style>
