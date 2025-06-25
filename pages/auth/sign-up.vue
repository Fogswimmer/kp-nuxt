<template>
    <div>
        <Head>
            <Title>{{ definePageTitle($t("auth.register")) }}</Title>
        </Head>
        <AuthCard :title="$t('auth.register')" :top-offset="5">
            <RegistrationForm
                is-new
                :user-form="userForm"
                :loading="loading"
                @update:model-value="userForm = $event"
                @form:submit="submit"
            />

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
        </AuthCard>
        <v-snackbar
            v-model="showErrorMessage"
            color="error"
            :text="errorMessage.message || ''"
        />
    </div>
</template>

<script lang="ts" setup>
import RegistrationForm from "~/components/Forms/Auth/UserForm.vue";
import AuthCard from "~/components/Containment/Cards/AuthCard.vue";
import { useAuthStore } from "~/stores/authStore";

const { register } = useAuthStore();
const localeRoute = useLocaleRoute();
const { loading, authError, showErrorMessage, userForm } =
    storeToRefs(useAuthStore());
const submit = async () => {
    await register();
    if (!showErrorMessage.value) {
        navigateTo(localeRoute("/auth/sign-in"));
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
    layout: "content-center",
});
</script>
