<template>
  <div>
    <v-btn
      v-if="!isAuthenticated && $vuetify.display.mdAndUp"
      prepend-icon="mdi-login"
      variant="tonal"
      :to="localeRoute('/auth/sign-in')"
    >
      {{ $t("auth.sign_in") }}
    </v-btn>
    <v-menu v-else v-model="showMenu" location="bottom center">
      <template #activator="{ props }">
        <v-card max-width="300" variant="text">
          <v-list-item
            v-if="$vuetify.display.mdAndUp"
            v-bind="props"
            density="compact"
            lines="one"
            :title="currentUser?.displayName || currentUser?.username || ''"
            :subtitle="currentUser?.email"
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
                </v-img>
                <v-icon v-else> mdi-account</v-icon>
              </v-avatar>
            </template>
          </v-list-item>
          <v-avatar v-else v-bind="props" class="cursor-pointer">
            <v-img v-if="currentUser?.avatar" :src="currentUser?.avatar || ''">
              <template #error>
                <v-avatar border>
                  <v-icon color="error" size="x-small">mdi-image-broken</v-icon>
                </v-avatar>
              </template>
            </v-img>
            <v-icon v-else @click="navigateTo(localeRoute('/profile'))">
              mdi-account</v-icon
            >
          </v-avatar>
        </v-card>
      </template>
      <v-sheet max-width="300">
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
      </v-sheet>
    </v-menu>
    <ConfirmDialog
      v-model="showAvatarWarning"
      :text="$t('general.img_replacement_warning')"
      @cancel="showAvatarWarning = false"
      @confirm="replaceAvatar"
    />
    <ConfirmDialog
      v-model="showConfirmDialog"
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
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";
import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
import ProfileCard from "../Containment/Cards/ProfileCard.vue";
import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
import GalleryUploader from "~/components/Gallery/GalleryUploader.vue";
import UserForm from "~/components/Forms/Auth/UserForm.vue";

const { currentUser, isAuthenticated, token, loading, isAdmin, userForm } =
  storeToRefs(useAuthStore());
const { signOut, fetchCurrentUser, uploadAvatar, editUser } = useAuthStore();

const showConfirmDialog = ref<boolean>(false);
const showMenu = ref<boolean>(false);
const localeRoute = useLocaleRoute();
const handleSignOut = async (): Promise<void> => {
  await signOut();
  showConfirmDialog.value = false;
};

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
  await fetchCurrentUser();
};

const replaceAvatar = async () => {
  const id = Number(currentUser.value?.id);
  await uploadAvatar(avatarFile.value as File, id || 0);
  await fetchCurrentUser();
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
    await fetchCurrentUser();
  }
});
</script>
