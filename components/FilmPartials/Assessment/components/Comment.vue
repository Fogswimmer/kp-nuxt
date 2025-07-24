<template>
    <v-toolbar
        class="pa-2"
        density="compact"
        color="transparent"
        extended
        rounded="lg"
    >
        <template #image>
            <v-img :gradient="`to bottom left, rgba(0,0,0,0), ${color}`" />
        </template>
        <template #prepend>
            <v-avatar>
                <v-img :src="comment?.authorAvatar || ''">
                    <template #placeholder>
                        <ImgPlaceholder :loading="loading" icon="mdi-account" />
                    </template>
                    <template #error>
                        <ErrorPlaceHolder />
                    </template>
                </v-img>
            </v-avatar>
        </template>
        <template #append>
            <FilmRatingChip :rating="comment.rating.toString() || '0'" />
        </template>
        <template #title>
            <div class="d-flex flex-column">
                <span
                    class="text-body-2 text-lg-body-1 text-primary font-weight-bold text-truncate comment-title"
                    >{{ comment.authorName ? comment.authorName : '???' }}</span
                >
                <span class="text-caption text-disabled">{{
                    dateFormatter(comment.createdAt)
                }}</span>
            </div>
            <v-divider />
        </template>
        <template #extension>
            <span
                :class="[
                    'pa-2 text-caption text-lg-body-2',
                    { 'text-white': theme.current.value.dark },
                    { 'text-black': !theme.current.value.dark },
                ]"
            >
                {{ comment.comment }}</span
            >
            <v-spacer />
            <v-btn
                v-if="isAdmin || userId === comment.authorId"
                size="x-small"
                variant="tonal"
                icon="mdi-delete"
                color="error"
                @click="showDeleteConfirm = true"
            />
        </template>
    </v-toolbar>

    <ConfirmDialog
        v-model="showDeleteConfirm"
        :text="$t('actions.delete_assessment_warning')"
        @cancel="showDeleteConfirm = false"
        @confirm="handleConfirm(comment.id)"
    />
</template>

<script lang="ts" setup>
import FilmRatingChip from '~/components/Misc/FilmRatingChip.vue'
import ErrorPlaceHolder from '~/components/Containment/Img/ErrorPlaceHolder.vue'
import ConfirmDialog from '~/components/Dialogs/ConfirmDialog.vue'
import ImgPlaceholder from '~/components/Containment/Img/ImgPlaceholder.vue'

const theme = useTheme()

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
defineProps<{
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
</script>

<style>
.comment-title {
    line-height: 1.2;
}
</style>
