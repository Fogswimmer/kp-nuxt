<template>
	<GradientWrapper v-for="(item, i) in items" :key="i">
		<v-list-item
			border
			rounded="lg"
			lines="three"
			class="my-2"
			:value="item"
		>
			<template #title>
				<nuxt-link
					:to="$localeRoute(item.to || '/')"
					class="text-primary text-lg-h6 d-flex ga-1"
				>
					<span class="text-truncate">{{ item.title }}</span>
					<span v-if="item.releaseYear"
						>({{ item.releaseYear }})</span
					>
					{{ item.flag  }}
					<span>{{ item.flag }}</span>
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
					<v-chip
						v-for="(chip, j) in item.value"
						:key="j"
						color="secondary"
					>
						{{ chip }}</v-chip
					>
				</v-chip-group>
			</template>
			<template #prepend>
				<v-avatar :size="84">
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
			</template>
			<template v-if="$vuetify.display.mdAndUp" #append>
				<ListCardInfo :item="item" />
			</template>
		</v-list-item>
	</GradientWrapper>
</template>

<script lang="ts" setup>
import GradientWrapper from "./GradientWrapper.vue";
import ListCardInfo from "./ListCardInfo.vue";
defineProps<{ items: Detail[] }>();
</script>

<style></style>
