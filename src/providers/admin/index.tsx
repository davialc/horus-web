import React, { useContext, useMemo } from 'react';
import { IOffice } from '../../@types/office';
import { apiAdmin } from '../../services/api';
import Mask, { StringUtil } from '../../utils/mask';

interface IAdminContext {
	offices: IOffice[];
	setOffices: React.Dispatch<React.SetStateAction<IOffice[]>>;
	handleCreateOffice: ({ cnpj, registered_name }: any) => Promise<void>;
}

const AdminContext = React.createContext({} as IAdminContext);

export const AdminProvider = ({ children }: any) => {
	const [offices, setOffices] = React.useState<IOffice[]>([]);

	const getOffices = React.useCallback(async () => {
		const response = await apiAdmin({
			method: 'GET',
			url: '/auth/counter/list/user',
		});
		setOffices(response.data);
	}, [offices]);

	React.useEffect(() => {
		getOffices();
	}, [handleCreateOffice]);

	async function handleCreateOffice({ cnpj, registered_name }: any) {
		try {
			await apiAdmin({
				method: 'POST',
				url: '/auth/counter/user/create/',
				data: {
					cnpj: StringUtil.extractNumbers(cnpj),
					registered_name,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	const values = useMemo(
		() => ({
			offices,
			setOffices,
			handleCreateOffice,
		}),
		[offices]
	);

	return (
		<AdminContext.Provider value={values}>{children}</AdminContext.Provider>
	);
};

export const useAdmin = () => {
	const { offices, setOffices, handleCreateOffice } = useContext(AdminContext);

	return { offices, setOffices, handleCreateOffice };
};
