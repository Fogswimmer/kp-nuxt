<template>
    <v-layout :class="theme.current.value.dark ? 'bg-dark' : 'bg-light'">
        <AppHeader
            :active-theme="activeTheme"
            @update:active-theme="activeTheme = $event"
        />
        <v-main style="min-height: calc(100vh - 8px)" v-scroll="onScroll">
            <slot />
        </v-main>
        <BottomNav show-profile-nav />
        <client-only>
            <v-navigation-drawer
                v-if="$vuetify.display.mdAndUp"
                location="start"
                floating
                width="400"
                color="transparent"
            ></v-navigation-drawer>
            <v-navigation-drawer
                v-if="$vuetify.display.mdAndUp"
                location="end"
                floating
                width="400"
                color="transparent"
            >
                <ScrollTopFab :show="showScrollBtn" @scroll:top="scrollToTop" />
            </v-navigation-drawer>
        </client-only>
    </v-layout>
</template>

<script lang="ts" setup>
import AppHeader from "~/components/Navigation/AppHeader.vue";
import BottomNav from "~/components/Navigation/BottomNav.vue";
import ScrollTopFab from "~/components/Containment/Btns/ScrollTopFab.vue";

const defaultTheme = useDefaultTheme();
const theme = useTheme();
const activeTheme = ref(theme.global.name.value);
const scrollOffset = ref<number>(0);
const showScrollBtn = ref<boolean>(false);

const onScroll = (e: any) => {
    scrollOffset.value = e.target.scrollingElement.scrollTop;
    showScrollBtn.value = scrollOffset.value > 200;
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
    if (!localStorage.getItem('theme')) {
        theme.global.name.value = defaultTheme.value
        localStorage.setItem('theme', defaultTheme.value);
    }
    theme.global.name.value = localStorage.getItem('theme') || defaultTheme.value;;
});
</script>
