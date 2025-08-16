<template>
	<v-container class="overflow-hidden pa-2 grid">
		<div
			v-for="(item, index) in items"
			:key="index"
			:class="['masonry-item', { 'fade-in': visibleItems.has(index) }]"
		>
			<HomeWallItem
				v-intersect="useIntersection(index, visibleItems)"
				:item="item"
				:loading="loading"
				:with-chips="withChips"
			/>
		</div>
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
.masonry-item {
	opacity: 0;
	transform: translateY(20px);
	transition:
		opacity 0.6s ease-out,
		transform 0.6s ease-out;
}

.masonry-item.fade-in {
	opacity: 1;
	transform: translateY(0);
}
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(375px, auto));
	gap: 1rem;
	justify-content: center;
}
</style>
