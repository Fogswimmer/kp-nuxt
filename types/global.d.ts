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

  interface Detail {
    title: string;
    value: string;
    id?: number | null;
    subtitle?: string;
    icon?: string;
    to?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedBy?: string;
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
  interface IPerson {
    id: number | null;
    firstname: string;
    lastname: string;
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
  }

  interface FilmWork {
    actedInfilms: [IFilm]
    directedFilms: [IFilm]
    producedFilms: [IFilm]
    composedFilms: [IFilm]
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
}
export {};
