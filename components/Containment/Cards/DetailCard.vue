<template>
	
	<v-card>
		<v-toolbar flat>
			<template #prepend>
				<v-app-bar-nav-icon
					v-if="drawer && $vuetify.display.smAndDown"
					@click="$emit('drawer:toggle')"></v-app-bar-nav-icon>
				<BackBtn v-else />
			</template>
			<v-app-bar-title>
				<div class="d-flex ga-2">
					<span class="font-weight-bold"> {{ pageName }} </span>
					<span
						v-if="!displayAvatar"
						class="font-weight-bold">
						{{ title }}</span
					>
				</div>
			</v-app-bar-title>

			<slot name="menu"></slot>
		</v-toolbar>
		
	
			<v-card flat>
				<v-scroll-y-transition>
					<v-alert
						type="warning"
						closable
						density="compact"
						v-if="showWarning"
						class="d-flex ga-2 align-center justify-center bg-surface w-100">
						<nuxt-link to="/auth/sign-in">
							{{ $t("auth.not_auth") }}
						</nuxt-link>
					</v-alert>
				</v-scroll-y-transition>
				<v-img
					:src="cover || ''"
					cover
					height="300">
					<template #placeholder>
						<v-sheet
							height="100%"
							class="default-cover">
						</v-sheet>
					</template>
				</v-img>
				<div
					class="position-relative"
					v-if="displayAvatar">
					<v-sheet
						height="200"
						border>
						<div class="d-flex justify-center">
							<div
								class="position-absolute text-center"
								style="top: -50%">
								<div>
									<v-avatar
										size="200"
										border>
										<v-img
											:src="avatar"
											:lazy-src="avatar"
											cover>
											<template #placeholder>
												<v-sheet height="100%">
													<div class="d-flex align-center justify-center h-100">
														<v-icon
															size="64"
															icon="mdi-account-off"></v-icon>
													</div>
												</v-sheet>
											</template>
											<template #error>
												<v-sheet height="100%">
													<div class="d-flex align-center justify-center h-100">
														<v-icon
															color="error"
															icon="mdi-image-broken"></v-icon>
													</div>
												</v-sheet>
											</template>
										</v-img>
									</v-avatar>
								</div>
								<template v-if="!loading">
									<span
										class="text-h6 text-lg-h4 font-weight-bold text-primary">
										{{ title }}</span
									>
									<div class="text-caption text-lg-subtitle-1">
										{{ generalInfo?.list.map((item) => item.value).join(", ") }}
									</div>
									<div class="text-capitalize text-caption text-lg-subtitle-1">
										<span v-for="(subtitle, index) in subtitle?.split(',')">
											<span
												v-if="
													index !== 0 &&
													index !== subtitle?.split(',').length - 1
												">
												&bull;</span
											>
											<span>{{ subtitle }}</span>
										</span>
									</div>
								</template>
								<template v-else>
									<v-skeleton-loader
										class="stained-glass"
										type="list-item-three-line"></v-skeleton-loader>
								</template>
							</div>
						</div>
					</v-sheet>
				</div>

				<slot name="text"></slot>
			</v-card>
		

			<v-footer class="text-subtitle-2">
				<slot name="footer"></slot>
			</v-footer>
	
	</v-card>
</template>

<script lang="ts" setup>
import BackBtn from "../Btns/BackBtn.vue";
	defineEmits(["drawer:toggle"]);
	const props = defineProps<{
		title?: string;
		pageName?: string;
		subtitle?: string;
		loading: boolean;
		cover?: string;
		generalInfo?: DetailList;
		avatar?: string;
		displayAvatar?: boolean;
		isAuth?: boolean;
		drawer?: boolean;
	}>();
	const showWarning = ref(!props.isAuth);

</script>

<style>
	.default-cover {
		background-image: repeating-radial-gradient(
			circle at center center,
			rgb(27, 27, 27, 0.3) 0px,
			rgb(27, 27, 27, 0.3) 36px,
			rgb(84, 84, 84, 0.3) 36px,
			rgba(55, 162, 192, 0.3) 64px,
			rgba(21, 127, 219, 0.512) 64px,
			rgba(65, 102, 172, 0.917) 87px
		) !important;
		background-size: 53px 53px !important;
	}
</style>
