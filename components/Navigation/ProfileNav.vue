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

    <template v-else>
      <v-list-item
        v-if="$vuetify.display.mdAndUp"
        density="compact"
        rounded="lg"
        lines="one"
        :title="currentUser?.displayName || currentUser?.username || ''"
        :subtitle="currentUser?.email"
        to="/profile"
      >
        <template #prepend>
          <v-avatar v-if="isAuthenticated">
            <v-img
              v-if="currentUser?.avatar"
              :src="currentUser?.avatar || ''"
              @click="navigateTo('/profile')"
            />
            <v-icon v-else @click="navigateTo('/profile')"> mdi-account</v-icon>
          </v-avatar>
        </template>
      </v-list-item>
      <v-avatar v-else class="cursor-pointer">
        <v-img
          v-if="currentUser?.avatar"
          :src="currentUser?.avatar || ''"
          @click="navigateTo('/profile')"
        />
        <v-icon v-else @click="navigateTo('/profile')"> mdi-account</v-icon>
      </v-avatar>
    </template>
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

watch(isAuthenticated, () => {
  if (!isAuthenticated.value) {
    fetchCurrentUser();
  }
});

// onMounted(async (): Promise<void> => {
//   if (isAuthenticated.value) {
//     await fetchCurrentUser();
//   }
// });
</script>
