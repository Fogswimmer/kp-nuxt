<template>
  <v-card>
    <v-card-text>
      <v-form ref="formRef" @submit.prevent>
        <v-text-field
          v-model="form.name"
          name="name"
          :rules="[requiredRule, minLengthRule, maxLengthRule, onlyLettersRule]"
          :label="$t('forms.film.name')"
          prepend-inner-icon="mdi-movie-play"
          @update:model-value="handleUpdateModelValue"
        />
        <v-text-field
          v-model="form.internationalName"
          name="internationalName"
          :rules="[
            requiredRule,
            onlyLatinCharsRule,
            minLengthRule,
            maxLengthRule,
            onlyLettersRule
          ]"
          :label="$t('forms.film.name_international')"
          prepend-inner-icon="mdi-movie-play"
          @update:model-value="handleUpdateModelValue"
        />
        <v-combobox
          v-model.number="form.releaseYear"
          name="releaseYear"
          :rules="[requiredRule, minYearRule, maxYearRule, onlyNumsRule]"
          prepend-inner-icon="mdi-calendar"
          :label="$t('forms.film.release_year')"
          :items="yearsOfReleaseItems"
          @update:model-value="handleUpdateModelValue"
        />
        <v-select
          v-model="form.genreIds"
          name="genreIds"
          multiple
          :items="genres"
          :rules="[requiredRule]"
          :label="$t('forms.film.genres')"
          item-value="value"
          item-title="name"
          prepend-inner-icon="mdi-filmstrip"
          @update:model-value="handleUpdateModelValue"
        />
        <v-select
          v-model.number="form.age"
          name="age"
          :rules="[requiredRule]"
          prepend-inner-icon="mdi-cake-variant"
          :label="$t('forms.film.age')"
          :items="ageItems"
          @update:model-value="handleUpdateModelValue"
        />
        <v-text-field
          v-model="form.duration"
          :label="$t('forms.film.duration')"
          type="time"
          name="duration"
          prepend-inner-icon="mdi-timer"
          :rules="[requiredRule]"
          @update:model-value="handleUpdateModelValue"
        />
        <v-select
          v-model="form.actorIds"
          :loading="loading"
          name="actorIds"
          multiple
          :items="actors"
          item-value="id"
          item-title="name"
          :rules="[requiredRule, requiredMinOneOptionRule]"
          :label="$t('forms.film.actors')"
          prepend-inner-icon="mdi-account"
          @update:model-value="handleUpdateModelValue"
        />
        <v-select
          v-model.number="form.directorId"
          name="directorId"
          :loading="loading"
          item-value="id"
          item-title="name"
          :items="directors"
          :rules="[requiredRule]"
          :label="$t('forms.film.director')"
          prepend-inner-icon="mdi-account"
          @update:model-value="handleUpdateModelValue"
        />
        <v-select
          v-model.number="form.producerId"
          name="producerId"
          item-value="id"
          :loading="loading"
          item-title="name"
          :items="directors"
          :rules="[requiredRule]"
          :label="$t('forms.film.producer')"
          prepend-inner-icon="mdi-account"
          @update:model-value="handleUpdateModelValue"
        />
        <v-select
          v-model.number="form.writerId"
          name="writerId"
          item-value="id"
          :loading="loading"
          item-title="name"
          :items="writers"
          :rules="[requiredRule]"
          :label="$t('forms.film.writer')"
          prepend-inner-icon="mdi-account"
          @update:model-value="handleUpdateModelValue"
        />
        <v-select
          v-model.number="form.composerId"
          name="composerId"
          item-value="id"
          :loading="loading"
          item-title="name"
          :rules="[requiredRule]"
          :items="composers"
          :label="$t('forms.film.composer')"
          prepend-inner-icon="mdi-account"
          @update:model-value="handleUpdateModelValue"
        />
        <v-text-field
          v-model="form.trailer"
          prepend-icon="mdi-asterisk"
          prepend-inner-icon="mdi-youtube"
          :label="$t('forms.film.trailer')"
          clearable
          @update:model-value="handleUpdateModelValue"
        />
        <v-text-field
          v-model="form.slogan"
          name="slogan"
          :label="$t('forms.film.slogan')"
          prepend-inner-icon="mdi-format-quote-close"
          @update:model-value="handleUpdateModelValue"
        />
        <v-textarea
          v-if="showDescription"
          v-model="form.description"
          :label="$t('forms.film.description')"
          name="description"
          density="compact"
          prepend-inner-icon="mdi-pencil"
          variant="filled"
          auto-grow
          rows="3"
          no-resize
          counter
          :rules="[requiredRule, maxDescriptionLengthRule]"
          @update:model-value="handleUpdateModelValue"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <SubmitBtn
        :loading="Boolean(loading)"
        @click="handleValidationAndSubmit"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import SubmitBtn from '~/components/Containment/Btns/SubmitBtn.vue';

const MAX_NAME_LENGTH: number = 50;
const MIN_NAME_LENGTH: number = 2;
const CURRENT_YEAR: number = new Date().getFullYear();
const START_YEAR: number = 1900;
const MAX_DESCRIPTION_LENGTH: number = 3000;
const formRef = ref<HTMLFormElement | null>(null);
const {
  required: requiredRule,
  requiredMinOneOption: requiredMinOneOptionRule,
  onlyNums: onlyNumsRule,
  onlyLetters: onlyLettersRule,
  minLength,
  maxLength,
  minYear,
  maxYear,
  onlyLatinChars: onlyLatinCharsRule,
} = useValidation();
const minLengthRule = minLength(MIN_NAME_LENGTH);
const maxLengthRule = maxLength(MAX_NAME_LENGTH);
const minYearRule = minYear(START_YEAR);
const maxYearRule = maxYear(CURRENT_YEAR);
const maxDescriptionLengthRule = maxLength(MAX_DESCRIPTION_LENGTH);
const emit = defineEmits<{
  (event: "form:submit"): void;
  (event: "update:modelValue", value: Partial<IFilm>): void;
}>();

const props = defineProps<{
  filmForm: Partial<IFilm>;
  showDescription?: boolean;
  genres: IGenre[];
  actors: Partial<IPerson>[];
  producers: Partial<IPerson>[];
  writers: Partial<IPerson>[];
  composers: Partial<IPerson>[];
  directors: Partial<IPerson>[];
  loading?: boolean;
}>();

const form = ref<Partial<IFilm>>({ ...props.filmForm });
const isFormValid = ref<boolean>(true);
const ageItems: number[] = [0, 3, 12, 16, 18];

const yearsOfReleaseItems = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, index) => START_YEAR + index
).sort((a, b) => b - a);

const validate = async (): Promise<boolean> => {
  if (!formRef.value) return false;
  
  const result = await formRef.value.validate();
  isFormValid.value = result.valid;
  
  return result.valid;
};

const handleUpdateModelValue = (): void => {
  emit("update:modelValue", form.value);
};

const handleValidationAndSubmit = async (): Promise<void> => {
  const isValid = await validate();
  console.log(isValid)
  if (isValid) {
    emit("form:submit");
  }
};

watch(
  (): Partial<IFilm> => props.filmForm,
  (): void => {
    form.value = { ...props.filmForm };
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss"></style>
