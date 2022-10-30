import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { IUser } from '../../@types/global';
import { IOffice } from '../../@types/office';
import { apiContability } from '../../services/api';

interface IContabilityAuthContext {
	handleAuthenticate: ({ email, password }: IUser) => Promise<void>;
	handleCreateContability: ({
		cnpj,
		counter_name,
		crc,
		registered_name,
		username,
	}: any) => Promise<void>;
	handleLogout: () => Promise<void>;
	contability: string | null;
	setContability: React.Dispatch<React.SetStateAction<string | null>>;
}

const ContabilityAuthContext = React.createContext(
	{} as IContabilityAuthContext
);

export const ContabilityAuthProvider = ({ children }: any) => {
	const [contability, setContability] = React.useState<string | null>(null);
	const router = useRouter();

	React.useEffect(() => {
		const token = getCookie('@horus-finance/contability-token');
		if (token) {
			const contabilityCookie = getCookie('@horus-finance/contability');
			setContability(contabilityCookie as string);
		}
	}, []);

	async function handleLogout() {
		try {
			const response = await apiContability({
				method: 'GET',
				url: '/auth/counter/logout/',
			});
			console.log(response);
			deleteCookie('@horus-finance/contability-token');
			router.push('/contability/login');
		} catch (error) {
			console.log(error);
		}
	}

	async function handleAuthenticate({ email, password }: IUser) {
		try {
			const response = await apiContability({
				method: 'POST',
				url: '/auth/counter/login/',
				data: {
					username: email,
					password,
				},
				headers: {
					Authorization: '',
				},
			});
			console.log(response);
			// @ts-ignore
			const { token: token } = response.data;
			setCookie('@horus-finance/contability-token', token);
			setCookie('@horus-finance/contability', email);
			apiContability.defaults.headers['Authorization'] = token;
			setContability(contability);
			router.replace('/contability/home');
		} catch (error) {
			console.log(error);
		}
	}

	async function handleCreateContability({
		cnpj,
		counter_name,
		crc,
		registered_name,
		email,
		password,
	}: IOffice) {
		try {
			const response = await apiContability({
				method: 'POST',
				url: '/auth/counter/user/create/',
				data: {
					cnpj,
					counter_name,
					crc,
					registered_name,
					username: email,
					password,
				},
				headers: {
					Authorization: '',
				},
			});
			console.log(response);
			router.push('/contability/login');
		} catch (error) {
			// @ts-ignore
			console.log(error.response.data.detail);
		}
	}

	const values = React.useMemo(
		() => ({
			handleAuthenticate,
			contability,
			setContability,
			handleCreateContability,
			handleLogout,
		}),
		[contability]
	);

	return (
		<ContabilityAuthContext.Provider value={values}>
			{children}
		</ContabilityAuthContext.Provider>
	);
};

export const useContabilityAuth = () => {
	const {
		handleAuthenticate,
		handleCreateContability,
		handleLogout,
		contability,
		setContability,
	} = useContext(ContabilityAuthContext);

	return {
		handleAuthenticate,
		handleCreateContability,
		handleLogout,
		contability,
		setContability,
	};
};
