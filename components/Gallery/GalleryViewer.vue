<template>
	<div>
		<v-slide-group center-active>
			<v-slide-group-item
				v-for="(img, index) in sliderArr"
				:key="index"
				:value="index">
				<v-card
					:height="SLIDER_HEIGHT"
					:width="CARD_WIDTH"
					class="ma-2"
					@click="openFullScreenModeOnClick(index)">
					<template #image>
						<BaseImg
							v-if="img"
							:img-src="img"
							:img-options="galleryImgOptions">
						</BaseImg>
						<v-sheet
							v-else
							rounded="lg"
							class="pa-2 cursor-pointer"
							color="surface-variant"
							width="100%"
							height="100%">
							<div
								class="d-flex flex-column align-center justify-center fill-height">
								<span class="text-caption"
									>{{ $t("general.available_for_upload") }}
								</span>
							</div>
						</v-sheet>
					</template>
				</v-card>
			</v-slide-group-item>
		</v-slide-group>
		<GalleryFullscreenViewer
			v-model:show-gallery="fullscreenMode"
			v-model:active-img="activeImg"
			:gallery-content="gallery"
			:name="entityName"
			:no-content-label="$t('pages.films.no_gallery')"
			@close="fullscreenMode = false" />
	</div>
</template>

<script lang="ts" setup>
	import BaseImg from "~/components/Containment/Img/BaseImg.vue";
	import GalleryFullscreenViewer from "./GalleryFullscreenViewer.vue";
	const emit = defineEmits(["editor:open"]);
	const props = defineProps<{
		sliderArr: string[];
		gallery: string[];
		entityName: string;
		loading: boolean;
		disabled?: boolean;
	}>();
	const fullscreenMode = ref(false);
	const activeImg = ref(0);
	const galleryImgOptions = {
		height: 400,
		cover: true,
		uploader: true,
		placeholderOptions: {
			displayIcon: true,
		},
	} as ImgOptions;

	const SLIDER_HEIGHT = 275;
	const CARD_WIDTH = 180;

	const openFullScreenModeOnClick = (index: number) => {
		if (props.gallery[index]) {
			fullscreenMode.value = true;
			activeImg.value = index;
		} else if (props.disabled) return;
		else {
			emit("editor:open");
		}
	};
</script>
