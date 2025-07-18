<template>
    <v-card
        border
        class="ma-4"
        :loading="loading"
        :style="computedStyle"
        density="compact"
    >
        <v-toolbar class="pa-2" density="compact" color="transparent">
            <template #prepend>
                <div class="position-relative">
                    <v-avatar border>
                        <v-img :src="comment?.authorAvatar || ''">
                            <template #placeholder>
                                <ImgPlaceholder
                                    :loading="loading"
                                    icon="mdi-account"
                                />
                            </template>
                            <template #error>
                                <ErrorPlaceHolder />
                            </template>
                        </v-img>
                    </v-avatar>
                </div>
            </template>
            <template #append>
                <FilmRatingChip :rating="comment.rating.toString() || '0'" />
            </template>
            <template #title>
                <div class="d-flex flex-column">
                    <span
                        class="text-body-2 text-lg-text-body-1 font-weight-bold text-truncate text-secondary"
                        >{{
                            comment.authorName ? comment.authorName : '???'
                        }}</span
                    >
                    <span class="text-caption text-disabled">{{
                        dateFormatter(comment.createdAt)
                    }}</span>
                </div>
            </template>
        </v-toolbar>
        <v-divider />

        <div class="d-flex pa-2">
            <span class="mx-2 pa-2"> {{ comment.comment }}</span>
            <v-spacer />
            <v-btn
                v-if="isAdmin || userId === comment.authorId"
                size="x-small"
                variant="tonal"
                icon="mdi-delete"
                color="error"
                @click="showDeleteConfirm = true"
            />
        </div>

        <ConfirmDialog
            v-model="showDeleteConfirm"
            :text="$t('actions.delete_assessment_warning')"
            @cancel="showDeleteConfirm = false"
            @confirm="handleConfirm(comment.id)"
        />
    </v-card>
</template>

<script lang="ts" setup>
import FilmRatingChip from '~/components/Misc/FilmRatingChip.vue'
import ErrorPlaceHolder from '~/components/Containment/Img/ErrorPlaceHolder.vue'
import ConfirmDialog from '~/components/Dialogs/ConfirmDialog.vue'
import ImgPlaceholder from '~/components/Containment/Img/ImgPlaceholder.vue'

interface Comment {
    id: number
    authorId: number
    authorName: string
    authorAvatar: string
    rating: number
    comment: string
    createdAt: string
    updatedAt: string
}
const props = defineProps<{
    loading: boolean
    index: number
    comment: Comment
    isAdmin: boolean
    isAuthenticated: boolean
    userId?: number
    color?: string
}>()

const emits = defineEmits<{
    (event: 'confirm:delete', id: number): void
}>()
const showDeleteConfirm = ref<boolean>(false)

const handleConfirm = (id: number) => {
    showDeleteConfirm.value = false
    emits('confirm:delete', id)
}
const theme = useTheme()
const computedStyle = computed(() => {
    return theme.current.value.dark
        ? `background-image: linear-gradient(145deg , ${props.color} 0%, transparent 80%)`
        : ''
})
</script>

<style></style>
