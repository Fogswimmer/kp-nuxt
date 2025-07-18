<template>
    <v-sheet
        :height="$vuetify.display.smAndDown ? 220 : 300"
        :class="theme.current.value.dark ? 'dark-glassed' : 'light-glassed'"
        :border="false"
    >
        <div class="d-flex justify-center">
            <div class="position-absolute text-center" style="top: -50%">
                <div class="position-relative">
                    <div
                        :style="`width: ${$vuetify.display.smAndDown ? 200 : 300}px; height: ${$vuetify.display.smAndDown ? 200 : 300}px;`"
                        class="position-relative mx-auto"
                    >
                        <v-avatar
                            :size="$vuetify.display.smAndDown ? 200 : 300"
                            border
                            class="cursor-pointer"
                            @click="handleShowFullScreenView"
                        >
                            <v-img :src="avatar || ''" cover>
                                <template #placeholder>
                                    <v-sheet height="100%">
                                        <div
                                            class="fill-height d-flex align-center justify-center"
                                        >
                                            <v-progress-circular
                                                v-if="loading"
                                                indeterminate
                                            />

                                            <v-icon v-else size="x-large">
                                                mdi-account
                                            </v-icon>
                                        </div>
                                    </v-sheet>
                                </template>
                                <template #error>
                                    <ErrorPlaceHolder />
                                </template>
                            </v-img>
                        </v-avatar>
                    </div>
                </div>
                <template v-if="!loading">
                    <div
                        class="d-flex flex-column ga-2 justify-center align-center"
                    >
                        <span
                            class="text-h5 text-lg-h4 font-weight-bold text-primary text-center"
                        >
                            {{ title }}</span
                        >
                        <div class="text-body-1 text-lg-h6">
                            {{
                                generalInfo
                                    ?.map((item: Detail) => item.value)
                                    .join(', ')
                            }}
                        </div>
                        <div class="d-flex ga-1">
                            <v-chip-group>
                                <v-chip
                                    v-for="(item, i) in subtitle"
                                    :key="i"
                                    class="text-caption text-lg-body-1"
                                >
                                    {{ item }}
                                </v-chip>
                            </v-chip-group>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <v-skeleton-loader
                        class="stained-glass"
                        type="list-item-three-line"
                    />
                </template>
            </div>
        </div>
        <GalleryFullscreenViewer
            v-model:show-gallery="showFullScrenView"
            v-model:active-img-index="active"
            :gallery-content="gallery || []"
            :name="title"
            with-avatar
            @close="showFullScrenView = false"
            @avatar:set="$emit('avatar:set', $event)"
            @delete:img="$emit('delete:img', $event)"
        />
    </v-sheet>
</template>

<script lang="ts" setup>
import ErrorPlaceHolder from '../../Img/ErrorPlaceHolder.vue'
import GalleryFullscreenViewer from '~/components/Gallery/GalleryFullscreenViewer.vue'

const props = defineProps<{
    title: string
    subtitle: string | string[]
    generalInfo: Detail[]
    avatar: string
    gallery: string[]
    activeImg: number
    loading: boolean
}>()

const active = ref(props.activeImg)
const theme = useTheme()
const emit = defineEmits<{
    (e: 'delete:img' | 'avatar:set', index: number): void
    (e: 'gallery:open'): void
}>()

const showFullScrenView = ref<boolean>(false)
const handleShowFullScreenView = (): void => {
    if (props.avatar) {
        showFullScrenView.value = true
    } else emit('gallery:open')
}
</script>

<style>
.info-title {
    max-width: 60%;
    word-break: break-all !important;
}
</style>
