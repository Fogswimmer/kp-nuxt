<template>
	<v-card rounded="lg" height="100%" variant="text">
		<v-card-title>
			<div class="d-flex flex-column ga-1">
				<h4 class="text-lg-h4 text-h5 text-center text-uppercase">
					{{ title }}
				</h4>
				<SectionDivider />
			</div>
		</v-card-title>
		<slot />
	</v-card>
</template>

<script lang="ts" setup>
import SectionDivider from "~/components/Misc/SectionDivider.vue";

defineProps<{
	title: string;
}>();
</script>
