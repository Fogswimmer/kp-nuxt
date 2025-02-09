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
					@update:model-value="$emit('update:rating', $event)">
				</v-rating>
			</client-only>
			<v-textarea
				:model-value="comment"
				:label="$t('pages.films.comment')"
				@update:model-value="$emit('update:comment', $event)"></v-textarea>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				color="primary"
				prepend-icon="mdi-check"
				@click="submitAssessment"
				>{{ $t("actions.submit") }}</v-btn
			>
			<v-btn
				color="error"
				prepend-icon="mdi-close"
				@click="cancelAssessment"
				>{{ $t("actions.cancel") }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts" setup>
	defineProps<{
		rating: number;
		comment: string;
	}>();
	const emit = defineEmits([
		"submit",
		"cancel",
		"update:comment",
		"update:rating",
	]);
	function submitAssessment() {
		emit("submit");
	}
	function cancelAssessment() {
		emit("cancel");
	}
</script>

<style></style>
