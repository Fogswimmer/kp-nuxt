<template>
    <v-list-item
        v-for="(detail, index) in generalInfo"
        :key="index"
        :subtitle="$t(detail.title)"
        :prepend-icon="detail.icon"
        class="my-4"
    >
        <v-list-item-title :class="{ 'text-secondary': detail.to }">
            {{ detail.value || $t("general.no_data") }}
        </v-list-item-title>
    </v-list-item>
</template>

<script lang="ts" setup>
defineProps<{
    generalInfo: Detail[];
}>();
</script>

<style></style>
