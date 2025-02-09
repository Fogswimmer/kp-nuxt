<template>
	<v-app id="list">
		<v-app-bar order="0">
			<template #prepend v-if="$vuetify.display.mdAndUp">
				<BackBtn />
			</template>
			<v-app-bar-title>
				<span class="text-h6 text-lg-h5 font-weight-bold">
					{{ listTitle }}</span
				>
			</v-app-bar-title>
			<template #append>
				<v-btn
					icon
					:color="showFilters ? 'primary' : ''"
					@click="showFilters = !showFilters">
					<v-icon>{{ showFilters ? "mdi-filter-off" : "mdi-filter" }}</v-icon>
					<v-tooltip
						activator="parent"
						location="bottom">
						{{ $t("filters.title") }}</v-tooltip
					>
				</v-btn>
				<v-btn
					icon
					:to="newPageLink">
					<v-icon>mdi-plus</v-icon>
					<v-tooltip
						activator="parent"
						location="bottom">
						{{ $t("actions.add") }}
					</v-tooltip>
				</v-btn>
			</template>
		</v-app-bar>
		<client-only>
			<v-navigation-drawer
				order="2"
				v-model="showFilters"
				width="400"
				location="end">
				<div class="pa-4">
					<v-combobox
						v-model="activeSearchOption"
						v-model:search="needle"
						:label="$t('actions.search')"
						:items="searchOptions"
						chips
						hide-details
						prepend-inner-icon="mdi-magnify"
						variant="outlined"
						density="comfortable"
						@update:search="$emit('update:search', $event)"
						@update:model-value="$emit('update:search-options', $event)">
					</v-combobox>
					<slot name="filters" />
				</div>
			</v-navigation-drawer>
		</client-only>
		<v-main>
			<v-container>
				<v-list-item
					v-if="items.length > 0"
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					variant="tonal"
					rounded="lg"
					elevation="5"
					class="my-4"
					lines="two"
					:title="item.title"
					:subtitle="item.subtitle"
					:value="item">
					<template v-slot:prepend>
						<v-avatar size="100">
							<v-img :src="item.imageSrc">
								<template #placeholder>
									<v-sheet height="100%">
										<div class="d-flex align-center justify-center fill-height">
											<v-icon icon="mdi-image-off"></v-icon
										></div>
									</v-sheet>
								</template>
							</v-img>
						</v-avatar>
					</template>
				</v-list-item>
				<v-skeleton-loader
					v-else-if="loading"
					v-for="n in limit"
					:key="n"
					rounded="lg"
					class="my-3 stained-glass"
					type="list-item-avatar-three-line">
				</v-skeleton-loader>
			</v-container>
		</v-main>
		<slot name="empty-state"></slot>

		<v-app-bar location="bottom">
			<v-footer class="d-flex justify-center" color="surface-variant">
				<ClientOnly>
					<v-pagination
						v-model="currentPage"
						:length="totalPages"
						rounded="lg"
						color="accent"
						:total-visible="3"
						@update:model-value="handlePageChange">
					</v-pagination>
				</ClientOnly>
			</v-footer>
		</v-app-bar>
	</v-app>
</template>

<script lang="ts" setup>
	import BackBtn from "../Containment/Btns/BackBtn.vue";
	const emit = defineEmits([
		"update:page",
		"form:open",
		"update:search",
		"delete:item",
		"update:search",
		"update:search-options",
	]);
	const props = defineProps<{
		items: any[];
		totalPages: number;
		loading: boolean;
		page: number;
		paginationLabel?: string;
		newPageLink: string;
		listTitle?: string;
		limit?: number;
		searchOptions: { value: string | number; title: string }[];
	}>();
	const activeSearchOption = ref(props.searchOptions[0]);
	const needle = ref("");

	const currentPage = ref(1);
	const showFilters = ref(false);
	const handlePageChange = (page: number) => {
		currentPage.value = page;
		emit("update:page", page);
	};
</script>

<style></style>
