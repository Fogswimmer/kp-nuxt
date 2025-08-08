<template>
	<v-card flat :title="$t('filters.title')" prepend-icon="mdi-filter">
		<v-card-text>
			<v-list>
				<v-list-subheader>{{ $t("actions.limit") }}</v-list-subheader>
				<v-list-item>
					<v-chip-group
						v-model="selectedLimit"
						mandatory
						column
						selected-class="text-primary"
						@update:model-value="$emit('update:limit', $event)"
					>
						<v-chip
							v-for="(limit, index) in limitOptions"
							:key="index"
							:value="limit"
							:text="limit.title"
							filter
						/>
					</v-chip-group>
				</v-list-item>
				<v-divider />
				<v-list-subheader>{{
					$t("filters.order.title")
				}}</v-list-subheader>
				<v-list-item>
					<v-chip-group
						v-model="selectedOrder"
						mandatory
						column
						selected-class="text-secondary"
						@update:model-value="$emit('update:order', $event)"
					>
						<v-chip
							v-for="(order, index) in orderOptions"
							:key="index"
							:value="order"
							filter
							:text="order.title"
						/>
					</v-chip-group>
				</v-list-item>

				<v-divider />

				<v-list-subheader
					>{{ $t("filters.sort.title") }}:</v-list-subheader
				>
				<v-list-item>
					<v-chip-group
						v-model="selectedSortOption"
						mandatory
						column
						selected-class="text-blue"
						@update:model-value="$emit('update:sort', $event)"
					>
						<v-chip
							v-for="(sort, index) in sortOptions"
							:key="index"
							:value="sort"
							filter
							:text="sort.title"
						/>
					</v-chip-group>
				</v-list-item>
				<v-divider />
				<slot name="group-by"/>
			</v-list>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
interface IStringValueOption {
	value: string;
	title: string;
}

interface INumberValueOption {
	value: number;
	title: string;
}

const props = defineProps<{
	sortOptions: IStringValueOption[];
}>();

defineEmits<{
	(e: "update:limit", value: number): void;
	(e: "update:order" | "update:sort", value: string): void;
}>();

const { t } = useI18n();
const orderOptions: IStringValueOption[] = [
	{ value: "asc", title: t("actions.asc") },
	{ value: "desc", title: t("actions.desc") },
];
const selectedOrder = ref<IStringValueOption>({
	value: "asc",
	title: t("actions.asc"),
});

const limitOptions: INumberValueOption[] = [
	{ value: 5, title: "5" },
	{ value: 10, title: "10" },
	{ value: 15, title: "15" },
	{ value: 0, title: t("filters.sort.all") },
];
const selectedLimit = ref<INumberValueOption>(limitOptions[0] || { value: 5, title: "5" });
const selectedSortOption = ref<IStringValueOption>(props.sortOptions[0] || { value: "", title: "" });

</script>

<style></style>
