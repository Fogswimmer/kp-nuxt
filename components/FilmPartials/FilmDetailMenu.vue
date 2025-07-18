<template>
    <div class="d-flex ga-1 align-center">
        <template v-if="$vuetify.display.smAndDown">
            <v-menu location="bottom end">
                <template #activator="{ props }">
                    <v-btn icon :disabled="!isAuthenticated" v-bind="props">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-subheader>
                        {{ $t('actions.edit') }}:
                    </v-list-subheader>
                    <v-list-item
                        :title="$t('pages.general_info')"
                        prepend-icon="mdi-information"
                        value="info"
                        @click="$emit('edit:general')"
                    />
                    <v-list-item
                        :title="$t('pages.detailed_info')"
                        prepend-icon="mdi-details"
                        value="details"
                        @click="$emit('edit:description')"
                    />
                    <v-list-item
                        :title="$t('pages.gallery')"
                        prepend-icon="mdi-view-gallery"
                        value="gallery"
                        @click="$emit('edit:gallery')"
                    />
                    <v-divider />
                    <v-list-item
                        :title="$t('actions.remove')"
                        prepend-icon="mdi-delete"
                        value="remove"
                        base-color="error"
                        @click="$emit('delete:film')"
                    />
                </v-list>
            </v-menu>
        </template>
        <template v-else>
            <v-menu>
                <template #activator="{ props }">
                    <v-btn
                        v-bind="props"
                        :disabled="!isAuthenticated"
                        prepend-icon="mdi-pencil"
                    >
                        {{ $t('actions.edit') }}
                    </v-btn>
                </template>
                <v-list density="compact">
                    <v-list-item
                        :title="$t('pages.general_info')"
                        prepend-icon="mdi-information"
                        value="info"
                        @click="$emit('edit:general')"
                    />
                    <v-list-item
                        :title="$t('pages.detailed_info')"
                        prepend-icon="mdi-details"
                        value="details"
                        @click="$emit('edit:description')"
                    />
                    <v-list-item
                        :title="$t('pages.gallery')"
                        prepend-icon="mdi-view-gallery"
                        value="gallery"
                        @click="$emit('edit:gallery')"
                    />
                </v-list>
            </v-menu>
            <v-btn
                :disabled="!isAuthenticated"
                prepend-icon="mdi-delete"
                base-color="error"
                @click="$emit('delete:film')"
            >
                {{ $t('actions.remove') }}
            </v-btn>
        </template>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    isAuthenticated: boolean
}>()
defineEmits<{
    (
        event:
            | 'edit:general'
            | 'edit:description'
            | 'edit:gallery'
            | 'delete:film'
    ): void
}>()
</script>

<style></style>
