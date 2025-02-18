<template>
  <div class="position-relative">
    <v-sheet height="200" border color="red">
      <div class="d-flex justify-center">
        <div class="position-absolute text-center" style="top: -50%">
          <div>
            <v-avatar size="200" border>
              <v-img :src="avatar || ''" cover>
                <template #placeholder>
                  <v-sheet height="100%">
                    <div class="d-flex align-center justify-center h-100">
                      <v-icon size="64" icon="mdi-account-off" />
                    </div>
                  </v-sheet>
                </template>
                <template #error>
                  <v-sheet height="100%">
                    <div class="d-flex align-center justify-center h-100">
                      <v-icon color="error" icon="mdi-image-broken" />
                    </div>
                  </v-sheet>
                </template>
              </v-img>
            </v-avatar>
          </div>
          <template v-if="!loading">
            <span class="text-h6 text-lg-h4 font-weight-bold text-primary">
              {{ title }}</span
            >
            <div class="text-caption text-lg-subtitle-1">
              {{
                generalInfo
                  ?.map((item: Detail) => item.value)
                  .join(", ")
              }}
            </div>
            <div class="text-capitalize text-caption text-lg-subtitle-1">
              {{ subtitle }}
            </div>
          </template>
          <template v-else>
            <v-skeleton-loader
              class="stained-glass"
              type="list-item-three-line"
            />
          </template>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string|Detail[];
  subtitle: string|Detail[];
  generalInfo: Detail[];
  avatar: string;
  loading: boolean;
}>();


</script>

<style></style>
