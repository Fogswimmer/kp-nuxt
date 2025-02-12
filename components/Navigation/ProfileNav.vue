<template>
  <div>
    <v-btn
      v-if="!isAuthenticated"
      block
      prepend-icon="mdi-login"
      variant="tonal"
      to="/auth/sign-in"
    >
      {{ $t("auth.sign_in") }}
    </v-btn>

    <v-list-item
      v-else
      link
      density="compact"
      rounded="lg"
      lines="one"
      :title="currentUser?.displayName || currentUser?.username || ''"
      :subtitle="currentUser?.email"
      to="/profile"
    >
      <template #prepend>
        <v-avatar v-if="isAuthenticated" border>
          <v-img
            v-if="currentUser?.avatar"
            :src="currentUser?.avatar || ''"
            @click="navigateTo('/profile')"
          />
          <v-icon v-else @click="navigateTo('/profile')"> mdi-account</v-icon>
        </v-avatar>
      </template>
    </v-list-item>

    <ConfirmDialog
      v-model="showConfirmDialog"
      :text="$t('auth.logout_confirm')"
      @cancel="showConfirmDialog = false"
      @confirm="handleSignOut"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";
import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";

const showConfirmDialog = ref<boolean>(false);
const { currentUser, isAuthenticated } = storeToRefs(useAuthStore());
const { signOut, fetchCurrentUser } = useAuthStore();

const handleSignOut = async (): Promise<void> => {
  await signOut();
  showConfirmDialog.value = false;
};

onMounted(async (): Promise<void> => {
  if (isAuthenticated.value) {
    await fetchCurrentUser();
  }
});
</script>
