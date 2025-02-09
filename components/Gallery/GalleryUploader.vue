<template>
	<v-card>
		<v-toolbar class="mb-10">
			<v-alert
				icon="mdi-information"
				border="start"
				:border-color="!uploadError ? 'primary' : 'error'">
				<v-chip label>
					<template v-if="!uploadError">
						{{ $t("general.available_for_upload") }}:
						{{ computedUploadCount }}
					</template>
					<template v-else> {{ $t("general.max_files_error") }}! </template>
				</v-chip>
			</v-alert>
		</v-toolbar>

		<v-file-upload
			v-model="previews"
			show-size
			chips
			clearable
			multiple
			density="comfortable"
			accept="image/*"
			divider-text="general.or"
			browse-text="general.browse_files"
			title="general.drag_and_drop"
			@update:model-value="handlePreupload">
			<template v-slot:item="{ props: itemProps }">
				<v-file-upload-item
					v-bind="itemProps"
					lines="one"
					nav>
					<template v-slot:clear="{ props: clearProps }">
						<v-btn
							color="primary"
							v-bind="clearProps"></v-btn>
					</template>
				</v-file-upload-item>
			</template>
		</v-file-upload>

		<template v-slot:actions>
			<v-spacer></v-spacer>
			<v-btn
				prepend-icon="mdi-close"
				@click="clearPreviews"
				:disabled="!previews.length"
				:color="uploadError ? 'error' : ''"
				>{{ $t("actions.clear") }}</v-btn
			>
			<v-btn
				prepend-icon="mdi-cloud"
				@click="$emit('files:upload', previews)"
				color="warning"
				:disabled="!previews.length || uploadError"
				>{{ $t("actions.upload") }}</v-btn
			>
		</template>
	</v-card>
</template>

<script lang="ts" setup>
	const emit = defineEmits(["files:preupload", "files:upload"]);
	const previews = ref<File[]>([]);
	const props = defineProps<{
		uploadCount: number;
	}>();

	const uploadError = computed((): boolean => {
		return previews.value.length > props.uploadCount;
	});

	const handlePreupload = () => {
		if (previews.value.length > props.uploadCount) {
			return;
		}

		emit("files:preupload", previews);
	};
	const computedUploadCount = computed((): number => {
		return props.uploadCount - previews.value.length;
	});

	const clearPreviews = () => {
		previews.value = [];
	};
</script>

<style></style>
