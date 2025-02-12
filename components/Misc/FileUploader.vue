<template>
  <v-dialog :model-value="opened">
    <v-file-upload
      :model-value="files"
      show-size
      color="transparent"
      density="compact"
      clearable
      accept="image/*"
      width="100%"
      
      :title="$t('general.drag_and_drop')"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <template #item="{ props: itemProps }">
        <v-file-upload-item v-bind="itemProps" lines="one" nav>
    
  
          <template #clear="{ props: clearProps }">
            <v-btn color="primary" v-bind="clearProps"/>
          </template>
        </v-file-upload-item>
      </template>
    </v-file-upload>
  </v-dialog>
</template>

<script lang="ts" setup>
defineEmits(["update:modelValue"]);
defineProps<{
  opened: boolean;
  files: File[];
  multiple: boolean;
}>();
</script>

<style></style>
