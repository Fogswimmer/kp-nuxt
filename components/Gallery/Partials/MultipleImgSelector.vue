<template>
	<v-card class="pa-2">
		<v-item-group
			v-model="selectedItems"
			multiple
			@update:model-value="$emit('update:selected', $event)"
		>
			<v-container
				style="max-height: calc(100vh - 120px); overflow-y: auto"
			>
				<v-row>
					<v-col
						v-for="(img, index) in sliderGalleryArr"
						:key="index"
						cols="12"
						sm="12"
						md="6"
						lg="3"
					>
						<v-item v-slot="{ isSelected, selectedClass, toggle }">
							<v-sheet v-if="img" class="text-center">
								<v-card
									:value="index"
									rounded="lg"
									:color="isSelected ? 'error' : ''"
									:class="[
										'd-flex align-center justify-center',
										selectedClass,
									]"
									:height="cardHeight"
									:image="img || ''"
									@click="toggle"
								>
									<v-scroll-y-transition>
										<div
											v-if="isSelected"
											:class="[
												'd-flex fill-height w-100 flex-column align-center justify-center position-relative',
												{
													'bg-selected-remove':
														isSelected,
												},
											]"
										>
											<v-btn
												icon
												variant="tonal"
												color="white"
											>
												<v-icon
													size="x-large"
													class="position-absolute"
													>{{
														img
															? "mdi-close"
															: "mdi-plus"
													}}</v-icon
												>
											</v-btn>
										</div>
									</v-scroll-y-transition>
								</v-card>
							</v-sheet>
							<div v-if="img" class="w-100 text-center">
								<v-chip label class="ma-2">{{
									img
										? $t("general.img") + " " + (index + 1)
										: ""
								}}</v-chip>
							</div>
						</v-item>
					</v-col>
				</v-row>
			</v-container>
		</v-item-group>
		<template #actions>
			<v-spacer />
			<v-btn
				prepend-icon="mdi-close"
				:disabled="!selectedItems.length"
				@click="$emit('gallery:clear')"
				>{{ $t("actions.clear") }}</v-btn
			>
			<v-btn
				prepend-icon="mdi-delete"
				color="error"
				:disabled="!selectedItems.length"
				@click="$emit('delete:selected', selectedItems)"
				>{{ $t("actions.remove") }}</v-btn
			>
		</template>
	</v-card>
</template>

<script lang="ts" setup>
defineProps<{
	sliderGalleryArr: string[];
	cardHeight?: number;
}>();

defineEmits<{
	(e: "update:selected" | "delete:selected", value: Array<number>): void;
	(e: "gallery:clear"): void;
}>();
const selectedItems = ref<Array<number>>([]);
</script>

<style></style>
