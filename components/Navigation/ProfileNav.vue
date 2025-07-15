<template>
    <div v-if="!bottom" class="flex-grow-1">
        <v-btn
            v-if="!isAuthenticated && $vuetify.display.mdAndUp"
            :active="$route.name === 'signIn'"
            prepend-icon="mdi-login"
            variant="tonal"
            block
            :to="$localeRoute('/auth/sign-in')"
        >
            {{ $t("auth.sign_in") }}
        </v-btn>
        <v-menu v-else v-model="showMenu" location="bottom center">
            <template #activator="{ props }">
                <v-card variant="text" max-width="200">
                    <v-list-item
                        v-if="$vuetify.display.mdAndUp"
                        v-bind="props"
                        density="compact"
                        lines="one"
                        :title="
                            currentUser?.displayName ||
                            currentUser?.username ||
                            ''
                        "
                        :subtitle="currentUser?.email || ''"
                    >
                        <template #prepend>
                            <v-avatar v-if="isAuthenticated">
                                <v-img
                                    v-if="currentUser?.avatar"
                                    :src="currentUser?.avatar || ''"
                                >
                                    <template #error>
                                        <v-avatar border>
                                            <v-icon color="error" size="x-small"
                                                >mdi-image-broken</v-icon
                                            >
                                        </v-avatar>
                                    </template>
                                    <template #placeholder>
                                        <ImgPlaceholder />
                                    </template>
                                </v-img>
                                <v-icon v-else> mdi-account</v-icon>
                            </v-avatar>
                        </template>
                    </v-list-item>
                    <v-avatar
                        v-else-if="!bottom"
                        v-bind="props"
                        class="cursor-pointer"
                        border
                    >
                        <v-img
                            v-if="currentUser?.avatar"
                            :src="currentUser?.avatar || ''"
                        >
                            <template #error>
                                <v-avatar border>
                                    <v-icon color="error" size="x-small"
                                        >mdi-image-broken</v-icon
                                    >
                                </v-avatar>
                            </template>
                        </v-img>

                        <v-icon
                            v-else
                            :color="
                                $route.name &&
                                $route.name.toString().startsWith('signIn')
                                    ? 'primary'
                                    : ''
                            "
                        >
                            mdi-account</v-icon
                        >
                    </v-avatar>
                </v-card>
            </template>

            <ProfileCard
                v-if="isAuthenticated && currentUser"
                :current-user="currentUser"
                :is-admin="isAdmin"
                :loading="loading"
                @edit="handleEdit"
                @logout="showConfirmDialog = true"
                @avatar:edit="showAvatarUploadDialog = true"
                @close="showMenu = false"
            />
        </v-menu>
    </div>
    <v-menu v-else v-model="showMenu">
        <template #activator="{ props }">
            <v-btn
                v-bind="props"
                icon="mdi-account"
                value="profile"
                density="compact"
                :to="
                    !isAuthenticated && !currentUser
                        ? $localeRoute('/auth/sign-in')
                        : ''
                "
            />
        </template>
        <ProfileCard
            v-if="isAuthenticated && currentUser"
            :current-user="currentUser"
            :is-admin="isAdmin"
            :loading="loading"
            @edit="handleEdit"
            @logout="showConfirmDialog = true"
            @avatar:edit="showAvatarUploadDialog = true"
            @close="showMenu = false"
        />
    </v-menu>
    <ConfirmDialog
        v-model="showAvatarWarning"
        :text="$t('general.img_replacement_warning')"
        @cancel="showAvatarWarning = false"
        @confirm="replaceAvatar"
    />
    <ConfirmDialog
        v-model="showConfirmDialog"
        :loading="loading"
        :text="$t('auth.logout_confirm')"
        @cancel="showConfirmDialog = false"
        @confirm="handleSignOut"
    />
    <BaseDialog
        v-model:opened="editMode"
        :loading="loading"
        :title="$t('pages.profile.edit')"
        @close="editMode = false"
    >
        <template #text>
            <v-card>
                <v-card-text>
                    <UserForm
                        :user-form="userForm"
                        :is-new="false"
                        :loading="loading"
                        @update:model-value="userForm = $event"
                        @form:submit="submitEdit"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        prepend-icon="mdi-check"
                        color="primary"
                        @click="submitEdit"
                        >{{ $t("actions.submit") }}</v-btn
                    >
                </v-card-actions>
            </v-card>
        </template>
    </BaseDialog>
    <BaseDialog
        v-model:opened="showAvatarUploadDialog"
        :title="
            currentUser?.avatar
                ? $t('pages.profile.change_avatar')
                : $t('pages.profile.upload_avatar')
        "
        :loading="loading"
        @close="showAvatarUploadDialog = false"
    >
        >
        <template #text>
            <GalleryUploader
                :upload-count="1"
                :upload-error="false"
                @files:upload="handleUploadAvatar"
            />
        </template>
    </BaseDialog>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";
import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
import ProfileCard from "../Containment/Cards/ProfileCard.vue";
import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
import GalleryUploader from "~/components/Gallery/GalleryUploader.vue";
import UserForm from "~/components/Forms/Auth/UserForm.vue";
import ImgPlaceholder from "../Containment/Img/ImgPlaceholder.vue";

defineProps<{
    bottom?: boolean;
}>();

const { currentUser, isAuthenticated, token, loading, isAdmin, userForm } =
    storeToRefs(useAuthStore());
const { signOut, fetchCurrentUser, uploadAvatar, editUser } = useAuthStore();

const showConfirmDialog = ref<boolean>(false);
const showMenu = ref<boolean>(false);
const handleSignOut = async (): Promise<void> => {
    await signOut();
    showConfirmDialog.value = false;
};

const { locale } = useI18n();

const avatarFile = ref<File>();
const editMode = ref<boolean>(false);
const showAvatarWarning = ref<boolean>(false);
const showAvatarUploadDialog = ref<boolean>(false);

const showAvatarReplacementWarning = (file: File): void => {
    showAvatarWarning.value = true;
    avatarFile.value = file;
};

const handleUploadAvatar = async (files: File[]): Promise<void> => {
    const file = files[0];
    const id = Number(currentUser.value?.id);
    if (file) {
        if (!currentUser.value?.avatar) {
            await uploadAvatar(file, id || 0);
        } else {
            showAvatarReplacementWarning(file);
        }
    }
    showAvatarUploadDialog.value = false;
    await fetchCurrentUser(locale.value);
};

const replaceAvatar = async () => {
    const id = Number(currentUser.value?.id);
    await uploadAvatar(avatarFile.value as File, id || 0);
    await fetchCurrentUser(locale.value);
    showAvatarWarning.value = false;
};

const submitEdit = async () => {
    await editUser();
    editMode.value = false;
};

const handleEdit = () => {
    editMode.value = true;
    userForm.value = { ...currentUser.value };
};

onMounted(async (): Promise<void> => {
    const route = useRoute();
    if (
        !isAuthenticated.value &&
        token.value &&
        !["signIn", "signUp"].includes(route.name as string)
    ) {
        await fetchCurrentUser(locale.value);
    }
});
</script>
