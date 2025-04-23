<template>
  <v-card border elevation="5">
    <div class="d-flex flex-column">
      <v-card
        height="200"
        :title="$t('pages.films.rating')"
        prepend-icon="mdi-star"
      >
        <v-card-text>
          <div class="d-flex flex-column fill-height ga-2 align-center">
            <div class="d-flex flex-column ga-1 align-center">
              <span class="text-h4">{{ currentRating }}</span>
              <ClientOnly>
                <v-rating
                  readonly
                  half-increments
                  :model-value="currentRating"
                  density="comfortable"
                  color="yellow-darken-2"
                ></v-rating>
              </ClientOnly>
            </div>

            <v-label>{{ computedAssessmentNumber }}</v-label>
            <ClientOnly>
              <v-btn
                :disabled="!isAuthenticated"
                variant="tonal"
                block
                density="comfortable"
                color="secondary"
                @click="$emit('assession:enable')"
              >
                {{ $t("pages.films.assess") }}
              </v-btn>
            </ClientOnly>
          </div>
        </v-card-text>
      </v-card>
      <v-card height="220">
        <v-card-text>
          <AssessmentGraph
            :graph-data="assessmentsGraph"
            :total="assessments.length"
          />
        </v-card-text>
      </v-card>
      <BaseDialog
        :opened="isAssessing"
        :loading="false"
        :title="$t('pages.films.assess')"
        @close="$emit('assession:cancel')"
      >
        <template #text>
          <AssessmentForm
            :rating="rating"
            :comment="comment"
            @update:rating="$emit('rating:update', $event)"
            @update:comment="$emit('comment:update', $event)"
            @cancel="$emit('assession:cancel')"
            @submit="$emit('assession:submit')"
          />
        </template>
      </BaseDialog>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import AssessmentForm from "~/components/Forms/Film/AssessmentForm.vue";
import AssessmentGraph from "./components/AssessmentGraph.vue";
import { useAuthStore } from "~/stores/authStore";
import BaseDialog from "~/components/Dialogs/BaseDialog.vue";

const { isAuthenticated } = storeToRefs(useAuthStore());
const formOpen = ref<boolean>(false);
defineEmits<{
  (event: "assession:submit" | "assession:enable" | "assession:cancel"): void;
  (event: "comment:update" | "rating:update", value: string | number): void;
}>();

const props = defineProps<{
  currentRating: string | number;
  assessments: IAssessment[];
  assessmentsGraph: AssessmentsGraph[];
  isAssessing: boolean;
  rating: number;
  comment: string;
}>();

const { t, locale } = useI18n();

const computedAssessmentNumber = computed(() => {
  const label =
    locale.value == "ru"
      ? declineInRussian(props.assessments.length, [
          "оценка",
          "оценки",
          "оценок",
        ])
      : t("pages.films.assessments", props.assessments.length);
  return label || t("pages.films.no_assessments");
});
</script>

<style></style>
