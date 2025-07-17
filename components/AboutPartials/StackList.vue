<template>
	<v-card 
	prepend-icon="mdi-tools" 
	:title="$t('pages.about.stack')" 
	variant="outlined"
	color="secondary"
	height="100%"
	>
		<v-divider></v-divider>
		<v-container fluid>
			<v-row>
				<v-col cols="auto">
					<v-list>
						<v-list-subheader> Frontend </v-list-subheader>
						<v-list-item
							title="Typescript"
							:subtitle="$t('pages.about.table_headers.language')"
						>
							<template #prepend>
								<v-icon color="blue"
									>mdi-language-typescript
								</v-icon>
							</template>
						</v-list-item>
						<v-list-item
							title="Vue 3"
							:subtitle="
								$t('pages.about.table_headers.main_framework')
							"
						>
							<template #prepend>
								<v-icon color="teal">mdi-vuejs </v-icon>
							</template>
						</v-list-item>
						<v-list-item title="Nuxt 3" subtitle="SSR">
							<template #prepend>
								<v-icon color="green-accent-3"
									>mdi-nuxt
								</v-icon>
							</template>
						</v-list-item>
						<v-list-item
							title="Vuetify 3"
							:subtitle="
								$t(
									'pages.about.table_headers.additional_framework',
								)
							"
						>
							<template #prepend>
								<v-icon color="light-blue-accent-4"
									>mdi-vuetify
								</v-icon>
							</template>
						</v-list-item>
						<v-list-subheader>Backend</v-list-subheader>
						<v-list-item
							title="Php 8.3"
							:subtitle="$t('pages.about.table_headers.language')"
						>
							<template #prepend>
								<v-icon color="deep-purple-lighten-3"
									>mdi-language-php
								</v-icon>
							</template>
						</v-list-item>
						<v-list-item
							title="Symfony 7"
							:subtitle="
								$t('pages.about.table_headers.main_framework')
							"
						>
							<template #prepend>
								<v-icon color="purple">mdi-symfony</v-icon>
							</template>
						</v-list-item>
						<v-list-item title="Postgres 16" subtitle="DB">
							<template #prepend>
								<v-img
									width="22"
									height="22"
									src="/public/img/psql.svg"
									class="ml-1 me-8"
								/>
							</template>
						</v-list-item>
						<v-list-item
							title="RabbitMQ"
							:subtitle="
								$t(
									'pages.about.dev_prod.table_headers.message_brocker',
								)
							"
						>
							<template #prepend>
								<v-icon color="orange"
									>mdi-rabbit</v-icon
								></template
							>
						</v-list-item>
						<v-list-item
							title="Redis"
							:subtitle="
								$t(
									'pages.about.dev_prod.table_headers.cache_db',
								)
							"
						>
							<template #prepend>
								<v-icon color="red"
									>mdi-database</v-icon
								></template
							>
						</v-list-item>

						<v-list-subheader>Devops</v-list-subheader>
						<v-list-item
							title="Git"
							:subtitle="
								$t(
									'pages.about.dev_prod.table_headers.version_control',
								)
							"
						>
							<template #prepend>
								<v-icon color="orange">mdi-git</v-icon>
							</template>
						</v-list-item>
						<v-list-item title="Bash" subtitle="CI/CD">
							<template #prepend>
								<v-icon color="green">mdi-bash</v-icon>
							</template>
						</v-list-item>
						<v-list-item title="Github Actions" subtitle="CI/CD">
							<template #prepend>
								<v-icon>mdi-github</v-icon>
							</template>
						</v-list-item>
						<v-list-item
							title="Docker + Docker Compose"
							:subtitle="
								$t(
									'pages.about.dev_prod.table_headers.containerisation',
								)
							"
						>
							<template #prepend>
								<v-icon color="blue">mdi-docker</v-icon>
							</template>
						</v-list-item>
					</v-list>
				</v-col>
				<v-col >
					<div
						class="d-flex flex-column align-center fill-height ga-2 pa-2"
					>
						<v-spacer></v-spacer>
						<v-avatar size="100">
							<v-img src="/public/img/nuxt-logo.jpg"> </v-img>
						</v-avatar>
						<v-spacer></v-spacer>
						<v-avatar size="100">
							<v-img src="/public/img/symfony-logo.png"> </v-img>
						</v-avatar>
						<v-spacer></v-spacer>
						<v-avatar size="100">
							<v-img src="/public/img/docker-logo.png"> </v-img>
						</v-avatar>
						<v-spacer></v-spacer>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script lang="ts" setup></script>

<style></style>
