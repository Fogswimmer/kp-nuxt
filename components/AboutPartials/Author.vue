<template>
	<v-card
		prepend-icon="mdi-account-hard-hat"
		:title="$t('pages.about.author.title')"
		flat
		height="100%"
	>
		<v-divider></v-divider>
		<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="12" xl="6" lg="12" md="12" sm="12">
						<v-card height="100%" class="text-center" flat>
							<v-card-title class="text-h5">{{
								$t("pages.about.author.name")
							}}</v-card-title>
							<v-card-subtitle>
								Fullstack developer
							</v-card-subtitle>
							<v-card-text>
								<v-avatar size="250">
									<v-img
										src="/public/img/nebelschwimmer_avatar.jpg"
									></v-img>
								</v-avatar>
							</v-card-text>
							<v-spacer></v-spacer>
							<v-card-actions>
								<v-btn
									prepend-icon="mdi-github"
									block
									href="https://github.com/Fogswimmer"
									target="_blank"
									color="blue"
									variant="tonal"
									class="mt-16"
								>
									Github
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
					<v-divider v-if="$vuetify.display.mdAndUp" vertical></v-divider>
					<v-col>
						<v-list density="compact">
							<v-list-item
								>{{
									$t("pages.about.author.first_section")
								}}:</v-list-item
							>

							<v-list-item title="React JS">
								<template #prepend>
									<v-icon color="blue">mdi-react</v-icon>
								</template>
							</v-list-item>
							<v-list-item title="Express JS">
								<template #prepend>
									<v-icon color="green">mdi-nodejs</v-icon>
								</template>
							</v-list-item>
							<v-list-item title="Nest JS">
								<template #prepend>
									<v-icon color="pink-accent-3"
										>mdi-nodejs</v-icon
									>
								</template>
							</v-list-item>
							<v-list-item title="jQuery">
								<template #prepend>
									<v-icon color="pink">mdi-jquery</v-icon>
								</template>
							</v-list-item>
							<v-list-item title="Go">
								<template #prepend>
									<v-icon color="blue"
										>mdi-language-go</v-icon
									>
								</template>
							</v-list-item>
							<v-list-item title="Laravel">
								<template #prepend>
									<v-icon color="orange">mdi-laravel</v-icon>
								</template>
							</v-list-item>
							<v-divider />
							<v-list-subheader
								>{{
									$t("pages.about.author.second_section")
								}}:</v-list-subheader
							>
							<v-list-item title="Devops">
								<template #prepend>
									<v-icon color="purple"
										>mdi-all-inclusive</v-icon
									>
								</template>
							</v-list-item>
							<v-list-item title="Security">
								<template #prepend>
									<v-icon color="red">mdi-lock</v-icon>
								</template>
							</v-list-item>
						</v-list>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-card
							:title="$t('pages.about.author.about')"
							prepend-icon="mdi-text-account"
						>
							<v-card-text>
								"Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est
								laborum."
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup></script>

<style></style>
