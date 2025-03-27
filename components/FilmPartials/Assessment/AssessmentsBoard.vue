<!-- <template>
  <div class="d-flex flex-column ga-2">
    <transition-group>
      <v-card
        v-if="!isAssessing"
        rounded="lg"
        elevation="2"
        variant="text"
        border
      >
        <v-card-text>
          <v-card class="glased" variant="tonal">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" lg="4" md="6" sm="12">
                    <div
                      class="d-flex flex-column justify-center ga-1 align-center"
                    >
                      <div class="d-flex ga-1 align-center">
                        <v-icon
                          icon="mdi-star"
                          size="x-large"
                          color="warning"
                        />
                        <span class="text-h4">{{ currentRating }}</span>
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
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </transition-group>
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
    
  </div>
</template>

<script lang="ts" setup>

import AssessmentForm from "~/components/Forms/Film/AssessmentForm.vue";
import AssessmentGraph from "./components/AssessmentGraph.vue";
import { useAuthStore } from "~/stores/authStore";

const { currentUser, isAuthenticated, isAdmin } = storeToRefs(useAuthStore());

const emits = defineEmits<{
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

const itemsPerPage = ref<number>(5);
const showDeleteConfirm = ref<boolean>(false);

const seeAllOnClick = () => {
  itemsPerPage.value = itemsPerPage.value === 5 ? props.assessments.length : 5;
};

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

const confirmDelete = (id: number) => {
  console.log(id)
  emits("assession:delete", id);
  showDeleteConfirm.value = false;
};
</script>

<style></style> -->
