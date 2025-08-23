<template>
	<div>
		<ClientOnly>
			<v-navigation-drawer location="end" order="1" permanent width="300">
				<slot />
			</v-navigation-drawer>
		</ClientOnly>
	</div>
</template>

<script lang="ts" setup></script>

<style></style>
