<template>
    <v-dialog :model-value="showGallery" fullscreen>
        <v-sheet>
            <v-toolbar>
                <v-toolbar-title>
                    {{ name }}:
                    <span class="text-lowercase">{{
                        $t("pages.films.gallery")
                    }}</span>
                </v-toolbar-title>
                <template v-if="$vuetify.display.smAndDown">
                    <v-menu>
                        <template #activator="{ props }">
                            <v-btn
                                v-bind="props"
                                icon
                                :disabled="!isAuthenticated"
                            >
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                                v-if="withAvatar"
                                :disabled="computedDisabledBtn"
                                :title="$t('actions.set_avatar')"
                                prepend-icon="mdi-account"
                                @click="handleChangeAvatar"
                            />
                            <v-list-item
                                v-else
                                :disabled="computedDisabledBtn"
                                :title="$t('actions.set_poster')"
                                prepend-icon="mdi-post"
                                @click="handleChangePoster"
                            />
                            <v-list-item
                                :title="$t('actions.remove')"
                                base-color="error"
                                prepend-icon="mdi-delete"
                                @click="showConfirmDialog = true"
                            />
                        </v-list>
                    </v-menu>
                </template>
                <template v-else>
                    <v-btn
                        v-if="withAvatar"
                        :disabled="computedDisabledBtn"
                        prepend-icon="mdi-account"
                        @click="handleChangeAvatar"
                        >{{ $t("actions.set_avatar") }}</v-btn
                    >
                    <v-btn
                        v-else
                        :disabled="computedDisabledBtn"
                        prepend-icon="mdi-post"
                        @click="handleChangePoster"
                    >
                        {{ $t("actions.set_poster") }}
                    </v-btn>
                    <v-btn
                        :disabled="!isAuthenticated"
                        color="error"
                        prepend-icon="mdi-delete"
                        @click="showConfirmDialog = true"
                        >{{ $t("actions.remove") }}</v-btn
                    >
                </template>
                <CloseBtn @click="$emit('close')" />
            </v-toolbar>
            <v-card-text>
                <v-carousel
                    v-model="activeImg"
                    touch
                    hide-delimiter-background
                    :show-arrows="galleryContent.length > 1"
                    progress="primary"
                    height="calc(100vh - 100px)"
                    @update:model-value="handleUpdateCarouselOpenImgIndex"
                >
                    <v-carousel-item
                        v-for="(item, i) in galleryContent"
                        :key="i"
                        :value="item"
                        :src="item"
                    >
                        <template #error>
                            <ErrorPlaceHolder />
                        </template>
                        <template #placeholder>
                            <ImgPlaceholder />
                        </template>
                    </v-carousel-item>
                </v-carousel>
            </v-card-text>
        </v-sheet>
        <ConfirmDialog
            v-model="showConfirmDialog"
            :text="$t('general.img_delete_warning')"
            @cancel="showConfirmDialog = false"
            @confirm="handleConfirmDeletion"
        />
    </v-dialog>
</template>

<script lang="ts" setup>
import CloseBtn from "../Containment/Btns/CloseBtn.vue";
import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
import ErrorPlaceHolder from "../Containment/Img/ErrorPlaceHolder.vue";
import ImgPlaceholder from "../Containment/Img/ImgPlaceholder.vue";
import { useAuthStore } from "~/stores/authStore";

const emits = defineEmits<{
    (event: "close"): void;
    (event: "delete:img" | "poster:set" | "avatar:set", index: number): void;
}>();
const props = defineProps<{
    showGallery: boolean;
    galleryContent: string[];
    name?: string;
    activeImgIndex: number;
    withAvatar: boolean;
}>();

const { isAuthenticated } = storeToRefs(useAuthStore());

const showConfirmDialog = ref<boolean>(false);
const activeImg = ref<string>("");
const openImgIndex = ref<number>(props.activeImgIndex);

const computedDisabledBtn = computed((): boolean => {
    return !isAuthenticated.value
});

const handleUpdateCarouselOpenImgIndex = (value: string): void => {
    openImgIndex.value = props.galleryContent.indexOf(value);
};

const handleConfirmDeletion = () => {
    emits("delete:img", openImgIndex.value);
    showConfirmDialog.value = false;
    emits("close");
};

const handleChangeAvatar = () => {
    emits("avatar:set", openImgIndex.value);
    emits("close");
};

const handleChangePoster = () => {
    emits("poster:set", openImgIndex.value);
    emits("close");
};

onMounted(() => {
    activeImg.value = props.galleryContent[props.activeImgIndex];
})
</script>

<style></style>
