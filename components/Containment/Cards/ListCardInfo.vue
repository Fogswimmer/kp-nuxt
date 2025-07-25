<template>
	<v-sheet
		rounded="lg"
		:border="false"
		class="pa-2"
		color="transparent"
		height="100"
		width="600"
	>
		<div
			class="d-flex ga-2 align-center fill-height w-100"
		>
			<v-rating
				v-if="item.rating !== null"
				:model-value="item.rating"
				readonly
				density="compact"
				color="yellow-darken-2"
			/>
			<v-spacer/>
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
