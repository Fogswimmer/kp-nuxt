<template>
	<div>
		<client-only>
			<v-dialog v-if="$vuetify.display.smAndDown" v-model="showSearch">
				<v-sheet class="pa-2">
					<div class="d-flex ga-2">
						<v-text-field
							v-model="needle"
							:placeholder="$t('actions.search')"
							chips
							hide-details
							prepend-inner-icon="mdi-magnify"
							variant="outlined"
							clearable
							@click:clear="clearSearch"
							@update:model-value="updateSearch"
						/>
						<v-btn icon variant="plain" @click="closeMobileSearch">
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</div>
					<v-label v-if="needle && !loading" class="mt-2">
						<span v-if="items.length">{{
							$t("search.request_result", { count: items.length })
						}}</span>
						<span v-else>{{ $t("search.no_result") }}</span>
					</v-label>
				</v-sheet>
			</v-dialog>

			<NuxtLayout name="right-drawer">
				<slot name="filters" />
			</NuxtLayout>
		</client-only>
		<v-toolbar :extended="needle !== '' && !loading">
			<template v-if="$vuetify.display.smAndDown" #prepend>
				<BackBtn />
			</template>
			<v-app-bar-title>
				<span
					v-if="$vuetify.display.smAndDown"
					class="text-lg-h5 font-weight-bold"
				>
					{{ listTitle }}</span
				>
				<v-breadcrumbs v-else :items="breadCrumbs" />
			</v-app-bar-title>
			<v-btn
				v-if="$vuetify.display.mdAndUp"
				color="secondary"
				variant="tonal"
				prepend-icon="mdi-plus"
				:text="$t('actions.add')"
				class="mr-2"
				:to="$localeRoute(newPageLink)"
				:disabled="!isAuthenticated"
			/>
			<v-responsive v-if="$vuetify.display.mdAndUp" max-width="400">
				<v-text-field
					v-model="needle"
					:placeholder="$t('actions.search')"
					chips
					hide-details
					prepend-inner-icon="mdi-magnify"
					variant="outlined"
					density="compact"
					clearable
					:loading="loading"
					@click:clear="clearSearch"
					@update:model-value="updateSearch"
				/>
			</v-responsive>
			<template #append>
				<v-btn
					v-if="$vuetify.display.smAndDown"
					icon
					:color="showSearch ? 'primary' : ''"
					@click="showSearch = !showSearch"
				>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
				<v-btn
					v-if="$vuetify.display.smAndDown"
					icon
					:disabled="!isAuthenticated"
					:to="$localeRoute(newPageLink)"
				>
					<v-icon>mdi-plus</v-icon>
					<v-tooltip activator="parent" location="bottom">
						{{ $t("actions.add") }}
					</v-tooltip>
				</v-btn>
				<v-btn
					v-if="$vuetify.display.smAndDown"
					icon
					:color="showFilters ? 'primary' : ''"
					@click="showFilters = !showFilters"
				>
					<v-icon>mdi-filter</v-icon>
				</v-btn>
			</template>
			<template v-if="needle && !loading && items.length" #extension>
				<div
					class="mt-2 w-100 fill-height d-flex align-center justify-center"
				>
					<v-label>
						<span v-if="items.length">{{
							$t("search.request_result", {
								count: items.length,
							})
						}}</span>
					</v-label>
				</div>
			</template>
		</v-toolbar>

		<main>
			<template v-if="items.length">
				<div v-if="!loading" class="pa-2 overflow-y-auto">
					<ListItems :items="items" />
				</div>
				<v-list v-else-if="items.length">
					<v-skeleton-loader
						v-for="n in limit"
						:key="n"
						rounded="lg"
						:height="140"
						class="ma-2 glassed"
						type="list-item-avatar-three-line"
					/>
				</v-list>
			</template>
			<v-sheet
				v-if="!items.length && !loading"
				height="calc(100vh - 128px)"
			>
				<div
					class="d-flex flex-column align-center justify-center fill-height ga-2"
				>
					<v-label class="mt-2">
						{{ $t("general.no_results") }}
					</v-label>
					<v-btn
						v-if="needle != ''"
						prepend-icon="mdi-close"
						@click="$emit('update:search', '')"
						>{{ $t("actions.clear") }}</v-btn
					>
				</div>
			</v-sheet>
		</main>

		<NuxtLayout name="footer">
			<div class="w-100">
				<v-pagination
					v-model="currentPage"
					:length="totalPages"
					rounded="lg"
					color="primary"
					:total-visible="3"
					@update:model-value="handlePageChange"
				/>
			</div>
		</NuxtLayout>
	</div>
</template>

<script lang="ts" setup>
import BackBtn from "../Containment/Btns/BackBtn.vue";
import ListItems from "../Containment/Cards/ListItems.vue";

import { useAuthStore } from "#imports";

const { isAuthenticated } = useAuthStore();

const emit = defineEmits<{
	(e: "update:page" | "delete:item" | "form:open", value: number): void;
	(e: "update:search", value: string): void;
	(e: "update:search", value: string): void;
}>();

defineProps<{
	items: Detail[];
	totalPages: number;
	loading: boolean;
	page: number;
	paginationLabel?: string;
	newPageLink: string;
	listTitle?: string;
	limit: number;
	breadCrumbs?: IBreadCrumb[];
	totalCount?: number;
}>();
const display = useDisplay();

const currentPage = ref<number>(1);
const showFilters = ref<boolean>(true);
const showSearch = ref<boolean>(false);
const needle = ref<string>("");
const handlePageChange = (page: number): void => {
	currentPage.value = page;
	emit("update:page", page);
};

const closeMobileSearch = (): void => {
	showSearch.value = false;
	needle.value = "";
};

const clearSearch = (): void => {
	needle.value = "";
	emit("update:search", "");
};

const updateSearch = (): void => {
	currentPage.value = 1;
	emit("update:page", 1);
	emit("update:search", needle.value);
};

onMounted(() => {
	if (display.smAndDown.value) {
		showFilters.value = false;
	}
});
</script>

<style></style>
