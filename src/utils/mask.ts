import { Comparator } from '../@types/global';

export class StringUtil {
	public static isSomeIncluded(values: Array<string>, value: string) {
		return values.some((str) => value.includes(str));
	}

	public static isOnlyNumbers(
		value: string,
		shouldIgnoreWhitespaces?: boolean
	) {
		return /^[0-9]+$/.test(
			shouldIgnoreWhitespaces ? StringUtil.clearSpaces(value) : value
		);
	}

	public static isOnlyLetters(
		value: string,
		shouldIgnoreWhitespaces?: boolean
	) {
		return /^[a-zA-Z]+$/.test(
			shouldIgnoreWhitespaces ? StringUtil.clearSpaces(value) : value
		);
	}

	public static hasSomeNumber(value: string) {
		return /[0-9]/g.test(value);
	}

	public static clearSpaces(value: string) {
		return value.replace(/\s+/g, '');
	}

	public static capitalize(value: string) {
		return value.charAt(0) + value.slice(1);
	}

	public static extractNumbers(value: string) {
		return value.replace(/[^0-9]/g, '');
	}
}

class ArrayUtil {
	public static addOrRemoveItem<T>(array: Array<T>, item: T): Array<T> {
		return array.includes(item)
			? array.filter((value) => value !== item)
			: [...array, item];
	}

	public static getLastElement<T>(array: Array<T>): T | undefined {
		return array[array.length - 1];
	}

	public static countOccurrences<T>(
		array: Array<T>,
		search: T,
		limitIndex = array.length - 1
	) {
		return array
			.slice(0, limitIndex + 1)
			.reduce(
				(accumulator, value) =>
					value === search ? accumulator + 1 : accumulator,
				0
			);
	}

	public static filterDuplicates<T>(
		array: Array<T>,
		comparator: Comparator<T>
	): Array<T> {
		return array.filter(
			(value1, index) =>
				index === array.findIndex((value2) => comparator(value1, value2))
		);
	}

	public static splitIntoChunks<T>(
		array: Array<T>,
		chunkSize: number,
		shouldFill?: false
	): Array<Array<T>>;

	public static splitIntoChunks<T>(
		array: Array<T>,
		chunkSize: number,
		shouldFill: boolean
	): Array<Array<T | null>>;

	public static splitIntoChunks<T>(
		array: Array<T>,
		chunkSize: number,
		shouldFill?: boolean
	) {
		return Array(Math.ceil(array.length / chunkSize))
			.fill(null)
			.map((_, i) => {
				const chunk = array.slice(i * chunkSize, (i + 1) * chunkSize);
				const rest = chunkSize - chunk.length;

				return shouldFill ? [...chunk, ...Array<null>(rest).fill(null)] : chunk;
			});
	}
}

type DateFormat = 'DD/MM/YYYY' | 'MM/YYYY';

class Mask {
	public static currency(value: number | string, prefix = 'R$ ') {
		return `${prefix}${Number(value).toLocaleString('pt-br', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})}`;
	}

	public static zipCode(value: number | string) {
		return Mask.maskNumber(value, '#####-###');
	}

	public static phone(valueIn: number | string) {
		let value = StringUtil.extractNumbers(String(valueIn));

		if (value.length === 12 || value.length === 13) {
			value = value.slice(2);
		}

		return Mask.maskNumber(
			value,
			value.length === 11 ? '(##) #####-####' : '(##) ####-####'
		);
	}

	public static date(value: Date, format: DateFormat = 'DD/MM/YYYY') {
		const year = value.getFullYear();

		const day = value.getDate().toString().padStart(2, '0');

		const month = (value.getMonth() + 1).toString().padStart(2, '0');

		return {
			'DD/MM/YYYY': `${day}/${month}/${year}`,
			'MM/YYYY': `${month}/${year}`,
		}[format];
	}

	public static cpf(value: number | string) {
		return Mask.maskNumber(value, '###.###.###-##');
	}

	public static cnpj(value: number | string) {
		return Mask.maskNumber(value, '##.###.###/####-##');
	}

	public static getCpfOrCnpj(value: number | string) {
		return String(value).length <= 11 ? Mask.cpf(value) : Mask.cnpj(value);
	}

	public static maskNumber(
		valueIn: number | string,
		mask: string,
		placeholder = '_'
	) {
		const value = StringUtil.extractNumbers(String(valueIn));

		return Array.from(mask)
			.map((char, index, array) =>
				char !== '#'
					? char
					: value[ArrayUtil.countOccurrences(array, '#', index) - 1] ??
					  placeholder
			)
			.join('');
	}
}

export type { DateFormat };
export default Mask;
