<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("auth.register")) }}</Title>
    </Head>

    <v-card class="pa-4 mx-auto" variant="tonal" max-width="600">
      <v-toolbar>
        <template #prepend>
          <BackBtn />
        </template>
        <v-toolbar-title> {{ $t("auth.register") }}</v-toolbar-title>
      </v-toolbar>

      <div class="mt-4">
        <RegistrationForm
          is-new
          :user-form="userForm"
          :loading="loading"
          @update:model-value="userForm = $event"
          @form:submit="submit"
        />
      </div>
      <div class="d-flex flex-column ga-4 mt-5">
        <v-btn
          prepend-icon="mdi-account-off"
          color="secondary"
          variant="plain"
          size="large"
          block
          to="/"
        >
          {{ $t("auth.continue_as_guest") }}
        </v-btn>
      </div>
    </v-card>

    <v-snackbar
      v-model="showErrorMessage"
      color="error"
      :text="authError?.message || ''"
    />
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import RegistrationForm from "~/components/Forms/Auth/UserForm.vue";
import { useAuthStore } from "~/stores/authStore";

const { register } = useAuthStore();
interface AuthError {
  message: string;
}

const {
  loading,
  authError,
  showErrorMessage,
  userForm,
} = storeToRefs(useAuthStore()) as {
  loading: Ref<boolean>;
  authError: Ref<AuthError | null>;
  showErrorMessage: Ref<boolean>;
  userForm: Ref<Partial<CurrentUser>>;
};

const submit = async () => {
  await register();
  if (!showErrorMessage.value) {
    navigateTo("/auth/sign-in");
  }
};
definePageMeta({
  name: "signUp",
  path: "/auth/sign-up",
  middleware: "guest",
});
</script>

<style></style>
