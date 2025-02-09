<template>
	<v-bottom-sheet :model-value="show">
		<v-sheet
			class="d-flex justify-space-between align-center error-banner w-100 ga-2 pa-2">
			<div class="d-flex align-center ga-2">
				<v-icon>mdi-server-off</v-icon>
				<span> {{ message || "" }}</span>
			</div>
			<div class="d-flex ga-2 align-center">
				<v-btn
					variant="tonal"
					prepend-icon="mdi-reload"
					@click="reload"
					>{{ $t("actions.reload") }}</v-btn
				>
				<CloseBtn @click="$emit('close')"></CloseBtn>
			</div>
		</v-sheet>
	</v-bottom-sheet>
</template>

<script lang="ts" setup>
	import CloseBtn from "../Containment/Btns/CloseBtn.vue";
	defineEmits(["close"]);
	defineProps<{
		show: boolean;
		message: string | undefined;
	}>();

	const reload = () => {
		window.location.reload();
	};
</script>

<style>
	.error-banner {
		border: 1px solid red;
	}
</style>
