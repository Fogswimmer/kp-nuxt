<template>
	<v-lazy transition="fade-transition" min-height="100">
		<v-card flat border>
			<template v-if="assessments.length > 0">
				<v-data-iterator
					:items="assementsWithColors"
					:page="page"
					:items-per-page="itemsPerPage"
				>
					<template #header>
						<div class="d-flex align-center pa-2">
							<v-responsive
								:max-width="
									$vuetify.display.mdAndUp ? 250 : 150
								"
							>
								<v-select
									v-model="sort"
									:items="sortItems"
									hide-details
									class="ma-2"
									density="compact"
								/>
							</v-responsive>
							<v-spacer />
							<v-btn
								variant="tonal"
								:disabled="assessments.length < itemsPerPage"
								@click="seeAllOnClick"
							>
								<span class="text-none text-subtitle-2">{{
									$t("general.see_all")
								}}</span>
							</v-btn>
						</div>
					</template>
					<template #default="{ items }">
						<div
							v-for="(item, i) in items"
							:key="i"
							v-intersect="useIntersection(i, visibleComments)"
							:class="[
								'comment my-4',
								{ 'fade-in': visibleComments.has(i) },
							]"
						>
							<Comment
								:key="i"
								:loading="loading"
								:color="item.raw.color"
								:index="i"
								:comment="item.raw"
								:is-admin="isAdmin"
								:is-authenticated="isAuthenticated"
								:user-id="currentUser?.id || 0"
								@confirm:delete="confirmDelete"
							/>
						</div>
					</template>
					<template #footer="{ pageCount }">
						<v-footer
							class="justify-space-between text-subtitle-2 mt-2 bg-surface"
						>
							<span>
								{{ $t("general.total") }}:
								{{ assessments.length }}</span
							>
							<ClientOnly>
								<v-pagination
									v-model="page"
									:length="pageCount"
									rounded="lg"
									variant="plain"
									color="secondary"
									:total-visible="3"
									density="compact"
							/></ClientOnly>
						</v-footer>
					</template>
				</v-data-iterator>
			</template>
			<v-sheet v-else height="100">
				<div class="d-flex fill-height justify-center align-center">
					<v-label class="text-caption">
						{{ $t("pages.films.no_comments") }} ...
					</v-label>
				</div>
			</v-sheet>
		</v-card>
	</v-lazy>
</template>

<script lang="ts" setup>
import Comment from "./components/Comment.vue";

const { t } = useI18n();
const emits = defineEmits<{
	(event: "assession:delete", id: number): void;
}>();
const props = defineProps<{
	assessments: IAssessment[];
	loading: boolean;
}>();
const sort = ref<string>("asc");
interface SortItem {
	value: string;
	title: string;
}
const sortItems = ref<SortItem[]>([
	{
		value: "asc",
		title: t("actions.desc"),
	},
	{
		value: "desc",
		title: t("actions.asc"),
	},
]);

const { currentUser, isAuthenticated, isAdmin } = storeToRefs(useAuthStore());
const page = ref<number>(1);
const visibleComments = ref(new Set<number>());
const itemsPerPage = ref<number>(5);
const showDeleteConfirm = ref<boolean>(false);
const commentColors = [
	"rgba(0, 255, 0, 0.07)",
	"rgba(255, 0, 0, 0.07)",
	"rgba(0, 255, 255, 0.07)",
	"rgba(255, 255, 0, 0.07)",
	"rgba(155, 155, 0, 0.07)",
];
const seeAllOnClick = () => {
	itemsPerPage.value =
		itemsPerPage.value === 5 ? props.assessments.length : 5;
};

const assementsWithColors = computed(() => {
	const commentsWithSameAuthor = props.assessments.reduce(
		(acc, item) => {
			const { authorId: author } = item;
			acc[author] = acc[author] || [];
			acc[author].push(item);
			return acc;
		},
		{} as Record<string, IAssessment[]>,
	);

	const mappedAssementsWithColors = Object.entries(
		commentsWithSameAuthor,
	).map(([_, comments]) => {
		const color =
			commentColors[comments.length % commentColors.length] || "blue";
		return comments.map((comment) => {
			return {
				...comment,
				color,
			};
		});
	});

	return mappedAssementsWithColors
		.flat()
		.sort((a, b) =>
			sort.value === "asc"
				? new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
				: new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime(),
		);
});
const confirmDelete = (id: number) => {
	emits("assession:delete", id);
	showDeleteConfirm.value = false;
};
</script>
<style>
.comment {
	opacity: 0;
	transform: translateY(5px);
	transition:
		opacity 0.3s ease-out,
		transform 0.3s ease-out;
}
.comment.fade-in {
	opacity: 1;
	transform: translateY(0);
}
</style>
