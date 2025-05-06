<template>
  <v-card :loading="loading" max-width="280" border class="mt-1">
    <section class="text-center pa-2">
      <div class="position-relative">
        <v-avatar
          size="200"
          border
          class="cursor-pointer"
          @click.stop="showAvatarEditBtn = !showAvatarEditBtn"
        >
          <v-img :src="currentUser?.avatar || ''" cover>
            <template #placeholder>
              <ImgLoader />
            </template>
            <template #error>
              <ErrorPlaceHolder />
            </template>
          </v-img>
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
    </section>
    <v-list nav density="compact">
      <v-list-item class="text-caption">{{ computedLastLogin }}</v-list-item>
      <v-list-item
        v-for="(info, i) in computedGeneralInfo"
        :key="i"
        :title="info.title"
        :subtitle="info.value"
        lines="two"
      />
    </v-list>
    <v-divider />
    <v-card-actions>
      <v-btn
        :title="$t('actions.edit')"
        prepend-icon="mdi-pencil"
        size="small"
        @click.stop="$emit('edit')"
      >
        {{ $t("actions.edit") }}
      </v-btn>
      <v-btn
        prepend-icon="mdi-logout"
        color="warning"
        size="small"
        @click.stop="$emit('logout')"
      >
        {{ $t("auth.sign_out") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import ImgLoader from "../Img/ImgPlaceholder.vue";
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
