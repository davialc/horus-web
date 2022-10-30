import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import Router, { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { IAdmin } from '../../@types/admin';
import { apiAdmin } from '../../services/api';

interface IAdminAuthContext {
	handleAuthenticate: ({ email, password }: IAdmin) => Promise<void>;
	handleCreateAdmin: ({ email, password }: IAdmin) => Promise<void>;
	handleLogout: () => Promise<void>;
	user: string | null;
	setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const AdminAuthContext = React.createContext({} as IAdminAuthContext);

export const AdminAuthProvider = ({ children }: any) => {
	const [user, setUser] = React.useState<string | null>(null);
	const router = useRouter();

	React.useEffect(() => {
		const token = getCookie('@horus-finance/admin-token');
		if (token) {
			const userCookie = getCookie('@horus-finance/user');
			setUser(userCookie as string);
		}
	}, []);

	async function handleLogout() {
		try {
			const response = await apiAdmin({
				method: 'GET',
				url: '/auth/admin/logout/',
			});
			console.log(response);
			deleteCookie('@horus-finance/admin-token');
			router.push('/admin/login');
		} catch (error) {
			console.log(error);
		}
	}

	async function handleAuthenticate({ email, password }: IAdmin) {
		try {
			const response = await apiAdmin({
				method: 'POST',
				url: '/auth/admin/login/',
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
			setCookie('@horus-finance/admin-token', token);
			setCookie('@horus-finance/user', email);
			apiAdmin.defaults.headers['Authorization'] = token;
			setUser(email);
			router.replace('/admin/home');
		} catch (error) {
			console.log(error);
		}
	}

	async function handleCreateAdmin({ email, password }: IAdmin) {
		try {
			const response = await axios({
				method: 'POST',
				url: 'https://still-meadow-57659.herokuapp.com/api/auth/admin/user/create/',
				data: {
					username: email,
					password,
				},
			});
			console.log(response);
			router.push('/admin/login');
		} catch (error) {
			// @ts-ignore
			console.log(error.response.data.detail);
		}
	}

	const values = React.useMemo(
		() => ({
			handleAuthenticate,
			user,
			setUser,
			handleCreateAdmin,
			handleLogout,
		}),
		[user]
	);

	return (
		<AdminAuthContext.Provider value={values}>
			{children}
		</AdminAuthContext.Provider>
	);
};

export const useAdminAuth = () => {
	const { handleAuthenticate, handleCreateAdmin, handleLogout, user, setUser } =
		useContext(AdminAuthContext);

	return {
		handleAuthenticate,
		handleCreateAdmin,
		handleLogout,
		user,
		setUser,
	};
};
