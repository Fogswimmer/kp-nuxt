declare global {
	interface IFilm {
		id: number | null;
		name: string;
		genres: string[] | [];
		genreIds: number[] | [];
		genreNames: string[] | [];
		releaseYear: number | null;
		preview: string | null;
		gallery: string[] | [];
		description: string;
		rating: string | null;
		age: number;
		duration: string | number | Date | null;
		assessments: IAssessment[];
		slogan: string | null;
		roleNames: string[] | [];
		cover: string | null;
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
	}

	interface IAssessment {
		id: number | null;
		authorId: number | null;
		authorName: string | null;
		authorAvatar: string | null;
		rating: number;
		comment?: string;
	}

	interface FilmPerson {
		id: number | null;
		name?: string;
		avatar?: string;
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
	}
	interface IGenre {
		name: string;
		value: number;
	}
}
export {};
