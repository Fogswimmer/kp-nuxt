<template>
	<div class="d-flex flex-column ga-2" style="max-width: 100%">
		<span class="font-weight-bold text-lg-h5 text-h5 text-truncate">{{
			title
		}}</span>
		<v-list class="pa-2" variant="plain">
			<v-list-item
				v-for="(detail, index) in generalInfo"
				:key="index"
				:subtitle="$t(detail.title)"
				:prepend-icon="detail.icon"
				class="mb-3"
			>
				<v-list-item-title class="font-bold">
					{{ detail.value || $t("general.no_data") }}
				</v-list-item-title>
				<template #prepend>
					<v-icon v-if="!detail.flag">
						{{ detail.icon }}
					</v-icon>
					<v-avatar v-else class="pr-4">
						{{ detail.flag }}
					</v-avatar>
				</template>
			</v-list-item>
		</v-list>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	title: string;
	generalInfo: Detail[];
}>();
</script>

<style></style>
