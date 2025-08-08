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
							:to="localeRoute(`/films/${item?.slug}`)"
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
					<v-container>
						<v-row>
							<v-col
								v-for="(value, key, index) in person?.filmWorks"
								:key="`filmwork-category-${key}-${index}`"
								class="my-2"
							>
								<v-card
									:subtitle="defineCardTitle(key)"
									max-height="300"
									height="100%"
									class="overflow-y-auto"
								>
									<v-list>
										<v-list-item
											v-for="(item, i) in value"
											:key="`filmwork-${key}-${item?.slug || item?.id || i}`"
											:to="
												localeRoute(
													`/films/${item?.slug}`,
												)
											"
											:value="item"
											class="my-2"
											rounded="lg"
											:title="
												getName(
													item.name,
													item?.internationalName ||
														'',
												)
											"
											:subtitle="
												item.releaseYear ||
												$t('general.no_data')
											"
											:prepend-avatar="item.poster || ''"
										/>
									</v-list>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
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
const localeRoute = useLocaleRoute();
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
