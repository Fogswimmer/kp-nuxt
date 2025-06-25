<template>
    <v-layout :class="theme.current.value.dark ? 'bg-dark' : 'bg-light'">
        <client-only>
            <v-navigation-drawer>
                <Logo />
                <DrawerNavList />
                <template #append>
                    <v-divider />
                    <div class="pa-2 d-flex align-center">
                        <ProfileNav />
                        <SettingsBtn
                            :active-theme="activeTheme"
                            @update:active-theme="activeTheme = $event"
                        />
                    </div>
                </template>
            </v-navigation-drawer>
        </client-only>
        <v-main style="min-height: calc(100vh - 8px)" v-scroll="onScroll">
            <slot />
        </v-main>
        <BottomNav show-profile-nav />
    </v-layout>
</template>

<script lang="ts" setup>
import DrawerNavList from "~/components/Navigation/DrawerNavList.vue";
import BottomNav from "~/components/Navigation/BottomNav.vue";
import Logo from "~/components/Misc/Logo.vue";
import ProfileNav from "~/components/Navigation/ProfileNav.vue";
import SettingsBtn from "~/components/Containment/Btns/SettingsBtn.vue";
import ScrollTopFab from "~/components/Containment/Btns/ScrollTopFab.vue";

const activePage = computed(() => {
    const routename = useRoute().name;
    return routename ? routename.toString() : "";
});


const theme = useTheme();
const defaultTheme = useDefaultTheme();
const activeTheme = ref(defaultTheme.value);
const showScrollBtn = ref<boolean>(false);
const scrollOffset = ref<number>(0);
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
const { t } = useI18n();

interface PageContentItem {
    title: string;
    value: string;
    icon: string;
}
interface PageContentItems {
    filmDetails: PageContentItem[];
    personDetails: PageContentItem[];
}
const pageContents = computed((): PageContentItems => {
    return {
        filmDetails: [
            {
                title: t("pages.films.description"),
                value: "description",
                icon: "mdi-information-outline",
            },
            {
                title: t("pages.films.starring"),
                value: "starring",
                icon: "mdi-star",
            },
            {
                title: t("pages.films.team"),
                value: "team",
                icon: "mdi-account-group",
            },
            {
                title: t("pages.films.gallery"),
                value: "gallery",
                icon: "mdi-image-multiple",
            },
            {
                title: t("pages.films.comments"),
                value: "comments",
                icon: "mdi-comment",
            },
        ],
        personDetails: [
            {
                title: t("pages.persons.bio"),
                value: "bio",
                icon: "mdi-information",
            },
            {
                title: t("pages.persons.filmography"),
                value: "filmography",
                icon: "mdi-movie-open",
            },
            {
                title: t("pages.persons.photos"),
                value: "gallery",
                icon: "mdi-view-gallery",
            },
        ],
    };
});

const activeContentItem = ref<string | null>(null);

const onScroll = (e: any): void => {
    scrollOffset.value = e.target.scrollingElement.scrollTop;
    showScrollBtn.value = scrollOffset.value > 200;
};

onMounted(() => {
    const key = activePage.value as keyof PageContentItems;
    activeContentItem.value = pageContents.value[key]?.[0]?.value ?? null;
});
</script>

<style></style>
