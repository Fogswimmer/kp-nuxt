<template>
	<div>
		<v-card
			v-if="films.length && $vuetify.display.mdAndUp"
			:title="$t('pages.films.similar_genres')"
			prepend-icon="mdi-filmstrip"
			flat
		>
			<v-card-text>
				<v-list variant="plain">
					<v-list-item
						v-for="(film, i) in films"
						:key="i"
						class="my-2 text-center"
						:value="film.id"
						elevation="2"
						border
						rounded="lg"
						:to="localeRoute('/films/' + film.slug)"
					>
						<v-list-item-title
							class="font-weight-bold text-primary"
						>
							{{
								getName(
									film?.name || "",
									film?.internationalName || "",
								)
							}}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ film.releaseYear }}
						</v-list-item-subtitle>
						<v-list-item-media class="mt-2">
							<v-img
								:src="film.poster || ''"
								rounded="lg"
								height="250"
								width="200"
							/>
						</v-list-item-media>
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>

		<v-slide-group v-else-if="$vuetify.display.smAndDown">
			<v-slide-group-item v-for="(film, i) in films" :key="i">
				<v-card
					:title="
						getName(film?.name || '', film?.internationalName || '')
					"
					width="200"
					height="300"
					variant="tonal"
					rounded="lg"
					class="text-center mr-4"
					:to="localeRoute('/films/' + film.slug)"
				>
					<template #subtitle>
						<v-rating
							:model-value="film?.rating || 0"
							readonly
							size="small"
							density="compact"
							color="yellow-darken-2"
						/>
					</template>
					<v-card-text>
						<v-img
							:src="film.poster || ''"
							rounded="lg"
							height="200"
							width="300"
							cover
						>
							<template #placeholder>
								<ImgPlaceholder :loading="loading" />
							</template>
							<template #error>
								<ErrorPlaceHolder />
							</template>
						</v-img>
					</v-card-text>
				</v-card>
			</v-slide-group-item>
		</v-slide-group>
	</div>
</template>

<script lang="ts" setup>
import ImgPlaceholder from "../Containment/Img/ImgPlaceholder.vue";
import ErrorPlaceHolder from "../Containment/Img/ErrorPlaceHolder.vue";

defineProps<{
	films: IFilm[];
	loading: boolean;
}>();

const localeRoute = useLocaleRoute();
const getName = useInternationalName();
</script>

<style></style>
