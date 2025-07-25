<template>
	<v-sheet
		height="110"
		width="200"
		rounded="lg"
		:border="false"
		class="ml-2 pa-2"
		color="transparent"
		elevation="2"
	>
		<div class="d-flex flex-column ga-2 justify-center fill-height">
			<div class="text-center">
				<v-rating
					v-if="item.rating !== null"
					:model-value="item.rating"
					readonly
					density="compact"
					size="small"
					color="yellow-darken-2"
				/>
			</div>

			<div class="d-flex ga-1">
				<v-list-item
					:title="$t('general.created_at')"
					:subtitle="item.createdAt"
					variant="text"
					nav
					density="compact"
				/>

				<v-list-item variant="text" nav density="compact">
					<v-list-item-title>
						{{ $t("general.published_by") }}
					</v-list-item-title>
					<v-list-item-subtitle>
						<v-menu open-on-hover>
							<template #activator="{ props }">
								<span v-bind="props" class="text-secondary">
									{{
										item.publisherData.name.length > 10
											? item.publisherData.name.slice(
													0,
													10,
												) + "..."
											: item.publisherData.name
									}}
								</span>
							</template>
							<PublisherPopover :publisher="item.publisherData" />
						</v-menu>
					</v-list-item-subtitle>
				</v-list-item>
			</div>
		</div>
	</v-sheet>
</template>

<script lang="ts" setup>
import PublisherPopover from "./PublisherPopover.vue";
defineProps<{ item: Detail }>();
</script>

<style></style>
