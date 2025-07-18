<template>
    <v-form ref="registerFormRef">
        <div class="d-flex flex-column ga-1">
            <template v-if="isNew">
                <v-text-field
                    v-model="form.username"
                    :label="$t('auth.login')"
                    :placeholder="$t('auth.login_placeholder')"
                    prepend-inner-icon="mdi-account-key"
                    :rules="[
                        requiredRule,
                        maxLoginLengthRule,
                        minLoginLengthRule,
                    ]"
                    @update:model-value="handleUpdateModelValue"
                />
                <span class="text-caption text-secondary">{{
                    $t('forms.rules.password_requirement')
                }}</span>
                <v-text-field
                    v-model="form.password"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    :label="$t('auth.password')"
                    :placeholder="$t('auth.password_placeholder')"
                    prepend-inner-icon="mdi-lock-outline"
                    :rules="[requiredRule, passwordRule]"
                    @click:append-inner="visible = !visible"
                    @update:model-value="handleUpdateModelValue"
                />
            </template>
            <v-text-field
                v-model="form.email"
                :label="$t('auth.email')"
                :placeholder="$t('auth.email_placeholder')"
                :rules="[requiredRule, emailRule]"
                prepend-inner-icon="mdi-email-outline"
                @update:model-value="handleUpdateModelValue"
            />
            <v-text-field
                v-model="form.displayName"
                :label="$t('auth.display_name')"
                :placeholder="$t('auth.login_placeholder')"
                prepend-inner-icon="mdi-account-eye"
                @update:model-value="handleUpdateModelValue"
            />
            <v-text-field
                v-model.number="form.age"
                :label="$t('forms.person.age')"
                :rules="[requiredRule, onlyNumsRule]"
                prepend-inner-icon="mdi-calendar"
                @update:model-value="handleUpdateModelValue"
            />
            <v-textarea
                v-model="form.about"
                :label="$t('auth.about')"
                :rules="[(value: string) => !value || true, maxAboutLengthRule]"
                rows="3"
                counter
                prepend-inner-icon="mdi-pencil"
                @update:model-value="handleUpdateModelValue"
            />
        </div>
        <v-btn
            v-if="isNew"
            color="primary"
            variant="tonal"
            size="large"
            :loading="loading"
            block
            @click="handleValidationAndSubmit"
        >
            {{ $t('auth.sign_up') }}
        </v-btn>
    </v-form>
</template>

<script lang="ts" setup>
const props = defineProps<{
    isNew: boolean
    userForm: Partial<CurrentUser>
    loading: boolean
}>()
const emit = defineEmits<{
    (event: 'form:submit'): void
    (event: 'update:modelValue', value: Partial<CurrentUser>): void
}>()

const MAX_LOGIN_LENGTH: number = 50
const MIN_LOGIN_LENGTH: number = 5

const isFormValid = ref<boolean>(false)
const visible = ref<boolean>(false)
const registerFormRef = ref<HTMLFormElement>()
const form = ref<Partial<CurrentUser>>({ ...props.userForm })
const {
    required: requiredRule,
    email: emailRule,
    onlyNums: onlyNumsRule,
    password: passwordRule,
    maxLength,
    minLength,
} = useValidation()

const maxLoginLengthRule = maxLength(MAX_LOGIN_LENGTH)
const minLoginLengthRule = minLength(MIN_LOGIN_LENGTH)
const maxAboutLengthRule = maxLength(500)

const handleUpdateModelValue = (): void => {
    emit('update:modelValue', form.value)
}

const validate = async (): Promise<boolean> => {
    if (!registerFormRef.value) return false

    const result = await registerFormRef.value.validate()
    isFormValid.value = result.valid

    return result.valid
}

const handleValidationAndSubmit = async (): Promise<void> => {
    const isValid = await validate()
    if (isValid) {
        emit('form:submit')
    }
}
</script>

<style></style>
