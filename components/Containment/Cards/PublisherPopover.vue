<template>
	<v-menu :open-on-hover="$vuetify.display.mdAndUp">
		<template #activator="{ props }">
			<v-chip 
			v-if="!isCommment" size="small"  
			prepend-icon="mdi-newspaper" 
			variant="tonal"
			v-bind="props" 
			label
			>
				<div class="d-flex ga-2">
					<span>{{ $t("general.published_by") }}:</span>
					<span class="text-truncate font-weight-bold text-decoration-underline">{{
						publisher.name
					}}</span>
					<span v-if="createdAt">{{
						dateFormatter(createdAt || "")
					}}</span>
				</div>
			</v-chip>
			<span
				v-else
				v-bind="props"
				class="text-body-2 text-lg-body-1 text-primary font-weight-bold text-truncate comment-title"
			>
				{{ publisher.name }}</span
			>
		</template>
		<v-card
			max-width="300"
			:title="publisher.name"
			:subtitle="publisher.age ? useDeclineAge(publisher.age).value : ''"
		>
			<template #prepend>
				<v-avatar
					v-if="publisher.avatar"
					:image="publisher.avatar || ''"
					size="64"
				/>
				<v-icon v-else size="x-large">mdi-account</v-icon>
			</template>
			<v-card-text>
				<div class="d-flex flex-column ga-1">
					<v-chip prepend-icon="mdi-newspaper" size="small">
						<div
							v-if="publisher.publicationsCount > 0"
							class="d-flex ga-1"
						>
							<span>
								{{ $t("general.publications_count") }}:</span
							>
							<span> {{ publisher.publicationsCount }}</span>
						</div>
						<span v-else>{{ $t("general.no_publications") }}</span>
					</v-chip>
					<v-chip prepend-icon="mdi-star" size="small">
						<div
							v-if="publisher.assessmentsCount > 0"
							class="d-flex ga-1"
						>
							<span> {{ $t("general.assessments_count") }}:</span>
							<span> {{ publisher.assessmentsCount }}</span>
						</div>
						<span v-else>{{ $t("general.no_assessments") }}</span>
					</v-chip>
				</div>
			</v-card-text>
		</v-card>
	</v-menu>
</template>

<script lang="ts" setup>
defineProps<{
	publisher: IPublisher;
	createdAt?: string;
	isCommment?: boolean;
	isPlain?: boolean;
}>();
</script>

<style></style>
