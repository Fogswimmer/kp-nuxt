<template>
	<v-sheet height="100vh" class="overlay">
		<div
			class="d-flex flex-column fill-height gap-2 align-center justify-center"
		>
			<span class="text-center">{{ $t("state.loading") }}...</span>
			<span class="progress"> </span>
		</div>
	</v-sheet>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 100%;
	height: 100%;
}

.progress {
	width: 48px;
	height: 48px;
	border: 5px solid #5e5e5e17;
	border-bottom-color: rgb(255, 174, 0);
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
