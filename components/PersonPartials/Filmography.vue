<!-- eslint-disable vue/no-template-shadow -->
<template>
	<v-card variant="text">
		<template v-if="computedFilmographyDispay">
			<v-list v-if="$vuetify.display.smAndDown">
				<div
					v-for="(value, key, index) in person?.filmWorks"
					:key="index"
					class="my-2"
				>
					<v-list-group v-if="value && value.length > 0" :value="key">
						<template #activator="{ props }">
							<v-list-item
								v-bind="props"
								prepend-icon="mdi-list-box"
							>
								<v-list-item-title>
									{{ defineCardTitle(key) }}
								</v-list-item-title>
							</v-list-item>
						</template>
						<v-list-item
							v-for="(item, i) in value"
							:key="i"
							:to="$localeRoute(`/films/${item?.slug}`)"
							:value="item"
							:prepend-avatar="item?.poster || ''"
						>
							<v-list-item-title>
								<nuxt-link class="text-primary">
									{{
										getName(
											item?.name,
											item?.internationalName || "",
										)
									}}
								</nuxt-link>
							</v-list-item-title>
							<v-list-item-subtitle>
								{{ item.releaseYear || $t("general.no_data") }}
							</v-list-item-subtitle>
						</v-list-item>
						<v-divider
							v-if="
								person?.filmWorks &&
								index < Object.keys(person.filmWorks).length - 1
							"
						/>
					</v-list-group>
				</div>
			</v-list>
			<v-card
				v-else
				flat
				prepend-icon="mdi-filmstrip"
				:title="$t('pages.persons.filmography')"
			>
				<v-card-text>
					<v-divider class="mt-2" />
					<v-list variant="plain">
						<div
							v-for="(value, key, index) in person?.filmWorks"
							:key="`filmwork-category-${key}-${index}`"
							class="my-2"
						>
							<v-list-subheader>
								{{ defineCardTitle(key) }}
							</v-list-subheader>
							<v-divider />
							<v-list-item
								v-for="(item, i) in value"
								:key="`filmwork-${key}-${item?.slug || item?.id || i}`"
								:to="$localeRoute(`/films/${item?.slug}`)"
								:value="item"
								class="text-center my-2 mb-2"
								elevation="1"
							>
								<v-list-item-title>
									<span class="font-weight-bold text-primary">
										{{
											getName(
												item.name,
												item?.internationalName || "",
											)
										}}
									</span>
								</v-list-item-title>
								<v-list-item-subtitle>
									{{
										item.releaseYear ||
										$t("general.no_data")
									}}
								</v-list-item-subtitle>
								<v-list-item-media>
									<v-img
										v-if="item.poster"
										:src="item.poster"
										rounded="lg"
										size="130"
									/>
								</v-list-item-media>
							</v-list-item>
							<v-divider
								v-if="
									person?.filmWorks &&
									index <
										Object.keys(person.filmWorks).length - 1
								"
								:key="`divider-${key}-${index}`"
							/>
						</div>
					</v-list>
				</v-card-text>
			</v-card>
		</template>
		<v-empty-state
			v-else
			:title="$t('empty_states.filmography')"
			icon="mdi-filmstrip"
		/>
	</v-card>
</template>

<script lang="ts" setup>
const props = defineProps<{
	person?: IPerson | null;
}>();

const { t } = useI18n();
const getName = useInternationalName();
const defineCardTitle = (key: string) => {
	switch (key) {
		case "actedInFilms":
			return t("pages.persons.featuredInFilms");
		case "directedFilms":
			return t("pages.persons.directed_films");
		case "writtenFilms":
			return t("pages.persons.written_films");
		case "producedFilms":
			return t("pages.persons.produced_films");
		case "composedFilms":
			return t("pages.persons.composed_films");
		default:
			return key;
	}
};

const computedFilmographyDispay = computed(() => {
	return (
		props.person?.filmWorks &&
		Object.values(props.person?.filmWorks).some((value) => value.length > 0)
	);
});
</script>

<style></style>
