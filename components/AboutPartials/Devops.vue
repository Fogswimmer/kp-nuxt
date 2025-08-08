<template>
	<v-card variant="outlined">
		<v-toolbar color="transparent">
			<template #prepend>
				<v-icon class="ml-2"> mdi-all-inclusive </v-icon>
			</template>
			<v-toolbar-title> Devops </v-toolbar-title>
			<v-tabs v-model="active">
				<v-tab value="scheme" prepend-icon="mdi-image">
					{{ $t("pages.about.scheme") }}
				</v-tab>
				<v-tab value="code" prepend-icon="mdi-code-tags">
					compose.yaml
				</v-tab>
			</v-tabs>
		</v-toolbar>
		<v-card-text>
			<v-tabs-window v-model="active">
				<v-tabs-window-item value="scheme">
					<v-sheet>
						<div
							class="fill-height d-flex justify-center align-center pa-2"
						>
							<v-img
								:src="
									theme.current.value.dark
										? '/img/network_scheme_dark.webp'
										: '/img/network_scheme.webp'
								"
								alt="scheme"
								:height="$vuetify.display.mdAndUp ? 500 : 300"
							>
								<template #placeholder>
									<ImgPlaceholder />
								</template>
							</v-img>
						</div>
					</v-sheet>
				</v-tabs-window-item>
				<v-tabs-window-item value="code">
					<v-sheet max-height="600" class="overflow-y-auto">
						<ComposeYamlCode />
					</v-sheet>
				</v-tabs-window-item>
			</v-tabs-window>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
import ImgPlaceholder from "../Containment/Img/ImgPlaceholder.vue";
import ComposeYamlCode from "./ComposeYamlCode.vue";

const active = ref<string>("scheme");

const theme = useTheme();
</script>

<style></style>
