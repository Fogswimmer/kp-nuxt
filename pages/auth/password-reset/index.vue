<template>
    <div>
        <Head>
            <Title>{{ definePageTitle($t('auth.password_reset')) }}</Title>
        </Head>

        <AuthCard :title="$t('auth.password_reset')">
            <v-card variant="tonal">
                <v-card-text class="pa-4">
                    <v-form ref="emailFormRef" class="mt-4">
                        <div class="d-flex flex-column ga-2">
                            <v-text-field
                                v-model="passwordResetForm.email"
                                name="email"
                                :disabled="showSuccessMessage || loading"
                                :label="$t('auth.password_reset_email')"
                                :placeholder="$t('auth.password_reset_email')"
                                prepend-inner-icon="mdi-email-outline"
                                variant="outlined"
                                :rules="[required, emailRule]"
                            />
                        </div>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <SubmitBtn
                        :loading="loading"
                        @click="handleValidationAndSubmit"
                    />
                </v-card-actions>
            </v-card>
        </AuthCard>

        <v-snackbar
            v-model="showSuccessMessage"
            color="success"
            :text="$t('auth.password_reset_messages.success')"
        />
        <v-snackbar
            v-model="showErrorMessage"
            color="error"
            :text="$t('auth.password_reset_messages.error')"
        />
    </div>
</template>

<script lang="ts" setup>
import AuthCard from '~/components/Containment/Cards/AuthCard.vue'
import SubmitBtn from '~/components/Containment/Btns/SubmitBtn.vue'
import { useAuthStore } from '~/stores/authStore'

const { loading, passwordResetForm, showErrorMessage } =
    storeToRefs(useAuthStore())
const { resetPasswordRequest } = useAuthStore()
const { required, email: emailRule } = useValidation()
const localeRoute = useLocaleRoute()
const { locale } = useI18n()
const emailFormRef = ref<HTMLFormElement | null>(null)
const isFormValid = ref<boolean>(false)
const showSuccessMessage = ref<boolean>(false)

const validate = async (): Promise<boolean> => {
    if (!emailFormRef.value) return false
    const result = await emailFormRef.value.validate()
    isFormValid.value = result.valid

    return result.valid
}
const handleValidationAndSubmit = async (): Promise<void> => {
    const isValid = await validate()
    if (isValid) {
        const success = await resetPasswordRequest(locale.value)
        if (success) {
            showSuccessMessage.value = true
            setTimeout(() => {
                navigateTo(localeRoute('/auth/sign-in'))
            }, 2000)
        }
    }
}
onMounted(() => {
    const { clearError } = useAuthStore()
    clearError()
})

definePageMeta({
    name: 'passwordResetEmail',
    path: '/auth/password-reset',
    layout: 'content-center',
})
</script>
