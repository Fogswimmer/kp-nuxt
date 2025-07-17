<template>
	<div>
		<Head>
			<Title>{{ definePageTitle($t("pages.about.title")) }}</Title>
		</Head>

		<v-app-bar v-if="$vuetify.display.smAndDown">
			<template #prepend>
				<BackBtn />
			</template>
			<v-toolbar-title>
				{{ $t("pages.about.title") }}
			</v-toolbar-title>
		</v-app-bar>
		<v-container fluid>
			<v-row>
				<v-col>
					<Author />
				</v-col>
				<v-col>
					<StackList />
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-card variant="outlined">
						<v-toolbar >
                            <template #prepend>
                                <v-icon class="ml-2">mdi-all-inclusive</v-icon>
                            </template>
							<v-toolbar-title> Devops </v-toolbar-title>
							<v-tabs v-model="active">
								<v-tab
									value="scheme"
									prepend-icon="mdi-image"
									>{{ $t("pages.about.scheme") }}</v-tab
								>
								<v-tab value="code" prepend-icon="mdi-code-tags"
									>compose.yaml</v-tab
								>
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
												src="public/img/scheme.webp"
												alt="scheme"
												:class="
													theme.current.value.dark
														? ''
														: 'inverted'
												"
												:height="
													$vuetify.display.mdAndUp
														? 500
														: 300
												"
											>
												<template #placeholder>
													<ImgPlaceholder />
												</template>
											</v-img>
										</div>
									</v-sheet>
								</v-tabs-window-item>
								<v-tabs-window-item value="code">
									<ComposeYamlCode />
								</v-tabs-window-item>
							</v-tabs-window>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts" setup>
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import definePageTitle from "~/utils/definePageTitle";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";
import Author from "~/components/AboutPartials/Author.vue";
import ComposeYamlCode from "~/components/AboutPartials/ComposeYamlCode.vue";
import StackList from "~/components/AboutPartials/StackList.vue";

const active = ref<string>("scheme");

const theme = useTheme();
definePageMeta({
	name: "about",
	path: "/about",
	title: "About",
	layout: "home",
});
</script>

<style>
.inverted {
	mix-blend-mode: difference;
}
</style>
