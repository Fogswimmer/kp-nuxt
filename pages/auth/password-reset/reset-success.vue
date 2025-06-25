<template>
    <v-card max-width="600" class="mx-auto" variant="outlined">
        <v-card-text>
            <v-alert variant="tonal" color="success">{{
                $t("auth.password_reset_messages.reset_success")
            }}</v-alert>
            <div class="text-center mt-5">
                <CloseWindowBtn />
            </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import CloseWindowBtn from "~/components/Containment/Btns/CloseWindowBtn.vue";

definePageMeta({
    name: "passwordResetSuccess",
    path: "/auth/password-reset/reset-success",
    layout: "auth",
});
</script>

<style></style>
