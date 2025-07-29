<template>
	<v-sheet
		rounded="lg"
		:border="false"
		class="pa-2"
		color="transparent"
		width="230"
		height="100"
	>
		<div class="d-flex flex-column ga-2 fill-height w-100">
			<v-rating
				v-if="item.rating !== null"
				:model-value="item.rating"
				readonly
				density="compact"
				size="small"
				color="yellow-darken-2"
			/>
			<v-spacer />
		
				<v-chip label size="small" variant="plain" prepend-icon="mdi-calendar">
					<div class="d-flex ga-1">
						<span> {{ $t("general.created_at") }}:</span>
						<span> {{ dateFormatter(item.createdAt || "") }}</span>
					</div>
				</v-chip>

				<PublisherPopover :publisher="item.publisherData" />
			</div>
	
	</v-sheet>
</template>

<script lang="ts" setup>
import PublisherPopover from "./PublisherPopover.vue";
defineProps<{ item: Detail }>();
</script>

<style></style>
