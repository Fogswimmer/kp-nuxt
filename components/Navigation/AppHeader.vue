<template>
    <v-app-bar scroll-behavior="hide">
        <v-app-bar-title>
            <Logo />
        </v-app-bar-title>

        <div v-if="!$vuetify.display.smAndDown" class="d-flex ga-1">
            <NavBtns />
        </div>
        <v-spacer v-if="$vuetify.display.mdAndUp" />
        <template #append>
            <div class="d-flex ga-1 align-center mr-2">
                <ProfileNav v-if="$vuetify.display.mdAndUp" />
                <SettingsBtn
                    :active-theme="activeTheme"
                    @update:active-theme="$emit('update:activeTheme', $event)"
                />
            </div>
        </template>
    </v-app-bar>
</template>

<script lang="ts" setup>
import NavBtns from "~/components/Navigation/NavBtns.vue";
import Logo from "~/components/Misc/Logo.vue";
import ProfileNav from "./ProfileNav.vue";
import SettingsBtn from "../Containment/Btns/SettingsBtn.vue";

defineProps<{
    activeTheme: string;
}>();
defineEmits<{
    (e: "update:activeTheme", value: string): void;
}>();
</script>

<style></style>
