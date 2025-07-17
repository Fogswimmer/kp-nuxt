<template>
	<v-breadcrumbs> </v-breadcrumbs>
</template>

<script lang="ts" setup>
interface BreadCrumb {
	title: string;
	disabled: boolean;
	href: string;
}

const items = computed(() => {
	const route = useRoute();
	const path = route.path.split("/").filter((item) => item !== "");
	const breadcrumbs: BreadCrumb[] = [];
	let href = "";
	path.forEach((item) => {
		href += `/${item}`;
		breadcrumbs.push({
			title: item,
			disabled: false,
			href,
		});
	});
	return breadcrumbs;
});
</script>

<style></style>
