<template>
	<v-list-item
		v-for="(item, i) in items"
		:key="i"
		rounded="lg"
		lines="two"
		class="my-3"
		elevation="5"
		border
		:value="item"
	>
		<template #title>
			<nuxt-link
				:to="localeRoute(item.to || '/')"
				class="text-primary text-lg-h6 d-flex ga-1 align-center"
			>
				<span class="text-truncate">{{ item.title }}</span>
				<span v-if="item.releaseYear">({{ item.releaseYear }})</span>
				<span class="text-lg-body-1 text-caption ml-2">{{
					item.flag
				}}</span>
			</nuxt-link>

			<v-chip
				v-if="item.age"
				variant="plain"
				size="small"
				prepend-icon="mdi-account"
				>{{ useDeclineAge(Number(item.age) || 0) }}</v-chip
			>
			<v-chip
				v-if="item.gender"
				prepend-icon="mdi-gender-male-female"
				variant="plain"
				size="small"
			>
				{{ item.gender }}</v-chip
			>
		</template>
		<template #subtitle>
			<v-chip-group>
				<v-chip v-for="(chip, j) in item.value" :key="j" size="small">
					{{ chip }}</v-chip
				>
			</v-chip-group>
		</template>
		<template #prepend>
			<nuxt-link :to="item.to" class="mr-2">
				<v-avatar :size="$vuetify.display.mdAndUp ? 100 : 64">
					<v-img :src="item.avatar">
						<template #placeholder>
							<v-sheet height="100%">
								<div
									class="d-flex align-center justify-center fill-height"
								>
									<v-icon icon="mdi-image-off" />
								</div>
							</v-sheet>
						</template>
					</v-img>
				</v-avatar>
			</nuxt-link>
		</template>
		<template v-if="$vuetify.display.mdAndUp" #append>
			<ListCardInfo :item="item" />
		</template>
	</v-list-item>
</template>

<script lang="ts" setup>
import ListCardInfo from "./ListCardInfo.vue";

const localeRoute = useLocaleRoute();
defineProps<{ items: Detail[] }>();
</script>

<style></style>
