<template>
	<v-card
		variant="text"
		:title="t('pages.films.rating')"
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
						/>
					</ClientOnly>
				</div>

				<v-label>{{
					currentRating
						? computedAssessmentNumber
						: t("pages.films.no_assessments")
				}}</v-label>

				<v-btn
					:disabled="!isAuthenticated"
					variant="tonal"
					block
					color="secondary"
					@click="$emit('assession:enable')"
				>
					{{ $t("pages.films.assess") }}
				</v-btn>
			</div>
		</v-card-text>
	</v-card>
	<v-card variant="text">
		<v-card-text>
			<AssessmentGraph
				:graph-data="sortedGraphData"
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
</template>

<script lang="ts" setup>
import AssessmentForm from "~/components/Forms/Film/AssessmentForm.vue";
import AssessmentGraph from "./components/AssessmentGraph.vue";
import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
import { useAuthStore } from "~/stores/authStore";

const { isAuthenticated } = storeToRefs(useAuthStore());

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

const sortedGraphData = computed(() => {
	const sorted = [...props.assessmentsGraph].sort(
		(a, b) => b.rating - a.rating,
	);
	const arrLength = 5;

	const defaultRatings = [
		{ rating: 5, count: 0 },
		{ rating: 4, count: 0 },
		{ rating: 3, count: 0 },
		{ rating: 2, count: 0 },
		{ rating: 1, count: 0 },
	];

	const merged = defaultRatings.map((item) => {
		const found = sorted.find((el) => el.rating === item.rating);
		return found || item;
	});

	return merged.slice(0, arrLength);
});

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
