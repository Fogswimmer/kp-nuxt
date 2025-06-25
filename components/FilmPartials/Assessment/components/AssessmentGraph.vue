<template>
    <div class="d-flex flex-column ga-2 justify-center fill-height">
        <template v-if="graphData.length">
            <div v-for="(data, index) in sortedGraphData" :key="index">
                <div class="d-flex flex-column ga-1">
                    <div class="d-flex ga-1 align-center w-100">
                        <v-chip
                            :color="stripeColor(data.rating)"
                            size="x-small"
                            prepend-icon="mdi-star"
                            >{{ data.rating }}</v-chip
                        >

                        <v-spacer />
                        <v-chip size="x-small">{{ data.count }}</v-chip>
                    </div>
                    <div class="d-flex ga-1 align-center justify-between">
                        <v-progress-linear
                            height="8"
                            rounded
                            rounded-bar
                            :model-value="(data.count / total) * 20"
                            :color="stripeColor(data.rating)"
                        />
                    </div>
                </div>
            </div>
        </template>
        <v-sheet v-else height="160">
            <div class="d-flex fill-height justify-center align-center">
                <v-label class="text-caption">
                    {{ $t("general.no_data") }}
                </v-label>
            </div>
        </v-sheet>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    graphData: AssessmentsGraph[];
    total: number;
}>();

const sortedGraphData = computed(() => {
    const data = props.graphData;
    return data.sort((a, b) => b.rating - a.rating);
});

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
