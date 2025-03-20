<template>
  <v-card>
    <v-card-text>
      <v-form ref="formRef" @submit.prevent>
        <v-text-field
          v-model="form"
          prepend-icon="mdi-youtube"
          :rules="[requiredRule, validUrlRule]"
          :label="$t('forms.film.trailer')"
          :hint="$t('general.youtube_link')"
          clearable
          @update:model-value="handleUpdateModelValue"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <SubmitBtn :loading="loading" @click="handleValidationAndSubmit" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import SubmitBtn from "~/components/Containment/Btns/SubmitBtn.vue";
const props = defineProps<{
  trailer: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (event: "form:submit"): void;
  (event: "update:modelValue", value:string): void;
}>();

const { required: requiredRule, validUrl: validUrlRule } = useValidation();

const formRef = ref<HTMLFormElement | null>(null);
const isFormValid = ref<boolean>(false);
const form = ref<string|null|undefined>(props.trailer || null);

const validate = async (): Promise<boolean> => {
  if (!formRef.value) return false;

  const result = await formRef.value.validate();
  isFormValid.value = result.valid;

  return result.valid;
};
const handleUpdateModelValue = (value: string): void => {
  if (!value) return; 
  form.value = youtubeUrlToEmbed(value) || '';
  emit("update:modelValue", form.value);
};

const handleValidationAndSubmit = async (): Promise<void> => {
  const isValid = await validate();
  console.log(isValid);
  if (isValid) {
    emit("form:submit");
  }
};

watch(
  (): string => props.trailer,
  (): void => {
    form.value = props.trailer;
  },
  {
    deep: true,
  }
);
</script>

<style></style>
