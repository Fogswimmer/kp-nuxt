<template>
	<v-menu v-if="$vuetify.display.smAndDown" location="bottom end">
		<template #activator="{ props }">
			<v-btn icon :disabled="!isAuthenticated" v-bind="props">
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</template>
		<v-list density="compact" class="bg-surface">
			<v-list-subheader value="edit">
				{{ $t("actions.edit") }}
			</v-list-subheader>
			<v-list-item
				:title="$t('pages.general_info')"
				prepend-icon="mdi-information"
				value="info"
				@click="$emit('edit:general')"
			/>
			<v-list-item
				:title="$t('pages.detailed_info')"
				prepend-icon="mdi-details"
				value="details"
				@click="$emit('edit:bio')"
			/>
			<v-list-item
				:title="$t('pages.gallery')"
				prepend-icon="mdi-view-gallery"
				value="gallery"
				@click="$emit('edit:gallery')"
			/>
			<v-divider />
			<v-list-item
				:title="$t('actions.remove')"
				prepend-icon="mdi-delete"
				value="remove"
				base-color="error"
				@click="$emit('delete:person')"
			/>
		</v-list>
	</v-menu>
	<div v-else class="d-flex ga-1">
		<client-only>
			<v-menu>
				<template #activator="{ props }">
					<v-btn
						v-bind="props"
						:disabled="!isAuthenticated"
						prepend-icon="mdi-pencil"
						@click.prevent.stop
					>
						{{ $t("actions.edit") }}
					</v-btn>
				</template>
				<v-list>
					<v-list-item
						:title="$t('pages.general_info')"
						prepend-icon="mdi-information"
						value="info"
						@click="$emit('edit:general')"
					/>
					<v-list-item
						:title="$t('pages.detailed_info')"
						prepend-icon="mdi-details"
						value="details"
						@click="$emit('edit:bio')"
					/>
					<v-list-item
						:title="$t('pages.gallery')"
						prepend-icon="mdi-view-gallery"
						value="gallery"
						@click="$emit('edit:gallery')"
					/>
				</v-list>
			</v-menu>
		</client-only>
		<v-btn
			prepend-icon="mdi-delete"
			:disabled="!isAuthenticated"
			base-color="error"
			@click="$emit('delete:person')"
		>
			{{ $t("actions.remove") }}
		</v-btn>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	isAuthenticated: boolean;
}>();
defineEmits<{
	(
		event: "edit:general" | "edit:bio" | "edit:gallery" | "delete:person",
	): void;
}>();
</script>

<style></style>
