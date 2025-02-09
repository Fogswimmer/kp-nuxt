<template>
	<div>
		<transition-group>
			<div
				v-if="!isAssessing"
				class="d-flex flex-column justify-center ga-1 align-center">
				<div class="d-flex ga-1 align-center">
					<v-icon
						icon="mdi-star"
						size="x-large"
						color="warning"></v-icon>
					<span class="text-h4">{{ currentRating }}</span>
				</div>
				<v-label>{{
					assessments.length + " " + $t("pages.films.assessments") ||
					$t("pages.films.no_assessments")
				}}</v-label>
				<v-btn
					:disabled="!isAuthenticated"
					@click="$emit('assession:enable')">
					{{ $t("pages.films.assess") }}
				</v-btn>
			</div>
		</transition-group>
		<v-scroll-y-transition>
			<AssessmentForm
				v-if="isAssessing"
				:rating="rating"
				:comment="comment"
				@update:rating="$emit('rating:update', $event)"
				@update:comment="$emit('comment:update', $event)"
				@cancel="$emit('assession:cancel')"
				@submit="$emit('assession:submit')" />
		</v-scroll-y-transition>
		<v-data-iterator
			v-if="assessments.length > 0"
			:items="assessments"
			:page="page">
			<template #header>
				<h4>{{ $t('pages.films.comments') }}</h4>
				<v-divider></v-divider>
			</template>
			<template v-slot:default="{ items }">
				<template
					v-for="(item, i) in items"
					:key="i">
					<v-list-item
						v-bind="item.raw"
						lines="two"
						variant="tonal"
						class="rounded-lg ma-2"
						:title="item.raw.authorName ? item.raw.authorName : 'Anonymous'"
						:prepend-avatar="
							item.raw.authorAvatar ? item.raw.authorAvatar : undefined
						"
						:subtitle="item.raw.comment">
						<template #append>
							<ClientOnly>
								<v-rating
									density="compact"
									size="small"
									active-color="warning"
									:readonly="true"
									:model-value="item.raw.rating"></v-rating>
							</ClientOnly>
						</template>
					</v-list-item>
				</template>
			</template>
		</v-data-iterator>
	</div>
</template>

<script lang="ts" setup>
	import AssessmentForm from "../Forms/AssessmentForm.vue";
	const page = ref(1);
	defineEmits([
		"assession:submit",
		"assession:enable",
		"assession:cancel",
		"comment:update",
		"rating:update",
	]);
	defineProps<{
		currentRating: string|number;
		assessments: IAssessment[];
		isAssessing: boolean;
		isAuthenticated: boolean;
		rating: number;
		comment: string;
	}>();
</script>

<style></style>
