<template>
	<v-card rounded="lg" border>
		<v-card-title>
			<div class="d-flex w-100 align-center">
				<nuxt-link
					class="text-lg-h5 text-primary text-truncate"
					style="max-width: 75%"
					:to="item.to ? localeRoute(item.to) : '/'"
					>{{ item.title }}</nuxt-link
				>
				<v-spacer />
			</div>
		</v-card-title>
		<v-card-text>
			<nuxt-link :to="item.to ? localeRoute(item.to) : '/'" class="mr-2">
				<v-avatar :size="$vuetify.display.mdAndUp ? 112 : 64">
					<v-img :src="item?.avatar || ''">
						<template #placeholder>
							<ImgPlaceholder
								:loading="loading"
								icon="mdi-image"
							/>
						</template>
						<template #error>
							<ErrorPlaceHolder />
						</template>
					</v-img>
				</v-avatar>
			</nuxt-link>
		</v-card-text>
		<template #append>
			<FilmRatingChip
				v-if="item.rating && !withChips"
				size="small"
				:rating="item?.rating.toString()"
			/>
		</template>
		<v-chip-group v-if="withChips">
			<v-chip v-for="(chip, i) in item.chipsArr" :key="i" :to="chip.to">
				{{ chip.name }}
			</v-chip>
		</v-chip-group>
	</v-card>
</template>

<script lang="ts" setup>
import FilmRatingChip from "~/components/Misc/FilmRatingChip.vue";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";

const localeRoute = useLocaleRoute();
defineProps<{
	item: Detail;
	loading: boolean;
	withChips?: boolean;
}>();
</script>

<style></style>
