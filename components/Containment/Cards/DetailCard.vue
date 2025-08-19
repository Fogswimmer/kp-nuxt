<template>
	<v-card
		flat
		class="pb-2 overflow-y-auto"
		:min-height="`calc(100dvh - ${$vuetify.display.mdAndUp ? 64 : 128}px)`"
		variant="text"
	>
		<v-card flat>
			<slot name="toolbar" />
			<template v-if="loading" #loader>
				<v-progress-linear indeterminate color="primary" />
			</template>
			<v-card flat>
				<v-parallax
					v-if="cover"
					:src="cover"
					cover
					:height="$vuetify.display.mdAndUp ? 550 : 400"
					class="position-relative"
				>
					<div class="w-100 pa-2 text-end">
          <slot name="publisher-info" />
					</div>
					<template #placeholder>
						<ImgPlaceholder />
					</template>
					<template #error>
						<v-sheet
							:height="$vuetify.display.mdAndUp ? 550 : 400"
							width="100%"
							:class="
								theme.current.value.dark
									? 'default-cover-dark'
									: 'default-cover-light'
							"
						/>
					</template>
				</v-parallax>
				<v-sheet
					v-else-if="!noCover"
					:height="$vuetify.display.mdAndUp ? 550 : 400"
					width="100%"
					:class="
						theme.current.value.dark
							? 'default-cover-dark'
							: 'default-cover-light'
					"
				/>

				<slot name="top_film" />
			</v-card>
			<div class="position-absolute bottom-0 left-0 right-0">
				<slot name="general_info" />
			</div>
		</v-card>

		<slot name="text" />
	</v-card>
</template>

<script lang="ts" setup>
import ImgPlaceholder from "../Img/ImgPlaceholder.vue";

defineProps<{
	loading: boolean;
	cover?: string;
	noCover?: boolean;
}>();

const theme = useTheme();
</script>

<style>
.default-cover-dark {
	background-image:
		linear-gradient(
			330deg,
			rgba(225, 225, 225, 0.05) 0%,
			rgba(225, 225, 225, 0.05) 33.333%,
			rgba(114, 114, 114, 0.05) 33.333%,
			rgba(114, 114, 114, 0.05) 66.666%,
			rgba(52, 52, 52, 0.05) 66.666%,
			rgba(52, 52, 52, 0.05) 99.999%
		),
		linear-gradient(
			66deg,
			rgba(181, 181, 181, 0.05) 0%,
			rgba(181, 181, 181, 0.05) 33.333%,
			rgba(27, 27, 27, 0.05) 33.333%,
			rgba(27, 27, 27, 0.05) 66.666%,
			rgba(251, 251, 251, 0.05) 66.666%,
			rgba(251, 251, 251, 0.05) 99.999%
		),
		linear-gradient(
			225deg,
			rgba(98, 98, 98, 0.05) 0%,
			rgba(98, 98, 98, 0.05) 33.333%,
			rgba(222, 222, 222, 0.05) 33.333%,
			rgba(222, 222, 222, 0.05) 66.666%,
			rgba(228, 228, 228, 0.05) 66.666%,
			rgba(228, 228, 228, 0.05) 99.999%
		),
		linear-gradient(90deg, rgb(3, 14, 32), rgb(5, 15, 22)) !important;
}
.default-cover-light {
	background-image:
		linear-gradient(
			55deg,
			rgba(208, 208, 208, 0.03) 0%,
			rgba(208, 208, 208, 0.03) 20%,
			rgba(55, 55, 55, 0.03) 20%,
			rgba(55, 55, 55, 0.03) 40%,
			rgba(81, 81, 81, 0.03) 40%,
			rgba(81, 81, 81, 0.03) 60%,
			rgba(208, 208, 208, 0.03) 60%,
			rgba(208, 208, 208, 0.03) 80%,
			rgba(191, 191, 191, 0.03) 80%,
			rgba(191, 191, 191, 0.03) 100%
		),
		linear-gradient(
			291deg,
			rgba(190, 190, 190, 0.02) 0%,
			rgba(190, 190, 190, 0.02) 14.286%,
			rgba(105, 105, 105, 0.02) 14.286%,
			rgba(105, 105, 105, 0.02) 28.572%,
			rgba(230, 230, 230, 0.02) 28.572%,
			rgba(230, 230, 230, 0.02) 42.858%,
			rgba(216, 216, 216, 0.02) 42.858%,
			rgba(216, 216, 216, 0.02) 57.144%,
			rgba(181, 181, 181, 0.02) 57.144%,
			rgba(181, 181, 181, 0.02) 71.42999999999999%,
			rgba(129, 129, 129, 0.02) 71.43%,
			rgba(129, 129, 129, 0.02) 85.71600000000001%,
			rgba(75, 75, 75, 0.02) 85.716%,
			rgba(75, 75, 75, 0.02) 100.002%
		),
		linear-gradient(
			32deg,
			rgba(212, 212, 212, 0.03) 0%,
			rgba(212, 212, 212, 0.03) 12.5%,
			rgba(223, 223, 223, 0.03) 12.5%,
			rgba(223, 223, 223, 0.03) 25%,
			rgba(11, 11, 11, 0.03) 25%,
			rgba(11, 11, 11, 0.03) 37.5%,
			rgba(86, 86, 86, 0.03) 37.5%,
			rgba(86, 86, 86, 0.03) 50%,
			rgba(106, 106, 106, 0.03) 50%,
			rgba(106, 106, 106, 0.03) 62.5%,
			rgba(220, 220, 220, 0.03) 62.5%,
			rgba(220, 220, 220, 0.03) 75%,
			rgba(91, 91, 91, 0.03) 75%,
			rgba(91, 91, 91, 0.03) 87.5%,
			rgba(216, 216, 216, 0.03) 87.5%,
			rgba(216, 216, 216, 0.03) 100%
		),
		linear-gradient(
			312deg,
			rgba(113, 113, 113, 0.01) 0%,
			rgba(113, 113, 113, 0.01) 14.286%,
			rgba(54, 54, 54, 0.01) 14.286%,
			rgba(54, 54, 54, 0.01) 28.572%,
			rgba(166, 166, 166, 0.01) 28.572%,
			rgba(166, 166, 166, 0.01) 42.858%,
			rgba(226, 226, 226, 0.01) 42.858%,
			rgba(226, 226, 226, 0.01) 57.144%,
			rgba(109, 109, 109, 0.01) 57.144%,
			rgba(109, 109, 109, 0.01) 71.42999999999999%,
			rgba(239, 239, 239, 0.01) 71.43%,
			rgba(239, 239, 239, 0.01) 85.71600000000001%,
			rgba(54, 54, 54, 0.01) 85.716%,
			rgba(54, 54, 54, 0.01) 100.002%
		),
		linear-gradient(
			22deg,
			rgba(77, 77, 77, 0.03) 0%,
			rgba(77, 77, 77, 0.03) 20%,
			rgba(235, 235, 235, 0.03) 20%,
			rgba(235, 235, 235, 0.03) 40%,
			rgba(215, 215, 215, 0.03) 40%,
			rgba(215, 215, 215, 0.03) 60%,
			rgba(181, 181, 181, 0.03) 60%,
			rgba(181, 181, 181, 0.03) 80%,
			rgba(193, 193, 193, 0.03) 80%,
			rgba(193, 193, 193, 0.03) 100%
		),
		linear-gradient(
			80deg,
			rgba(139, 139, 139, 0.02) 0%,
			rgba(139, 139, 139, 0.02) 14.286%,
			rgba(114, 114, 114, 0.02) 14.286%,
			rgba(114, 114, 114, 0.02) 28.572%,
			rgba(240, 240, 240, 0.02) 28.572%,
			rgba(240, 240, 240, 0.02) 42.858%,
			rgba(221, 221, 221, 0.02) 42.858%,
			rgba(221, 221, 221, 0.02) 57.144%,
			rgba(74, 74, 74, 0.02) 57.144%,
			rgba(74, 74, 74, 0.02) 71.42999999999999%,
			rgba(201, 201, 201, 0.02) 71.43%,
			rgba(201, 201, 201, 0.02) 85.71600000000001%,
			rgba(187, 187, 187, 0.02) 85.716%,
			rgba(187, 187, 187, 0.02) 100.002%
		),
		linear-gradient(
			257deg,
			rgba(72, 72, 72, 0.03) 0%,
			rgba(72, 72, 72, 0.03) 16.667%,
			rgba(138, 138, 138, 0.03) 16.667%,
			rgba(138, 138, 138, 0.03) 33.334%,
			rgba(54, 54, 54, 0.03) 33.334%,
			rgba(54, 54, 54, 0.03) 50.001000000000005%,
			rgba(161, 161, 161, 0.03) 50.001%,
			rgba(161, 161, 161, 0.03) 66.668%,
			rgba(17, 17, 17, 0.03) 66.668%,
			rgba(17, 17, 17, 0.03) 83.33500000000001%,
			rgba(230, 230, 230, 0.03) 83.335%,
			rgba(230, 230, 230, 0.03) 100.002%
		),
		linear-gradient(
			47deg,
			rgba(191, 191, 191, 0.01) 0%,
			rgba(191, 191, 191, 0.01) 16.667%,
			rgba(27, 27, 27, 0.01) 16.667%,
			rgba(27, 27, 27, 0.01) 33.334%,
			rgba(66, 66, 66, 0.01) 33.334%,
			rgba(66, 66, 66, 0.01) 50.001000000000005%,
			rgba(36, 36, 36, 0.01) 50.001%,
			rgba(36, 36, 36, 0.01) 66.668%,
			rgba(230, 230, 230, 0.01) 66.668%,
			rgba(230, 230, 230, 0.01) 83.33500000000001%,
			rgba(93, 93, 93, 0.01) 83.335%,
			rgba(93, 93, 93, 0.01) 100.002%
		),
		linear-gradient(90deg, #dbdbdb, #ffffff) !important;
}
</style>
