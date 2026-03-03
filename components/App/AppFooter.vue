<template>
    <v-footer class="d-flex flex-column flex-center w-100 pa-2 text-caption text-gray" elevation="2" app>
        <span>{{ $t("copyright", { year: currentYear }) }}</span>
        <span> {{ $t("developed_by") }}</span>
    </v-footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>

<style>

</style>