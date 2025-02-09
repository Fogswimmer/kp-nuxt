<template>
	<nuxt-link
		to="/"
		class="d-flex align-center font-weight-bold text-lg-h5">
		<v-icon
			v-if="!$vuetify.display.mobile"
			icon="mdi-filmstrip"></v-icon>
		Kinopoisk Lite
	</nuxt-link>
</template>

<script lang="ts" setup></script>

<style></style>
