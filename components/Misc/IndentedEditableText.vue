<template>
	<div>
		<div
			v-if="!editMode"
			class="text-body-1 overflow-auto pa-2">
			<div v-if="text">
				<p
					v-for="(paragraph, index) in text.split('\n')"
					:key="index"
					>{{ paragraph || "" }}
				</p>
			</div>
			<v-skeleton-loader
				v-else
				type="text"></v-skeleton-loader>
		</div>
		<v-confirm-edit
			v-else
			v-model="editModeText"
			@save="$emit('sumbit:edit', editModeText)">
			<template #default="{ model: proxyModel, actions }">
				<v-card variant="outlined">
					<template #text>
						<v-textarea
							v-model="proxyModel.value"
							:messages="messages"
							auto-grow
							rows="5"></v-textarea>
					</template>
					<template #actions>
						<v-spacer></v-spacer>
						<component :is="actions"></component>
					</template>
				</v-card>
			</template>
		</v-confirm-edit>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		editMode: boolean;
		text: string;
		messages: string;
	}>();
	const editModeText = ref(props.text);
	const emits = defineEmits(["sumbit:edit"]);
</script>

<style></style>
