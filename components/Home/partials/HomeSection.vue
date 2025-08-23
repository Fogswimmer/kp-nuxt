<template>
	<v-card height="100%" variant="text" class="mb-2">
		<v-card-title>
			<div class="d-flex flex-column ga-1">
				<h4
					class="text-lg-h4 mb-2 text-primary text-h5 text-center text-uppercase"
				>
					{{ title }}
				</h4>
				<SectionDivider />
			</div>
		</v-card-title>
		<v-card-text>
			<slot />
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
import SectionDivider from "~/components/Misc/SectionDivider.vue";

defineProps<{
	title: string;
}>();
</script>
