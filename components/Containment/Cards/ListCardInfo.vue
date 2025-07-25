<template>
	<v-sheet
		rounded="lg"
		:border="false"
		class="pa-2"
		color="transparent"
		height="100"
		max-width="350"
	>
		<div
			class="d-flex flex-column ga-2 justify-center align-center fill-height"
		>
			<v-rating
				v-if="item.rating !== null"
				:model-value="item.rating"
				readonly
				density="compact"
				color="yellow-darken-2"
			/>

			<div class="d-flex ga-1 fill-height align-center">
				<v-chip size="small" label>
					<div class="d-flex ga-1">
						<span> {{ $t("general.created_at") }}:</span>
						<span> {{ dateFormatter(item.createdAt || "") }}</span>
					</div>
				</v-chip>

				<PublisherPopover :publisher="item.publisherData" />
			</div>
		</div>
	</v-sheet>
</template>

<script lang="ts" setup>
import PublisherPopover from "./PublisherPopover.vue";
defineProps<{ item: Detail }>();
</script>

<style></style>
