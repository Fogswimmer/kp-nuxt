<template>
	<v-sheet rounded="lg">
		<v-carousel
			:model-value="currentFilm"
			hide-delimiter-background
			hide-delimiters
			show-arrows="hover"
			progress="primary"
			color="primary"
			touch
			cycle
			height="500"
			@update:model-value="$emit('update:currentFilm', $event)"
		>
			<v-carousel-item
				v-for="(item, i) in items"
				:key="i"
				:value="item"
				:src="item.avatar"
				class="img-blur"
				cover
			>
				>
				<template #placeholder>
					<ImgPlaceholder />
				</template>
				<template #error>
					<ErrorPlaceHolder />
				</template>
			</v-carousel-item>

			<v-overlay
				:scrim="false"
				content-class="w-100 h-100 d-flex flex-column align-center justify-space-between pointer-pass-through py-3"
				contained
				model-value
				no-click-animation
				persistent
			>
				<v-scroll-x-transition mode="out-in" appear>
					<v-card
						height="100%"
						:width="$vuetify.display.mdAndUp ? 300 : '100%'"
						:image="currentFilm.avatar"
						class="position-relative"
						elevation="10"
						:to="currentFilm.to"
					>
						<v-card-title
							class="dark-glassed text-white text-center text-truncate"
						>
							{{ currentFilm.title }}
							({{ currentFilm.releaseYear }})
						</v-card-title>

						<div
							class="position-absolute bottom-0 right-0 left-0 w-100 text-center pa-2 dark-glassed"
						>
							<v-chip color="yellow-darken-2">
								<v-rating
									:model-value="currentFilm.rating || 0"
									readonly
								/>
							</v-chip>
						</div>
					</v-card>
				</v-scroll-x-transition>
			</v-overlay>
		</v-carousel>
	</v-sheet>
</template>

<script lang="ts" setup>
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";
defineProps<{
	items: Detail[];
	currentFilm: Detail;
}>();
defineEmits(["update:currentFilm"]);
</script>

<style></style>
