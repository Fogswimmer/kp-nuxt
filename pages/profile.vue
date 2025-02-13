<template>
  <div>
    <DetailCard
      display-avatar
      :title="currentUser?.displayName"
      :subtitle="computedLastLogin"
      :page-name="$t('pages.profile.title')"
      :general-info="computedGeneralInfo"
      :cover="currentUser?.cover || ''"
      :avatar="currentUser?.avatar || ''"
      :loading="loading"
      :is-auth="isAuthenticated"
    >
      <template #menu>
        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item
              :title="$t('actions.choose_cover')"
              prepend-icon="mdi-image"
              value="cover"
              @click="showCoverChooseDialog = true"
            />
            <v-list-item
              :title="$t('actions.edit_avatar')"
              prepend-icon="mdi-account"
              value="avatar"
              @click="showAvatarUploadDialog = true"
            />
            <v-list-item
              :title="$t('actions.edit')"
              prepend-icon="mdi-pencil"
              value="edit"
              @click="handleEdit"
            />
            <v-list-item
              :title="$t('auth.sign_out')"
              prepend-icon="mdi-logout"
              value="logout"
              @click="showConfirmLogoutDialog = true"
            />
          </v-list>
        </v-menu>
      </template>
    </DetailCard>

    <ConfirmDialog
      v-model="showWarning"
      :text="$t('pages.profile.avatar_replace_warning')"
      @cancel="showWarning = false"
      @confirm="replaceAvatar"
    />
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
    <BaseDialog
      v-model:opened="showCoverChooseDialog"
      :title="
        currentUser?.cover
          ? $t('pages.profile.change_cover')
          : $t('pages.profile.upload_cover')
      "
      :loading="loading"
      @close="showCoverChooseDialog = false"
    >
      >
      <template #text>
        <GalleryUploader
          :upload-count="1"
          :upload-error="false"
          @files:upload="handleUploadCover"
        />
      </template>
    </BaseDialog>
    <ConfirmDialog
      v-model="showConfirmLogoutDialog"
      :text="$t('auth.logout_confirm')"
      @cancel="showConfirmLogoutDialog = false"
      @confirm="handleSignOut"
    />
    <BaseDialog
      v-model:opened="editMode"
      :loading="loading"
      :title="$t('pages.profile.edit')"
      @close="editMode = false"
    >
      <template #text>
        <UserForm
          v-model="currentUser"
          :is-new="false"
          @avatar:edit="showAvatarUploadDialog = true"
          @cancel="editMode = false"
        />
      </template>
      ></BaseDialog
    >
  </div>
</template>

<script lang="ts" setup>
import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
import { useAuthStore } from "~/stores/authStore";
import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
import GalleryUploader from "~/components/Gallery/GalleryUploader.vue";
import UserForm from "~/components/Forms/UserForm.vue";

const { t, locale } = useI18n();
const { currentUser, loading, userForm } = storeToRefs(useAuthStore());
const showConfirmLogoutDialog = ref<boolean>(false);
const showCoverChooseDialog = ref<boolean>(false);
const showWarning = ref<boolean>(false);
const showAvatarUploadDialog = ref<boolean>(false);
const editMode = ref<boolean>(false);
const avatarFile = ref<File>();
const computedLastLogin = computed((): string => {
  const lastLogin = new Date(
    currentUser.value?.lastLogin || 0
  ).toLocaleString();
  return t("pages.profile.last_login", { time: lastLogin });
});

const {
  signOut,
  uploadAvatar,
  uploadCover,
  fetchCurrentUser,
  isAuthenticated,
} = useAuthStore();

const handleSignOut = async (): Promise<void> => {
  await signOut();
  showConfirmLogoutDialog.value = false;
  navigateTo("/");
};
const handleUploadCover = async (files: File[]) => {
  const file = files[0];
  const id = Number(currentUser.value?.id);
  if (file) {
    await uploadCover(file, id || 0);
  }
  showCoverChooseDialog.value = false;
};

const showReplacementWarning = (file: File): void => {
  showWarning.value = true;
  avatarFile.value = file;
};

const handleUploadAvatar = async (files: File[]): Promise<void> => {
  const file = files[0];
  const id = Number(currentUser.value?.id);
  if (file) {
    if (!currentUser.value?.avatar) {
      await uploadAvatar(file, id || 0);
    } else {
      showReplacementWarning(file);
    }
  }
  showAvatarUploadDialog.value = false;
};

const handleEdit = () => {
  editMode.value = true;
  userForm.value = { ...currentUser.value };
};

const replaceAvatar = async () => {
  const id = Number(currentUser.value?.id);
  await uploadAvatar(avatarFile.value as File, id || 0);
  await fetchCurrentUser();
  showWarning.value = false;
};

const computedGeneralInfo = computed((): Detail[] => {
  return [
    {
      title: t("auth.email"),
      value: currentUser.value?.email || "",
      icon: "mdi-email",
    },
    {
      title: t("forms.person.age"),
      value:
        locale.value === "ru"
          ? declineInRussian(currentUser.value?.age || 0, [
              "год",
              "года",
              "лет",
            ])
          : currentUser.value?.age + " " + t("general.years_old") || "",
      icon: "mdi-cake",
    },
  ];
});
definePageMeta({
  title: "Profile",
  middleware: ["auth"],
  key: (route) => route.fullPath,
});
</script>

<style></style>
