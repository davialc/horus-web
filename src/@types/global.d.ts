export type Comparator<T> = (value1: T, value2: T) => boolean;

export type ClassNames<T extends PropertyKey> = Partial<Record<T, string>>;

export interface IUser {
	email: string;
	password: string;
}
