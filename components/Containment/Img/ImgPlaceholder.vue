<template>
    <v-sheet height="100%">
        <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular v-if="loading" indeterminate />
            <v-icon v-else-if="icon">{{ icon || "mdi-image-off" }}</v-icon>
        </div>
    </v-sheet>
</template>

<script lang="ts" setup>
defineProps<{ loading?: boolean; icon?: string }>();
</script>

<style></style>
