<template>
    <v-card
        prepend-avatar="/public/img/nebelschwimmer_avatar.jpg"
        :title="$t('pages.about.author.name')"
        :subtitle="$t('pages.about.author.subtitle')"
        flat
    >
        <template #append>
        </template>
        <v-divider></v-divider>
        <v-card-text>
            <v-list :nav="compact">
                <v-list-item
                    >{{ $t("pages.about.author.first_section") }}:</v-list-item
                >

                <v-list-item  title="React JS">
                    <template #prepend>
                        <v-icon color="blue">mdi-react</v-icon>
                    </template>
                </v-list-item>
                <v-list-item

                    title="Express JS"
                >
                    <template #prepend>
                        <v-icon color="green">mdi-nodejs</v-icon>
                    </template>
                </v-list-item>
                <v-list-item
                    title="Nest JS"
                >
                    <template #prepend>
                        <v-icon color="pink-accent-3">mdi-nodejs</v-icon>
                    </template>
                </v-list-item>
                <v-list-item title="jQuery">
                    <template #prepend>
                        <v-icon color="pink">mdi-jquery</v-icon>
                    </template>
                </v-list-item>
                <v-list-item title="Go">
                    <template #prepend>
                        <v-icon color="blue">mdi-language-go</v-icon>
                    </template>
                </v-list-item>
                <v-list-item title="Laravel">
                    <template #prepend>
                        <v-icon color="orange">mdi-laravel</v-icon>
                    </template>
                </v-list-item>
                <v-divider />
                <v-list-subheader
                    >{{
                        $t("pages.about.author.second_section")
                    }}:</v-list-subheader
                >
                <v-list-item title="Devops">
                    <template #prepend>
                        <v-icon color="purple">mdi-all-inclusive</v-icon>
                    </template>
                </v-list-item>
                <v-list-item title="Security">
                    <template #prepend>
                        <v-icon color="red">mdi-lock</v-icon>
                    </template>
                </v-list-item>
            </v-list>
            <v-divider class="my-2"></v-divider>
            <v-btn
            prepend-icon="mdi-github"
            href="https://github.com/Fogswimmer"
            target="_blank"
            color="blue"
            block
            variant="tonal"
            >
            Github
            </v-btn>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
defineProps<{
    compact: boolean;
}>();
</script>

<style></style>
