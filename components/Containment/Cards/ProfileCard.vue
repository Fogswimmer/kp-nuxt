<template>
    <v-card :loading="loading" class="glassed">
      <v-toolbar density="compact">
        <template #append>
          <CloseBtn @close="$emit('close')" />
        </template>
        <v-toolbar-title>
          {{ $t("pages.profile.title") }}
        </v-toolbar-title>
      </v-toolbar>
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
      <v-list>
        <v-list-item class="text-subtitle-2">{{
          computedLastLogin
        }}</v-list-item>
        <v-list-item
          v-for="(info, i) in computedGeneralInfo"
          :key="i"
          :title="info.title"
          :prepend-icon="info.icon"
          :subtitle="info.value"
        />
      </v-list>
      <v-divider/>
      <v-list density="compact" variant="tonal">
        <v-list-item
          :title="$t('actions.edit')"
          prepend-icon="mdi-pencil"
          value="edit"
          @click.stop="$emit('edit')"
        />
        <v-list-item
          :title="$t('auth.sign_out')"
          prepend-icon="mdi-logout"
          value="logout"
          base-color="warning"
          @click.stop="$emit('logout')"
        />
      </v-list>
    </v-card>

</template>

<script lang="ts" setup>
import ImgLoader from "../Img/ImgPlaceholder.vue";
import ErrorPlaceHolder from "../Img/ErrorPlaceHolder.vue";
import CloseBtn from "../Btns/CloseBtn.vue";

const props = defineProps<{
  currentUser: CurrentUser;
  loading: boolean;
  isAdmin: boolean;
}>();

defineEmits<{
  (e: "edit" | "logout"| "avatar:edit"| "close"): void;
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
      title: t("auth.email"),
      value: props.currentUser?.email || "",
      icon: "mdi-email",
    },
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
      icon: "mdi-cake",
    },
  ];
});
</script>

<style></style>
