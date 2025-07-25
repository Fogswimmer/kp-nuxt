<template>
	<v-card
		max-width="300"
		:title="publisher.name"
		:subtitle="useDeclineAge(publisher.age).value || ''"
	>
		<template #prepend>
			<v-avatar v-if="publisher.avatar" :image="publisher.avatar" />
			<v-icon v-else size="x-large">mdi-account</v-icon>
		</template>
		<v-card-text>
			<div class="d-flex flex-column ga-1">
				<v-chip prepend-icon="mdi-newspaper" size="small">
					<div class="d-flex ga-1">
						<span> {{ $t("general.publications_count") }}:</span>
						<span> {{ publisher.publicationsCount }}</span>
					</div>
				</v-chip>
				<v-chip prepend-icon="mdi-star" size="small">
					<div class="d-flex ga-1">
						<span> {{ $t("general.assessments_count") }}:</span>
						<span> {{ publisher.assessmentsCount }}</span>
					</div>
				</v-chip>
			</div>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
defineProps<{
	publisher: IPublisher;
}>();
</script>

<style></style>
