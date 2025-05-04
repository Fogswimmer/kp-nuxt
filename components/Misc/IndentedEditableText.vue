<template>
  <v-card rounded="lg" class="pa-2" variant="text" border>
    <div
      v-if="!editMode"
      :class="['text-body-1 pa-2', { 'text-body-2': compact }]"
    >
      <v-virtual-scroll
        v-if="text"
        :height="200"
        :items="formattedText || []"
        transition="fade-transition"
      >
        <template #default="{ item }">
          <p>{{ item }}</p>
        </template>
      </v-virtual-scroll>

      <v-skeleton-loader v-else type="text" />
    </div>
    <v-confirm-edit
      v-else
      v-model="editModeText"
      @save="$emit('sumbit:edit', editModeText)"
    >
      <template #default="{ model: proxyModel, actions }">
        <v-card variant="outlined">
          <template #text>
            <v-textarea
              v-model="proxyModel.value"
              :messages="messages || ''"
              auto-grow
              rows="5"
            />
          </template>
          <template #actions>
            <v-spacer />
            <component :is="actions" />
          </template>
        </v-card>
      </template>
    </v-confirm-edit>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps<{
  editMode: boolean;
  text: string;
  messages?: string;
  compact?: boolean;
}>();

defineEmits<{
  (e: "sumbit:edit", value: string): void;
}>();

const editModeText = ref<string>(props.text);

const formattedText = computed(() =>
  props.text
    ? props.text
        .trim()
        .split("\n")
        .map((p) => p.replace(/[\u200B\r\t\xa0]/g, "").trim())
        .filter((p) => p.length > 0)
    : []
);
</script>

<style sroped></style>
