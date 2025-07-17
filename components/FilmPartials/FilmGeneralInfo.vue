<template>
	<v-list class="pa-2">
		<v-list-item
			v-for="(detail, index) in generalInfo"
			:key="index"
			:subtitle="$t(detail.title)"
			:prepend-icon="detail.icon"
			class="mb-2"
			rounded="lg"
		>
			<v-list-item-title class="font-bold">
				{{ detail.value || $t("general.no_data") }}
			</v-list-item-title>
			<template #prepend>
				<v-icon v-if="!detail.flag">{{ detail.icon }}</v-icon>
				<v-avatar v-else class="pr-4">{{ detail.flag }}</v-avatar>
			</template>
		</v-list-item>
	</v-list>
</template>

<script lang="ts" setup>
defineProps<{
	generalInfo: Detail[];
}>();
</script>

<style></style>
