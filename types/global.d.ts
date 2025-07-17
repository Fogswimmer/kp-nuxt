import "youtube";
declare global {
	enum Language {
		RU = "ru",
		EN = "en",
		FR = "fr",
	}

	interface FetchError {
		code: number;
		message: string;
		status?: string;
	}

	interface IFilm {
		id: number | null;
		name: string;
		internationalName: string;
		genres: string[] | [];
		genreIds: number[] | [];
		genreNames: string[] | [];
		releaseYear: number | null;
		poster: string | null;
		gallery: string[] | [];
		description: string;
		rating: string | null;
		age: number;
		duration: string | number | Date | null;
		assessments: IAssessment[];
		slogan: string | null;
		roleNames: string[] | [];
		createdAt: string | null;
		updatedAt: string | null;
		publisherData: FilmPerson;
		actors: FilmPerson[];
		actorIds: [];
		director: FilmPerson;
		directorId: number | null;
		producer: FilmPerson;
		producerId: number | null;
		composer: FilmPerson;
		composerId: number | null;
		writer: FilmPerson;
		writerId: number | null;
		teamData: FilmPerson[];
		actorsData: FilmPerson[];
		trailer: string | null;
		slug: string | null;
		assessmentsGraph: AssessmentsGraph[];
		country: string | null;
		countryCode: string;
		budget: number | null;
		fees: number | null;
	}
	interface AssessmentsGraph {
		rating: number;
		count: number;
	}
	interface IAssessment {
		id: number;
		authorId: number;
		authorName: string | null;
		authorAvatar: string | null;
		rating: number;
		comment?: string;
		createdAt: string;
	}

	interface FilmPerson {
		id: number;
		slug: string;
		name?: string;
		avatar?: string;
	}
	interface Detail {
		title: string;
		value: string;
		id?: number | null;
		subtitle?: string;
		icon?: string;
		to?: string | RouteLocationResolvedGeneric;
		rating?: number | string | null;
		avatar?: string;
		createdAt?: string;
		updatedAt?: string;
		publishedBy?: string;
		publisherData?: FilmPerson;
		releaseYear?: number | null;
		tooltip?: boolean;
		flag?: string;
		chipsArr?: {name: string, to: string | RouteLocationResolvedGeneric}[];
	}

	interface IFilmForm {
		id: number | null;
		name: string;
		slogan: string | null;
		genreIds: number[] | [];
		releaseYear: number | null;
		actorIds: number[] | [];
		directorId: number | null;
		producerId: number | null;
		composerId: number | null;
		writerId: number | null;
		description: string;
		age: number;
		duration: string | number | Date | null;
		gallery: string[] | [];
		cover: string | null;
		countryCode: string;
		budget: number | null;
		fees: number | null;
	}
	interface IGenre {
		name: string;
		value: number;
	}
	interface IPerson {
		id: number | null;
		firstname: string;
		lastname: string;
		internationalName: string;
		name?: string;
		photos: string[] | [];
		gender: string;
		genderId: number;
		birthday: string | null;
		specialtyNames: string[];
		specialtyIds: number[];
		filmWorks: FilmWork;
		bio: string;
		age: number;
		cover: string | null;
		avatar: string | null;
		createdAt: string | null;
		updatedAt: string | null;
		publisherData: FilmPerson;
		slug: string | null;
	}

	interface FilmWork {
		actedInFilms: [IFilm];
		directedFilms: [IFilm];
		producedFilms: [IFilm];
		composedFilms: [IFilm];
	}
	interface IPersonForm {
		id: number | null;
		firstname: string;
		lastname: string;
		genderId: number;
		specialtyIds: number[];
		birthday: string | null;
		bio: string;
	}
	interface IPersonListItem {
		id: number;
		fullname: string;
		photos: string[] | [];
		specialtyNames: string[];
	}

	interface SpecialtySelectItem {
		id: number;
		name: string;
		avatar?: string;
	}

	interface IGender {
		name: string;
		value: string;
	}
	interface ISpecialty {
		name: string;
		value: number;
	}

	interface JWTResponse {
		token: string;
		refresh_token?: string;
	}

	interface ICheckEmptyResponse {
		present: boolean;
	}

	interface ISpecialistsListResponse {
		actors: {
			items: Partial<IPerson>[];
		};
		directors: {
			items: Partial<IPerson>[];
		};
		producers: {
			items: Partial<IPerson>[];
		};
		composers: {
			items: Partial<IPerson>[];
		};
		writers: {
			items: Partial<IPerson>[];
		};
	}
	interface CardDetails {
		name: string;
		value: string | number;
		type?: string;
		tooltip?: boolean;
		icon?: string;
		to?: string;
		avatar?: string;
	}

	interface CurrentUser {
		id: number | null;
		username: string;
		password: string;
		cover: string;
		displayName: string;
		avatar: string;
		age: number;
		email: string;
		role: string;
		favorites: number[];
		about: string;
		lastLogin: Date;
		roles: ERole[] | [];
		about: string;
		assessments: IAssessment[];
	}
	interface IListItems {
		title: string;
		subtitle: string;
		imageSrc: string;
		to: string;
	}

	interface IOption {
		value: string;
		title: string;
	}

	interface CountryAlpha2Name {
		[key: string]: string;
	}
}
export {};
