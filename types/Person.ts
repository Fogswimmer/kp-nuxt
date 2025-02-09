declare global {
	interface IPerson {
		id: number | null;
		firstname: string;
		lastname: string;
		photos: string[] | [];
		gender: string;
		genderId: number;
		birthday: string | null;
		specialtyNames: string[];
		specialtyIds: number[];
		actedInFilms: Partial<IFilm>[];
		producedFilms: Partial<IFilm>[];
		writtenFilms: Partial<IFilm>[];
		bio: string;
		age: number;
		cover: string | null;
		avatar: string | null;
		createdAt: string | null;
		updatedAt: string | null;
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

	interface IGender {
		name: string;
		value: string;
  }
  interface ISpecialty {
    name: string;
    value: number;
  }

}
export {};
