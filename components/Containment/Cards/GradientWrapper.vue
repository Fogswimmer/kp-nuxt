<template>
    <Client-Only>
        <div
            :style="`background-image: linear-gradient(to left bottom, transparent 10%, ${bgAccentColor});`"
            class="fill-height rounded-lg"
        >
            <slot />
        </div>
    </Client-Only>
</template>

<script lang="ts" setup>
const bgAccentColor = useBgAccentColor();
</script>

<style></style>
