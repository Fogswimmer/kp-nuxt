<template>
  <div class="d-flex flex-column ga-2 justify-center fill-height">
    <template v-if="graphData.length">
      <div v-for="(data, index) in graphData" :key="index">
        <div class="d-flex flex-column ga-1">
          <div class="d-flex ga-1 align-center w-100">
            <ClientOnly>
              <v-rating
                readonly
                :model-value="data.rating"
                density="comfortable"
                :color="stripeColor(data.rating)"
                size="x-small"
              />
            </ClientOnly>
            <v-spacer />
            <span class="text-caption">{{ data.count }}</span>
          </div>
          <div class="d-flex ga-1 align-center justify-between">
            <v-progress-linear
              height="10"
              rounded
              :model-value="(data.count / total) * 100"
              :color="stripeColor(data.rating)"
            />
          </div>
        </div>
      </div>
    </template>
    <v-sheet v-else height="100">
      <div class="d-flex fill-height justify-center align-center">
        <v-label class="text-caption">
          {{ $t("general.no_data") }}
        </v-label>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  graphData: AssessmentsGraph[];
  total: number;
}>();

const stripeColor = (value: number) => {
  if (value > 3) {
    return "primary";
  } else if (value === 3) {
    return "deep-orange";
  } else {
    return "error";
  }
};
</script>

<style></style>
