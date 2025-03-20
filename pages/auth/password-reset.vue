<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("auth.reset_password")) }}</Title>
    </Head>
    <v-card variant="tonal" class="mx-auto" max-width="600">
      <v-toolbar>
        <template #prepend>
          <BackBtn />
        </template>
        <v-toolbar-title>
          {{ $t("auth.password_reset") }}
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text class="pa-4">
        <v-form ref="loginFormRef" class="mt-4">
          <div class="d-flex flex-column ga-2">
            <v-text-field
              v-model="email"
              :label="$t('auth.password_reset_email')"
              :placeholder="$t('auth.login_placeholder')"
              prepend-inner-icon="mdi-account-key"
              variant="outlined"
             :rules="[required, emailRule]"
            />
          </div>
        </v-form>
        <div class="d-flex flex-column ga-4 mt-5">
          <!-- <v-btn
            color="primary"
            size="large"
            variant="tonal"
            block
            :loading="loading"
            @click="validate"
          >
            {{ $t("auth.sign_in") }}
          </v-btn>
          <v-btn
            to="/auth/sign-up"
            variant="outlined"
            block
            size="large"
            color="secondary"
            prepend-icon="mdi-account-plus"
          >
            {{ $t("auth.register") }}
          </v-btn>

          <v-btn
            prepend-icon="mdi-account-off"
            variant="plain"
            block
            size="large"
            to="/"
          >
            {{ $t("auth.continue_as_guest") }}
          </v-btn> -->
        </div>
      </v-card-text>
    </v-card>
    
  </div>
</template>

<script lang="ts" setup>
import BackBtn from '~/components/Containment/Btns/BackBtn.vue';
const { required, email: emailRule } = useValidation();

const email = ref<string>("");

</script>
