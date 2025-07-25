<template>
	<v-card class="pa-2" density="compact" color="transparent" rounded="lg">
		<template #image>
			<v-img :gradient="`to bottom left, rgba(0,0,0,0), ${color}`" />
		</template>
		<template #prepend>
			<v-avatar>
				<v-img :src="comment?.publisherData?.avatar || ''">
					<template #placeholder>
						<ImgPlaceholder :loading="loading" icon="mdi-account" />
					</template>
					<template #error>
						<ErrorPlaceHolder />
					</template>
				</v-img>
			</v-avatar>
		</template>
		<template #append>
			<FilmRatingChip :rating="comment.rating.toString() || '0'" />
		</template>
		<template #title>
			<div class="d-flex flex-column">
				<PublisherPopover
					:publisher="comment.publisherData"
					is-commment
				/>

				<span class="text-caption text-disabled">{{
					dateFormatter(comment.createdAt)
				}}</span>
			</div>
		</template>
		<v-divider />
		<v-card-text>
			<div class="w-100 d-flex align-center">
				<div
					:class="[
						'text-caption text-lg-body-2',
						{ 'text-white': theme.current.value.dark },
						{ 'text-black': !theme.current.value.dark },
					]"
				>
					{{ comment.comment }}
				</div>
				<v-spacer />
				<v-btn
					v-if="isAdmin || userId === comment.publisherData.id"
					size="x-small"
					variant="tonal"
					icon="mdi-delete"
					color="error"
					@click="showDeleteConfirm = true"
				/>
			</div>
		</v-card-text>
	</v-card>

	<ConfirmDialog
		v-model="showDeleteConfirm"
		:text="$t('actions.delete_assessment_warning')"
		@cancel="showDeleteConfirm = false"
		@confirm="handleConfirm(comment.id)"
	/>
</template>

<script lang="ts" setup>
import FilmRatingChip from "~/components/Misc/FilmRatingChip.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";
import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";
import PublisherPopover from "~/components/Containment/Cards/PublisherPopover.vue";

const theme = useTheme();

interface Comment {
	id: number;
	rating: number;
	comment: string;
	createdAt: string;
	updatedAt: string;
	publisherData: IPublisher;
}
defineProps<{
	loading: boolean;
	index: number;
	comment: Comment;
	isAdmin: boolean;
	isAuthenticated: boolean;
	userId?: number;
	color?: string;
}>();

const emits = defineEmits<{
	(event: "confirm:delete", id: number): void;
}>();
const showDeleteConfirm = ref<boolean>(false);

const handleConfirm = (id: number) => {
	showDeleteConfirm.value = false;
	emits("confirm:delete", id);
};
</script>

<style>
.comment-title {
	line-height: 1.2;
}
</style>
