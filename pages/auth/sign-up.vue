<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("auth.register")) }}</Title>
    </Head>

    <main class="position-relative">
      <v-card
        class="mx-auto glassed position-absolute right-0 left-0 top-0 ma-2"
        max-width="600"
         :style="$vuetify.display.mdAndUp ? 'transform: translateY(5%);' : ''"
      >
        <v-toolbar class="glassed">
          <template #prepend>
            <BackBtn />
          </template>
          <v-toolbar-title> {{ $t("auth.register") }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="mt-4">
          <RegistrationForm
            is-new
            :user-form="userForm"
            :loading="loading"
            @update:model-value="userForm = $event"
            @form:submit="submit"
          />
        </v-card-text>
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
    </main>

    <v-snackbar
      v-model="showErrorMessage"
      color="error"
      :text="errorMessage.message || ''"
    />
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import RegistrationForm from "~/components/Forms/Auth/UserForm.vue";
import { useAuthStore } from "~/stores/authStore";

const { register } = useAuthStore();

const { loading, authError, showErrorMessage, userForm } =
  storeToRefs(useAuthStore());
const submit = async () => {
  await register();
  if (!showErrorMessage.value) {
    navigateTo("/auth/sign-in");
  }
};

interface AuthError {
  message: string;
}

const errorMessage = ref<AuthError>({ message: "" });
watchEffect(() => {
  if (authError.value) {
    errorMessage.value = authError.value as AuthError;
  }
});

definePageMeta({
  name: "signUp",
  title: "Sign up",
});
</script>
