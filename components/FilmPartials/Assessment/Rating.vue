<template>
  <div class="d-flex flex-column ga-2">
    <v-card elevation="5" border>
      <v-container>
        <v-row>
          <v-col cols="12" lg="4" md="6" sm="12">
            <div
              class="d-flex flex-column justify-center fill-height ga-1 align-center"
            >
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
                  variant="outlined"
                  color="secondary"
                  @click="$emit('assession:enable')"
                >
                  {{ $t("pages.films.assess") }}
                </v-btn>
              </ClientOnly>
            </div>
          </v-col>
          <v-col>
            <AssessmentGraph
              :graph-data="assessmentsGraph"
              :total="assessments.length"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-scroll-y-transition>
      <AssessmentForm
        v-if="isAssessing"
        :rating="rating"
        :comment="comment"
        @update:rating="$emit('rating:update', $event)"
        @update:comment="$emit('comment:update', $event)"
        @cancel="$emit('assession:cancel')"
        @submit="$emit('assession:submit')"
      />
    </v-scroll-y-transition>

    <slot name="comments" />
  </div>
</template>

<script lang="ts" setup>
import AssessmentForm from "~/components/Forms/Film/AssessmentForm.vue";
import AssessmentGraph from "./components/AssessmentGraph.vue";
import { useAuthStore } from "~/stores/authStore";

const { isAuthenticated } = storeToRefs(useAuthStore());

defineEmits<{
  (event: "assession:submit" | "assession:enable" | "assession:cancel"): void;
  (event: "assession:delete", id: number): void;
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
