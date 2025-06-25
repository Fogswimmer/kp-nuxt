<template>
    <div>
        <ClientOnly>
                <v-navigation-drawer location="end">
                    <slot />
                </v-navigation-drawer>
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
