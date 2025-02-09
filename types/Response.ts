declare global {
	interface IFilmListResponse {
		items: IFilm[];
		totalPages: number;
		currentPage: number;
	}
	interface IPersonListResponse {
		items: IPerson[];
		currentPage: number;
		totalPages: number;
	}
	interface ICheckEmptyResponse {
		present: boolean;
	}

	interface SpecialtySelectItem {
		id: number;
		name: string;
		avatar?: string;
	}

	interface ISpecialistsResponse {
		items: SpecialtySelectItem[];
	}
	interface JWTResponse {
    token: string;
    refresh_token?: string;
	}
	interface ISpecialistsListResponse {
		actors: {
			items: Partial<IPerson>[];
		}
		directors: {
			items: Partial<IPerson>[];
		}
		producers: {
			items: Partial<IPerson>[];
		}
		composers: {
			items: Partial<IPerson>[];
		}
		writers: {
			items: Partial<IPerson>[];
		}
	 }
}
