declare global {
	interface CardDetails {
		name: string;
		value: string | number;
		type?: string;
		tooltip?: boolean;
		icon?: string;
		to?: string;
		avatar?: string;
	}

	interface DetailList {
		subheader?: string;
		list: CardDetails[];
	}


	interface Breadcrumb {
		to: string;
		title: string;
		icon?: string;
		disabled?: boolean;
	}


	interface ImgPlaceholderOptions {
		displayIcon: boolean;
	}
	interface ImgOptions {
		shaded?: boolean;
		height?: number | string;
		cover?: boolean;
		class?: string;
		aspectRatio?: number | string;
		clickable?: boolean;
		removable?: boolean;
		uploaded?: boolean;
		placeholderOptions?: ImgPlaceholderOptions;
		uploader?: boolean;
	}

}
