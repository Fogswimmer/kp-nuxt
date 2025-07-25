<template>
	<v-expansion-panels v-model="accordion">
		<v-expansion-panel
			v-if="$vuetify.display.smAndDown"
			id="general-info"
			:title="$t('pages.general_info')"
			tag="section"
			value="general-info"
		>
			<v-expansion-panel-text>
				<slot name="general-info" />
			</v-expansion-panel-text>
		</v-expansion-panel>
		<v-expansion-panel
			v-if="$vuetify.display.smAndDown"
			id="rating"
			:title="$t('pages.films.rating')"
			tag="section"
			value="general-rating"
		>
			<v-expansion-panel-text>
				<slot name="rating" />
			</v-expansion-panel-text>
		</v-expansion-panel>
		<v-expansion-panel
			id="description"
			:title="$t('pages.films.description')"
			tag="section"
			value="description"
		>
			<v-expansion-panel-text>
				<slot name="description" />
			</v-expansion-panel-text>
		</v-expansion-panel>
		<v-expansion-panel
			v-if="$vuetify.display.smAndDown"
			id="starring"
			:title="$t('pages.films.starring')"
			value="starring"
			tag="section"
		>
			<v-expansion-panel-text>
				<v-list rounded="lg" border>
					<v-list-item
						v-for="(actor, index) in starring"
						:key="index"
						:title="actor.value as string"
						:value="index"
						:to="$localeRoute(actor.to || '/')"
					>
						<template #prepend>
							<v-avatar>
								<v-img v-if="actor.avatar" :src="actor.avatar">
									<template #placeholder>
										<v-icon size="x-small">
											mdi-account
										</v-icon>
									</template>
									<template #error>
										<ErrorPlaceHolder />
									</template>
								</v-img>
								<v-icon v-else icon="mdi-account" />
							</v-avatar>
						</template>
					</v-list-item>
				</v-list>
			</v-expansion-panel-text>
		</v-expansion-panel>
		<v-expansion-panel
			v-if="$vuetify.display.smAndDown"
			id="team"
			value="team"
			:title="$t('pages.films.team')"
			tag="section"
		>
			<v-expansion-panel-text>
				<v-list rounded="lg" border>
					<v-list-item
						v-for="(person, index) in team"
						:key="index"
						rounded="lg"
						:subtitle="$t(person.title || '')"
						:title="person.value as string"
						:value="index"
						:to="$localeRoute(person.to || '/')"
					>
						<template #prepend>
							<v-avatar>
								<v-img :src="person.avatar">
									<template #placeholder>
										<v-icon size="x-small">
											mdi-account
										</v-icon>
									</template>
									<template #error>
										<ErrorPlaceHolder />
									</template>
								</v-img>
							</v-avatar>
						</template>
					</v-list-item>
				</v-list>
			</v-expansion-panel-text>
		</v-expansion-panel>
		<v-expansion-panel
			id="comments"
			tag="section"
			value="comments"
			:title="$t('pages.films.comments')"
		>
			<v-expansion-panel-text>
				<slot name="comments" />
			</v-expansion-panel-text>
		</v-expansion-panel>
		<v-expansion-panel
			id="similar-films"
			tag="section"
			value="similarFilms"
			:title="$t('pages.films.similar_genres')"
		>
			<v-expansion-panel-text>
				<slot name="similar-genres" />
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script lang="ts" setup>
import ErrorPlaceHolder from "../Containment/Img/ErrorPlaceHolder.vue";

defineEmits<{
	(e: "description:change", value: boolean): void;
}>();
const display = useDisplay();
const props = defineProps<{
	isDescriptionPanelOpen: boolean;
	team: Partial<Detail>[];
	starring: Partial<Detail>[];
}>();
const accordion = ref<string[]>(["description"]);

watch(
	() => props.isDescriptionPanelOpen,
	() => {
		if (!accordion.value.includes("description")) {
			accordion.value.push("description");
		}
	},
);

onMounted(() => {
	if (display.name.value === "xs") {
		accordion.value = [];
	}
});
</script>

<style></style>
