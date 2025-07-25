<template>
	<div>
		<client-only>
			<v-dialog v-if="$vuetify.display.smAndDown" v-model="showSearch">
				<v-sheet class="pa-2">
					<div class="d-flex ga-2">
						<v-text-field
							v-model="needle"
							:placeholder="$t('actions.search')"
							:loading="loading"
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
			<v-navigation-drawer
				v-model="showFilters"
				width="300"
				location="end"
			>
				<slot name="filters" />
			</v-navigation-drawer>
		</client-only>
		<v-app-bar :extended="needle !== '' && !loading">
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
			<template v-if="needle && !loading" #extension>
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
		</v-app-bar>

		<main>
			<template v-if="items.length">
				<template v-if="!loading">
					<div class="pa-2 overflow-x-hidden">
						<GradientWrapper v-for="(item, i) in items" :key="i">
							<v-list-item
								border
								rounded="lg"
								lines="three"
								class="my-2"
								:value="item"
							>
								<template #title>
									<nuxt-link
										:to="$localeRoute(item.to || '/')"
										class="text-primary text-lg-h6 d-flex ga-1"
									>
										<span class="text-truncate">{{
											item.title
										}}</span>
										<span v-if="item.releaseYear"
											>({{ item.releaseYear }})</span
										>
									</nuxt-link>
								</template>
								<template #subtitle>
									{{ item.value }}
								</template>
								<template #prepend>
									<v-avatar
										:size="
											$vuetify.display.smAndDown
												? 84
												: 100
										"
									>
										<v-img :src="item.avatar">
											<template #placeholder>
												<v-sheet height="100%">
													<div
														class="d-flex align-center justify-center fill-height"
													>
														<v-icon
															icon="mdi-image-off"
														/>
													</div>
												</v-sheet>
											</template>
										</v-img>
									</v-avatar>
								</template>
								<template
									v-if="$vuetify.display.mdAndUp"
									#append
								>
									<ListCardInfo :item="item" />
								</template>
							</v-list-item>
						</GradientWrapper>
					</div>
				</template>
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
				v-if="needle != '' && !items.length && !loading"
				height="calc(100vh - 128px)"
			>
				<div
					class="d-flex flex-column align-center justify-center fill-height ga-2"
				>
					<v-label class="mt-2">
						{{ $t("general.no_results") }}
					</v-label>
					<v-btn
						prepend-icon="mdi-close"
						@click="$emit('update:search', '')"
						>{{ $t("actions.clear") }}</v-btn
					>
				</div>
			</v-sheet>
			<slot name="empty-state" />
		</main>

		<v-app-bar location="bottom" order="1" permanent>
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
		</v-app-bar>
	</div>
</template>

<script lang="ts" setup>
import BackBtn from "../Containment/Btns/BackBtn.vue";
import GradientWrapper from "../Containment/Cards/GradientWrapper.vue";
import ListCardInfo from "../Containment/Cards/ListCardInfo.vue";

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
	emit("update:search", needle.value);
};

onMounted(() => {
	if (display.smAndDown.value) {
		showFilters.value = false;
	}
});
</script>

<style></style>
