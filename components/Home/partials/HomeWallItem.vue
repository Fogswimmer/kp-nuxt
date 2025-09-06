<template>
	<div>
		<v-list-item v-if="$vuetify.display.smAndDown" rounded="lg" border>
			<v-list-item-title>
				<div class="d-flex w-100 align-center">
					<nuxt-link
						class="text-lg-h5 text-primary text-truncate"
						style="max-width: 75%"
						:to="item.to ? localeRoute(item.to) : '/'"
						>{{ item.title }}</nuxt-link
					>
					<v-spacer />
				</div>
			</v-list-item-title>
			<v-list-item-subtitle>
				<span v-if="item.value">{{ item.value }}</span>
			</v-list-item-subtitle>
			<template #prepend>
				<nuxt-link
					:to="item.to ? localeRoute(item.to) : '/'"
					class="mr-2"
				>
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
			</template>
			<template #append>
				<FilmRatingChip
					v-if="item.rating !== null"
					size="small"
					:rating="item.rating ? item?.rating.toString() : '0'"
				/>
			</template>
			<v-chip-group>
				<v-chip
					v-for="(chip, i) in item.chipsArr"
					:key="i"
					:to="chip.to"
				>
					{{ chip.name }}
				</v-chip>
			</v-chip-group>
		</v-list-item>
		<template v-else>
			<v-card
				v-if="!loading"
				height="400"
				class="text-center pa-2"
				rounded="lg"
				elevation="10"
			>
				<v-card-title>
					<span class="text-h5">{{ item.title }}</span>
				</v-card-title>
				<v-card-subtitle>
					<v-chip v-if="item.rating !== null" color="yellow-darken-2">
						<v-rating
							:model-value="item.rating || 0"
							density="compact"
							readonly
						/>
					</v-chip>
				</v-card-subtitle>
				<v-card-text>
					<nuxt-link :to="item.to ? localeRoute(item.to) : '/'">
						<v-avatar size="200" :image="item?.avatar" />
					</nuxt-link>

					<div class="pa-2 d-flex flex-column ga-2 align-center">
						<v-chip-group>
							<v-chip
								v-for="(chip, i) in item.chipsArr"
								:key="i"
								:to="chip.to"
							>
								{{ chip.name }}
							</v-chip>
						</v-chip-group>
					</div>
				</v-card-text>
			</v-card>
			<v-skeleton-loader v-else type="card" height="600" />
		</template>
	</div>
</template>

<script lang="ts" setup>
import FilmRatingChip from "~/components/Misc/FilmRatingChip.vue";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";

const localeRoute = useLocaleRoute();
defineProps<{
	item: Detail;
	loading: boolean;
}>();
</script>

<style></style>
