<template>
	<v-card>
		<v-card-text>
			<v-item-group
				multiple
				v-model="selectedItems"
				@update:model-value="$emit('update:selected', $event)">
				<v-container>
					<v-row>
						<v-col
							cols="auto"
							v-for="(img, index) in sliderGalleryArr"
							:key="index">
							<v-item v-slot="{ isSelected, selectedClass, toggle }">
								<v-sheet class="text-center">
									<v-card
										v-if="img"
										:value="index"
										rounded="lg"
										:color="isSelected ? 'error' : ''"
										:class="[
											'd-flex align-center justify-center',
											selectedClass,
										]"
										:height="cardHeight"
										:width="cardHeight ? cardHeight * 0.75 : 0"
										:image="img || ''"
										@click="toggle">
										<v-scroll-y-transition>
											<div
												v-if="isSelected"
												:class="[
													'd-flex fill-height w-100 flex-column align-center justify-center position-relative',
													{ 'bg-selected-remove': isSelected },
												]">
												<v-btn
													icon
													variant="tonal"
													color="white">
													<v-icon
														size="x-large"
														class="position-absolute"
														>{{ img ? "mdi-close" : "mdi-plus" }}</v-icon
													>
												</v-btn>
											</div>
										</v-scroll-y-transition>
									</v-card>
									<v-label
										class="mt-2"
										v-if="img"
										>{{ $t("general.img") + " " + (index + 1) }}</v-label
									>
								</v-sheet>
							</v-item>
						</v-col>
					</v-row>
				</v-container>
			</v-item-group>
		</v-card-text>
		<template v-slot:actions>
			<v-spacer></v-spacer>
			<v-btn
				prepend-icon="mdi-close"
				@click="emit('gallery:clear')"
				:disabled="!selectedItems.length"
				>{{ $t("actions.clear") }}</v-btn
			>
			<v-btn
				prepend-icon="mdi-delete"
				@click="$emit('delete:selected', selectedItems)"
				color="error"
				:disabled="!selectedItems.length"
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
	const emit = defineEmits([
		"update:selected",
		"delete:selected",
		"gallery:clear",
	]);

	const selectedItems = ref<Array<number>>([]);
</script>

<style></style>
