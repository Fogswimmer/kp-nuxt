<template>
    <div>
        <v-card>
            <v-toolbar :extended="$vuetify.display.smAndDown">
                <v-alert
                    icon="mdi-information"
                    border="start"
                    variant="tonal"
                    :color="!uploadError ? '' : 'error'"
                >
                    <div class="d-flex align-center">
                        <v-chip label>
                            <div v-if="!uploadError">
                                {{ $t("general.available_for_upload") }}:
                                {{ computedUploadCount }}
                            </div>
                            <span v-else>
                                {{ $t("general.max_files_error") }}!
                            </span>
                        </v-chip>
                        <v-spacer />
                        <v-chip
                            v-if="$vuetify.display.mdAndUp"
                            label
                            color="warning"
                            prepend-icon="mdi-alert"
                            >{{
                                $t("general.max_file_size", {
                                    size: humanFileSize(MAX_UPLOAD_SIZE),
                                })
                            }}</v-chip
                        >
                    </div>
                </v-alert>
                <template #extension v-if="$vuetify.display.smAndDown">
                    <div class="text-center w-100">
                        <v-chip
                            v-if="$vuetify.display.smAndDown"
                            label
                            color="warning"
                            prepend-icon="mdi-alert"
                            >{{
                                $t("general.max_file_size", {
                                    size: humanFileSize(MAX_UPLOAD_SIZE),
                                })
                            }}</v-chip
                        >
                    </div>
                </template>
            </v-toolbar>
            <v-file-upload
                v-model="previews"
                show-size
                chips
                clearable
                multiple
                :density="$vuetify.display.mdAndUp ? 'default' : 'comfortable'"
                :accept="acceptVideos ? 'video/*' : 'image/*'"
                divider-text="general.or"
                browse-text="general.browse_files"
                :title="$vuetify.display.mdAndUp ? 'general.drag_and_drop' : ''"
                @update:model-value="handlePreupload"
            >
                <template #item="{ props: itemProps }">
                    <v-file-upload-item v-bind="itemProps" lines="one" nav>
                        <template #clear="{ props: clearProps }">
                            <v-btn color="primary" v-bind="clearProps" />
                        </template>
                    </v-file-upload-item>
                </template>
            </v-file-upload>

            <template #actions>
                <v-spacer />
                <v-btn
                    prepend-icon="mdi-close"
                    :disabled="!previews.length"
                    :color="uploadError ? 'error' : ''"
                    @click="clearPreviews"
                    >{{ $t("actions.clear") }}</v-btn
                >
                <v-btn
                    prepend-icon="mdi-cloud"
                    color="warning"
                    :disabled="
                        !previews.length ||
                        uploadError ||
                        showMaxFileSizeNotification
                    "
                    @click="$emit('files:upload', previews)"
                    >{{ $t("actions.upload") }}</v-btn
                >
            </template>
        </v-card>
        <v-snackbar
            v-model="showMaxFileSizeNotification"
            closable
            color="error"
            @update:model-value="handleUpdateShowNotification"
        >
            {{
                $t("general.max_file_size_error", {
                    size: humanFileSize(MAX_UPLOAD_SIZE),
                })
            }}
        </v-snackbar>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
    (e: "files:preupload" | "files:upload", value: File[]): void;
}>();

const MAX_UPLOAD_SIZE = 2 * 1024 * 1024;

const showMaxFileSizeNotification = ref<boolean>(false);
const previews = ref<File[]>([]);
const props = defineProps<{
    uploadCount: number;
    acceptVideos?: boolean;
}>();

const uploadError = computed((): boolean => {
    return previews.value.length > props.uploadCount;
});

const handlePreupload = (): void => {
    if (previews.value.length > props.uploadCount) {
        return;
    }

    emit("files:preupload", previews.value);
};
const computedUploadCount = computed((): number => {
    return props.uploadCount - previews.value.length;
});

const clearPreviews = (): void => {
    previews.value = [];
};
onBeforeUnmount((): void => {
    clearPreviews();
});

const calculateTotalFilesize = (files: File[]): number => {
    return files.reduce((total, file) => total + file.size, 0);
};

const handleUpdateShowNotification = (value: boolean): void => {
    showMaxFileSizeNotification.value = value;
    previews.value = [];
};

watch(previews, (newPreviews): void => {
    if (calculateTotalFilesize(newPreviews) > MAX_UPLOAD_SIZE) {
        showMaxFileSizeNotification.value = true;
    }
});
</script>

<style></style>
