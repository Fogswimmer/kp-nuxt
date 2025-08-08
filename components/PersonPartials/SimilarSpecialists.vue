<template>
	<v-card
		v-if="persons.length && $vuetify.display.mdAndUp"
		:title="$t('pages.persons.similar')"
		prepend-icon="mdi-account"
		flat
	>
		<v-card-text>
			<v-list variant="plain" class="pa-2">
				<v-list-item
					v-for="(person, i) in persons"
					:key="i"
					class="my-2 text-center"
					:value="person.id"
					elevation="2"
					border
					rounded="lg"
					:to="localeRoute('/persons/' + person.slug)"
				>
					<v-list-item-title class="font-weight-bold text-primary">
						{{
							getName(
								person?.name || "",
								person?.internationalName || "",
							)
						}}
					</v-list-item-title>
					<v-list-item-subtitle class="d-flex justify-center">
						{{ person.specialtyNames.join(", ") }}
					</v-list-item-subtitle>
					<v-list-item-media class="mt-2">
						<v-img
							:src="person.avatar || ''"
							rounded="lg"
							height="250"
							width="200"
							cover
						/>
					</v-list-item-media>
				</v-list-item>
			</v-list>
		</v-card-text>
	</v-card>

	<v-slide-group v-else-if="$vuetify.display.smAndDown">
		<v-slide-group-item v-for="(person, i) in persons" :key="i">
			<v-card
				:title="
					getName(person?.name || '', person?.internationalName || '')
				"
				width="200"
				height="300"
				variant="tonal"
				rounded="lg"
				class="text-center mr-4"
				:to="localeRoute('/persons/' + person.slug)"
			>
				<v-card-subtitle class="d-flex justify-center">
					{{ person.specialtyNames.join(", ") }}
				</v-card-subtitle>
				<v-card-text class="d-flex justify-center">
					<v-img
						:src="person.avatar || ''"
						rounded="lg"
						height="170"
						width="150"
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
</template>

<script lang="ts" setup>
import ImgPlaceholder from "../Containment/Img/ImgPlaceholder.vue";
import ErrorPlaceHolder from "../Containment/Img/ErrorPlaceHolder.vue";

defineProps<{
	persons: IPerson[];
	loading: boolean;
}>();

const localeRoute = useLocaleRoute();
const getName = useInternationalName();
</script>

<style></style>
