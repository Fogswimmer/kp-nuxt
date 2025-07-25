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
				</nuxt-link>
			</template>
			<template #subtitle>
				<v-chip-group>
					<v-chip v-for="(chip, j) in item.value" :key="j">
						{{ chip }}</v-chip
					>
				</v-chip-group>
			</template>
			<template #prepend>
				<v-avatar :size="$vuetify.display.smAndDown ? 84 : 100">
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
