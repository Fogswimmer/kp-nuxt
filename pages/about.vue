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
					<Devops />
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts" setup>
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import definePageTitle from "~/utils/definePageTitle";
import Author from "~/components/AboutPartials/Author.vue";
import StackList from "~/components/AboutPartials/StackList.vue";
import Devops from "~/components/AboutPartials/Devops.vue";

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
