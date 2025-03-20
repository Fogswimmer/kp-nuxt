<template>
  <v-card class="text-center">
    <v-card-text>
      <div class="d-flex align-center justify-center ga-1">
        <span class="text-h6">{{ $t("pages.films.your_assessment") }}:</span>
        <span class="text-primary text-h5">{{ rating }}</span>
      </div>
      <client-only>
        <v-rating
          :model-value="rating"
          active-color="warning"
          clearable
          hover
          @update:model-value="$emit('update:rating', $event)"
        />
      </client-only>
      <v-textarea
        :model-value="comment"
        :label="$t('pages.films.comment')"
        counter
        rows="5"
        :rules="[requiredRule, minLengthRule, maxLengthRule]"
        @update:model-value="$emit('update:comment', $event)"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        prepend-icon="mdi-check"
        @click="submitAssessment"
        >{{ $t("actions.submit") }}</v-btn
      >
      <v-btn color="error" prepend-icon="mdi-close" @click="cancelAssessment">{{
        $t("actions.cancel")
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  rating: number;
  comment: string;
}>();
const emits = defineEmits<{
  (event: "submit" | "cancel"): void;
  (event: "update:comment", value: string): void;
  (event: "update:rating", value: number): void;
}>();

const { maxLength, minLength, required: requiredRule } = useValidation();

const MAX_COMMENT_LENGTH = 255;
const MIN_COMMENT_LENGTH = 5;
const maxLengthRule = maxLength(MAX_COMMENT_LENGTH);
const minLengthRule = minLength(MIN_COMMENT_LENGTH);

function submitAssessment() {
  emits("submit");
}
function cancelAssessment() {
  emits("cancel");
}
</script>
