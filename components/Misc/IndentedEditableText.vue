<template>
  <v-sheet
    :class="
      $vuetify.theme.global.current.dark ? 'neutral-glass' : 'light-glass'
    "
    rounded="lg"
  >
    <div v-if="!editMode" class="text-body-1 overflow-auto pa-2">
      <div v-if="text" class="d-flex flex-column justify-center">
        <p
          v-for="(paragraph, index) in computedTruncatedText.split('\n')"
          :key="index"
        >
          {{ paragraph || "" }}
        </p>
        <div class="mt-2 text-center">
          <ExpandBtn
            v-if="text.length > 600"
            :expanded="!collapsed"
            @click="collapsed = !collapsed"
          />
        </div>
      </div>
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
              :messages="messages"
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
  </v-sheet>
</template>

<script lang="ts" setup>
import ExpandBtn from "../Containment/Btns/ExpandBtn.vue";

const props = defineProps<{
  editMode: boolean;
  text: string;
  messages: string;
}>();
defineEmits(["sumbit:edit"]);

const editModeText = ref<string>(props.text);
const collapsed = ref<boolean>(true);

const computedTruncatedText = computed(() => {
  if (props.text.length > 600) {
    return collapsed.value
      ? `${props.text.slice(0, 600).trim().replace(" .", "")}...`
      : props.text;
  }
  return props.text;
});
</script>

<style></style>
