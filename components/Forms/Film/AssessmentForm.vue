<template>
	<v-card class="text-center">
		<v-card-text>
			<v-form ref="formRef">
				<div class="d-flex align-center justify-center ga-1">
					<span class="text-h6"
						>{{ $t("pages.films.your_assessment") }}:</span
					>
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
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-spacer />
			<v-btn
				color="primary"
				prepend-icon="mdi-check"
				@click="handleValidationAndSubmit"
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
const emits = defineEmits<{
	(event: "submit" | "cancel"): void;
	(event: "update:comment", value: string): void;
	(event: "update:rating", value: number): void;
}>();

const { maxLength, minLength, required: requiredRule } = useValidation();
const isFormValid = ref<boolean>(true);
const formRef = ref<HTMLFormElement | null>(null);
const MAX_COMMENT_LENGTH: number = 255;
const MIN_COMMENT_LENGTH: number = 5;
const maxLengthRule = maxLength(MAX_COMMENT_LENGTH);
const minLengthRule = minLength(MIN_COMMENT_LENGTH);

const validate = async (): Promise<boolean> => {
	if (!formRef.value) return false;

	const result = await formRef.value.validate();
	isFormValid.value = result.valid;

	return result.valid;
};
const handleValidationAndSubmit = async (): Promise<void> => {
	const isValid = await validate();
	console.log(isValid);
	if (isValid) {
		emits("submit");
	}
};
function cancelAssessment() {
	emits("cancel");
}
</script>
