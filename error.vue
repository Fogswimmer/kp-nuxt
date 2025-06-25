<template>
    <NuxtLayout>
        <v-app>
            <Head>
                <Title>{{
                    definePageTitle(
                        $t(
                            `toast.messages.server_errors.${error?.statusCode || 500}`,
                        ),
                    )
                }}</Title>
            </Head>
            <v-empty-state
                :headline="error?.statusCode.toString()"
                :title="
                    $t(
                        `toast.messages.server_errors.${error?.statusCode || 500}`,
                    )
                "
                :text="error?.message"
                icon="mdi-alert-rhombus"
                :action-text="$t('empty_states.actions.home')"
                @click:action="clearError({ redirect: '/' })"
            />
        </v-app>
    </NuxtLayout>
</template>

<script setup lang="ts">
const error = useError();
</script>
