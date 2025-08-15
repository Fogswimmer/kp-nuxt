<template>
	<v-card variant="outlined" :width="$vuetify.display.mdAndUp ? 600 : ''">
		<v-toolbar>
			<template #prepend>
				<BackBtn />
			</template>
			<v-toolbar-title>
				{{ title }}
			</v-toolbar-title>
		</v-toolbar>
		<v-card-text>
			<slot />
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
import BackBtn from "../Btns/BackBtn.vue";

defineProps<{
	title: string;
}>();
</script>

<style></style>
