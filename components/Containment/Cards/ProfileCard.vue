<template>
  <v-card :loading="loading" max-width="280" border class="mt-1">
    <v-toolbar density="compact">
      <v-toolbar-title>{{
        currentUser?.displayName || currentUser?.username
      }}</v-toolbar-title>

      <v-btn
        :title="$t('actions.edit')"
        icon
        size="small"
        @click.stop="$emit('edit')"
      >
        <v-icon icon="mdi-pencil" />
      </v-btn>
      <v-btn
        :title="$t('actions.edit')"
        icon
        color="warning"
        size="small"
        @click.stop="$emit('logout')"
      >
        <v-icon icon="mdi-logout" />
      </v-btn>
    </v-toolbar>
    <v-divider />
    <section class="text-center pa-2">
      <div class="position-relative">
        <v-avatar
          size="200"
          border
          class="cursor-pointer"
          @click.stop="showAvatarEditBtn = !showAvatarEditBtn"
        >
          <v-img v-if="currentUser?.avatar" :src="currentUser?.avatar" cover>
            <template #placeholder>
              <ImgPlaceholder />
            </template>
            <template #error>
              <ErrorPlaceHolder />
            </template>
          </v-img>
          <v-icon v-else icon="mdi-account" size="64" />
        </v-avatar>
        <v-fab
          :active="showAvatarEditBtn"
          absolute
          color="secondary"
          location="bottom end"
          icon="mdi-pencil"
          @click.stop="$emit('avatar:edit')"
        />
      </div>
      <v-divider class="mt-2" />
    </section>
    <v-list density="compact" nav>
      <v-list-item :title="computedLastLogin"> </v-list-item>
      <v-list-item
        v-for="(info, i) in computedGeneralInfo"
        :key="i"
        :title="info.title"
        :subtitle="info.value || $t('general.no_data')"
      />
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
import ImgPlaceholder from "../Img/ImgPlaceholder.vue";
import ErrorPlaceHolder from "../Img/ErrorPlaceHolder.vue";

const props = defineProps<{
  currentUser: CurrentUser;
  loading: boolean;
  isAdmin: boolean;
}>();

defineEmits<{
  (e: "edit" | "logout" | "avatar:edit" | "close"): void;
}>();

const { locale, t } = useI18n();

const showAvatarEditBtn = ref<boolean>(false);
const computedLastLogin = computed((): string => {
  const lastLogin = new Date(
    props.currentUser?.lastLogin || 0
  ).toLocaleString();
  return t("pages.profile.last_login", { time: lastLogin });
});

const computedGeneralInfo = computed((): Detail[] => {
  return [
    {
      title: t("forms.person.age"),
      value:
        locale.value === "ru"
          ? declineInRussian(props.currentUser?.age || 0, [
              "год",
              "года",
              "лет",
            ])
          : props.currentUser?.age + " " + t("general.years_old") || "",
    },
    {
      title: t("auth.about"),
      value: props.currentUser?.about || "",
      icon: "",
    },
  ];
});
</script>

<style></style>
