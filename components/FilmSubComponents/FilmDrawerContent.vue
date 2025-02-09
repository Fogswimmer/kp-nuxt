<template>
<v-expansion-panels
					v-model="leftColumnAccordion"
					variant="accordion"
					multiple>
					<v-expansion-panel
						:title="$t('pages.general_info')"
						value="info">
						<v-expansion-panel-text>
							<v-list>
								<div v-for="(detail, index) in generalInfo">
									<v-list-item
										:key="index"
										:subtitle="$t(detail.name)"
										:prepend-icon="detail.icon"
										class="my-2"
										:to="detail.to">
										<v-list-item-title :class="{ 'text-primary': detail.to }">
											{{ detail.value || $t("general.no_data") }}
										</v-list-item-title>
									</v-list-item>
									<v-tooltip
										v-if="
											typeof detail.value === 'string' &&
											detail.value.length > 12
										"
										activator="parent">
										<span> {{ detail.value }}</span>
									</v-tooltip>
								</div>
							</v-list>
						</v-expansion-panel-text>
					</v-expansion-panel>

					<v-expansion-panel
						:title="$t('pages.films.starring')"
						value="starring">
						<v-expansion-panel-text>
							<v-list>
								<v-list-item
									v-for="(actor, index) in starring"
									:key="index"
									:title="actor.name"
									:value="index"
									:to="`/persons/${actor.id}`"
									base-color="secondary">
									<template #prepend>
										<v-avatar>
											<v-img
												v-if="actor.avatar"
												:src="actor.avatar">
											</v-img>
											<v-icon
												v-else
												icon="mdi-account"></v-icon>
										</v-avatar>
									</template>
								</v-list-item>
							</v-list>
						</v-expansion-panel-text>
					</v-expansion-panel>

					<v-expansion-panel
						value="team"
						:title="$t('pages.films.team')">
						<v-expansion-panel-text>
							<v-list nav>
								<v-list-item
									v-for="(person, index) in team"
									:key="index"
									rounded="lg"
									:subtitle="$t(person.name)"
									:title="person.value"
									:value="index"
									:prepend-icon="person.avatar || 'mdi-account'"
									:prepend-avatar="person.avatar"
									:to="`/persons/${person.to}`"
									base-color="secondary">
								</v-list-item>
							</v-list>
						</v-expansion-panel-text>
					</v-expansion-panel>
				</v-expansion-panels>
</template>

<script lang="ts" setup>
defineProps <{
  generalInfo: any;
  starring: any;
  team: any;
}>();
	const leftColumnAccordion = ref(["info", "starring", "team"]);
</script>

<style>

</style>