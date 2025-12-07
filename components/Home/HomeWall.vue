<template>
	<v-container fluid>
		<v-row>
			<v-col
				v-for="(item, index) in items"
				:key="index"
				cols="12"
				sm="12"
				md="6"
				lg="4"
				:class="[
					'intersection-item',
					{ 'slide-in': visibleItems.has(index) },
				]"
			>
				<HomeWallItem
					v-intersect="useIntersection(index, visibleItems)"
					:item="item"
					:loading="loading"
					:with-chips="withChips"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
import HomeWallItem from "./partials/HomeWallItem.vue";

const visibleItems = ref(new Set<number>());

defineProps<{
	items: Detail[];
	loading: boolean;
	withChips?: boolean;
}>();
</script>

<style scoped>
.intersection-item {
	opacity: 0;
	transform: translateX(-50px);
	transition:
		opacity 0.6s ease-out,
		transform 0.6s ease-out;
}

.intersection-item.slide-in {
	opacity: 1;
	transform: translateX(0);
}
</style>
