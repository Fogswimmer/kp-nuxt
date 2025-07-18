<template>
    <v-menu>
        <template #activator="{ props }">
            <v-btn v-bind="props" icon variant="text">
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </template>
        <v-list nav>
            <LocaleHandleSelect />
            <ToggleThemeSelect
                :active-theme="activeTheme"
                @update:active-theme="$emit('update:activeTheme', $event)"
            />
        </v-list>
    </v-menu>
</template>

<script setup lang="ts">
import LocaleHandleSelect from './LocaleHandleSelect.vue'
import ToggleThemeSelect from './ToggleThemeSelect.vue'

defineProps<{
    activeTheme: string
}>()
defineEmits<{
    (e: 'update:activeTheme', value: string): void
}>()
</script>
