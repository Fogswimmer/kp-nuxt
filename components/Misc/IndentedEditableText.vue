<template>
  <v-card rounded="lg" class="pa-2" variant="text" border>
    <div
      v-if="!editMode"
      :class="['text-body-1 pa-2', { 'text-body-2': compact }]"
    >
      <div
        v-if="text"
        ref="textContainer"
        class="text-container"
        :class="{ expanded: !collapsed }"
      >
        <div v-for="(paragraph, index) in formattedText" :key="index">
          <p>{{ paragraph }}</p>
        </div>
      </div>
      <v-skeleton-loader v-else type="text" />
      <div class="mt-2 text-center">
        <ExpandBtn
          v-if="shouldShowExpandButton"
          :expanded="!collapsed"
          @click="collapsed = !collapsed"
        />
      </div>
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
import ExpandBtn from "../Containment/Btns/ExpandBtn.vue";

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
const collapsed = ref<boolean>(true);

const textContainer = ref<HTMLElement | null>(null);
const shouldShowExpandButton = ref(false);

const formattedText = computed(() =>
  props.text
    ? props.text
        .trim()
        .split("\n")
        .map((p) => p.replace(/[\u200B\r\t\xa0]/g, "").trim())
        .map((p) => p.replace(/^\.+|\.+$/g, ""))
        .filter((p) => p.length > 0)
    : []
);


onMounted(() => {
  if (textContainer.value) {
    const observer = new ResizeObserver(() => {
      if (textContainer.value) {
        if (collapsed.value) {
          shouldShowExpandButton.value = textContainer.value.scrollHeight > textContainer.value.clientHeight;
        }
      }
    });

    observer.observe(textContainer.value);
  }
});
</script>

<style sroped>
.text-container {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  max-height: calc(1.2em * 4);
}

.expanded {
  max-height: none;
  line-clamp: unset;
  -webkit-line-clamp: unset;
}
</style>
