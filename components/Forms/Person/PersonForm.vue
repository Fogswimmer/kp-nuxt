<template>
    <v-card variant="text" flat>
        <v-card-text>
            <v-form ref="formRef">
                <v-text-field
                    v-model="form.firstname"
                    name="firstname"
                    prepend-inner-icon="mdi-account"
                    :rules="[
                        requiredRule,
                        minLengthRule,
                        maxLengthRule,
                        onlyLettersRule,
                    ]"
                    :label="$t('forms.person.firstname')"
                    @update:model-value="handleUpdateModelValue"
                />
                <v-text-field
                    v-model="form.lastname"
                    name="lastname"
                    prepend-inner-icon="mdi-account"
                    :rules="[
                        requiredRule,
                        minLengthRule,
                        maxLengthRule,
                        onlyLettersRule,
                    ]"
                    :label="$t('forms.person.lastname')"
                    @update:model-value="handleUpdateModelValue"
                />
                <v-text-field
                    v-model="form.internationalName"
                    name="internationalName"
                    :rules="[
                        requiredRule,
                        minLengthRule,
                        maxLengthRule,
                        onlyLatinCharsRule,
                        onlyLettersRule,
                    ]"
                    :label="$t('forms.person.name_international')"
                    prepend-inner-icon="mdi-movie-play"
                    @update:model-value="handleUpdateModelValue"
                />
                <v-select
                    v-model="form.genderId"
                    name="genderId"
                    item-value="value"
                    item-title="name"
                    prepend-inner-icon="mdi-gender-male-female"
                    :items="genders"
                    :rules="[requiredRule]"
                    :hint="$t('forms.person.gender_hint')"
                    :label="$t('forms.person.gender')"
                    @update:model-value="handleUpdateModelValue"
                />
                <v-select
                    v-model="form.specialtyIds"
                    name="specialtyIds"
                    multiple
                    item-value="value"
                    item-title="name"
                    prepend-inner-icon="mdi-account-group"
                    :items="specialties"
                    :rules="[requiredRule, requiredMinOneOptionRule]"
                    :label="$t('forms.person.specialties')"
                    :hint="$t('forms.person.specialty_hint')"
                    @update:model-value="handleUpdateModelValue"
                />
                <v-text-field
                    v-model="form.birthday"
                    name="birthday"
                    type="date"
                    prepend-inner-icon="mdi-calendar"
                    :rules="[requiredRule, minBirthdayRule, maxBirthdayRule]"
                    :label="$t('forms.person.birthday')"
                    @update:model-value="handleUpdateModelValue"
                />
                <v-textarea
                    v-model="form.bio"
                    name="bio"
                    density="compact"
                    prepend-inner-icon="mdi-pencil"
                    variant="filled"
                    auto-grow
                    rows="3"
                    counter
                    no-resize
                    :label="$t('forms.person.bio')"
                    :rules="[requiredRule, maxBioLengthRule]"
                    @update:model-value="handleUpdateModelValue"
                />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <SubmitBtn
                :loading="loading"
                @click:submit="handleValidationAndSubmit"
            />
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import SubmitBtn from "~/components/Containment/Btns/SubmitBtn.vue";

const emit = defineEmits<{
    (event: "form:submit"): void;
    (event: "update:modelValue", value: Partial<IPerson>): void;
}>();

const props = defineProps<{
    personForm: Partial<IPerson>;
    genders: IGender[];
    specialties: ISpecialty[];
    loading: boolean;
}>();

const formRef = ref<HTMLFormElement>();
const isFormValid = ref<boolean>(false);
const form = ref<Partial<IPerson>>({ ...props.personForm });

const MAX_NAME_LENGTH: number = 50;
const MIN_NAME_LENGTH: number = 2;
const MAX_BIO_LENGTH: number = 3000;
const MIN_AGE: number = 7;
const CURRENT_YEAR: number = new Date().getFullYear();
const MIN_BIRTHDAY: number = new Date(1900, 0, 1).getFullYear();
const MAX_BIRTHDAY: number = new Date(
    CURRENT_YEAR - MIN_AGE,
    0,
    1,
).getFullYear();

const {
    required: requiredRule,
    requiredMinOneOption: requiredMinOneOptionRule,
    onlyLetters: onlyLettersRule,
    minLength,
    maxLength,
    minBirthday,
    maxBirthday,
    onlyLatinChars: onlyLatinCharsRule,
} = useValidation();

const minLengthRule = minLength(MIN_NAME_LENGTH);
const maxLengthRule = maxLength(MAX_NAME_LENGTH);
const maxBirthdayRule = maxBirthday(MAX_BIRTHDAY);
const minBirthdayRule = minBirthday(MIN_BIRTHDAY);
const maxBioLengthRule = maxLength(MAX_BIO_LENGTH);

const handleUpdateModelValue = (): void => {
    emit("update:modelValue", form.value);
};

const validate = async (): Promise<boolean> => {
    if (!formRef.value) return false;

    const result = await formRef.value.validate();
    isFormValid.value = result.valid;

    return result.valid;
};

const handleValidationAndSubmit = async (): Promise<void> => {
    const isValid = await validate();
    if (isValid) {
        emit("form:submit");
    }
};

watch(
    (): Partial<IPerson> => props.personForm,
    (): void => {
        form.value = { ...props.personForm };
    },
    {
        deep: true,
    },
);
</script>
