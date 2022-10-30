import { getCookie } from 'cookies-next';
import React, { useContext, useMemo } from 'react';
import { IClient } from '../../@types/client';
import { apiContability } from '../../services/api';
import { StringUtil } from '../../utils/mask';

interface IContabilityContext {
	clients: any;
	setClients: React.Dispatch<React.SetStateAction<any>>;
	handleCreateClient: ({ cnpj, registered_name }: any) => Promise<void>;
	dashboardData: any;
	setDashboardData: any;
}

const ContabilityContext = React.createContext({} as IContabilityContext);

export const ContabilityProvider = ({ children }: any) => {
	const [clients, setClients] = React.useState<any>([]);
	const [dashboardData, setDashboardData] = React.useState({
		transactions: [],
		incoming: 0,
		withdraw: 0,
		amount: 0,
	});

	const getClients = async () => {
		const tokenContability = getCookie('@horus-finance/contability-token');

		const response = await apiContability({
			method: 'GET',
			url: '/auth/client/list/user',
			headers: {
				Authorization: tokenContability,
			},
		});
		setClients(response.data);
	};

	React.useEffect(() => {
		getClients();
	}, []);

	async function handleCreateClient({ cnpj, registered_name }: IClient) {
		try {
			const response = await apiContability({
				method: 'POST',
				url: '/auth/client/user/create/',
				data: {
					cnpj: StringUtil.extractNumbers(cnpj),
					registered_name,
				},
			});
			console.log(response.data);
			getClients();
		} catch (error) {
			console.log(error);
		}
	}

	const values = useMemo(
		() => ({
			clients,
			setClients,
			handleCreateClient,
			dashboardData,
			setDashboardData,
		}),
		[clients, dashboardData]
	);

	return (
		<ContabilityContext.Provider value={values}>
			{children}
		</ContabilityContext.Provider>
	);
};

export const useContability = () => {
	const {
		clients,
		setClients,
		handleCreateClient,
		dashboardData,
		setDashboardData,
	} = useContext(ContabilityContext);

	return {
		clients,
		setClients,
		handleCreateClient,
		dashboardData,
		setDashboardData,
	};
};
