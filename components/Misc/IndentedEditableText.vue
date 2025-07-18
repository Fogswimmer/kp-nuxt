<template>
    <v-card rounded="lg" class="pa-2" variant="text" min-height="50">
        <div
            v-if="!editMode"
            :class="['text-body-1 pa-2', { 'text-body-2': compact }]"
        >
            <div v-if="text">
                <p
                    v-for="(paragraph, i) in formattedText"
                    :key="i"
                    v-intersect="useIntersection(i, visibleParagraphs)"
                    :class="[
                        'paragraph my-4',
                        { 'fade-in': visibleParagraphs.has(i) },
                    ]"
                >
                    {{ paragraph }}
                </p>
                <ExpandBtn
                    v-if="text.length > 100 && text.split('\n').length > 1"
                    :expanded="!isTruncated"
                    @toggle:expanded="isTruncated = !isTruncated"
                />
            </div>
            <v-skeleton-loader v-else type="text" />
        </div>
        <v-confirm-edit
            v-else
            v-model="editModeText"
            @save="$emit('sumbit:edit', editModeText)"
        >
            <template #default="{ model: proxyModel, actions }">
                <v-card variant="outlined">
                    <template #text>
                        <v-textarea
                            v-model="proxyModel.value"
                            :messages="messages || ''"
                            auto-grow
                            rows="5"
                        />
                    </template>
                    <template #actions>
                        <v-spacer />
                        <component :is="actions" />
                    </template>
                </v-card>
            </template>
        </v-confirm-edit>
        <v-card-actions v-if="editMode">
            <v-btn
                block
                prepend-icon="mdi-close"
                color="warning"
                size="small"
                @click="$emit('cancel:edit')"
            >
                {{ $t('actions.stop_edit') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import ExpandBtn from '../Containment/Btns/ExpandBtn.vue'

const props = defineProps<{
    editMode: boolean
    text: string
    messages?: string
    compact?: boolean
}>()

defineEmits<{
    (e: 'sumbit:edit', value: string): void
    (e: 'cancel:edit'): void
}>()

const editModeText = ref<string>(props.text)
const visibleParagraphs = ref(new Set<number>())
const isTruncated = ref<boolean>(props.text.length > 100)
const formattedText = computed(() => {
    return props.text
        ? props.text
              .trim()
              .split('\n')
              .map((p) => p.replace(/[\u200B\r\t\xA0]/g, '').trim())
              .filter((p) => p.length > 0)
              .slice(0, isTruncated.value ? 1 : undefined)
        : []
})
</script>

<style sroped>
.paragraph {
    opacity: 0;
    transition: opacity 0.6s ease-out;
}
.paragraph.fade-in {
    opacity: 1;
}
</style>
