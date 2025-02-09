declare global {
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
}
