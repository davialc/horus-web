import {
	Box,
	Card,
	Heading,
	Progress,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectItemText,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	SelectViewport,
	Text,
} from '@horus-finance/react';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { Container } from '../../../../stitches.config';
import { Chart } from '../../../components/Chart';
import { Header } from '../../../components/Header';
import { Navbar } from '../../../components/Navbar';
import Table from '../../../components/Table';
import { useContability } from '../../../providers/contability';
import { apiContability } from '../../../services/api';

export default function Dashboard({ clientToken }: any) {
	const { setDashboardData, dashboardData } = useContability();
	async function getTransactions() {
		try {
			const response = await apiContability({
				method: 'GET',
				url: '/pluggy/list/transactions',
				headers: {
					Authorization: clientToken,
				},
			});
			const data = response.data.accounts;
			setDashboardData((prevState: any) => {
				const incoming = data
					.filter((transaction: any) => transaction.amount >= 0)
					.map((transaction: any) => transaction.amount)
					.reduce((a: any, b: any) => a + b);
				const withdraw = data
					.filter((transaction: any) => transaction.amount < 0)
					.map((transaction: any) => transaction.amount)
					.reduce((a: any, b: any) => a - b);
				const amount = incoming - withdraw;
				return {
					...prevState,
					transactions: data,
					incoming,
					withdraw,
					amount,
				};
			});
			// @ts-ignore
		} catch (error) {
			console.log(error);
		}
	}

	React.useEffect(() => {
		getTransactions();
	}, []);
	return (
		<Container direction="column" css={{ height: '100vh', maxHeight: '100vh' }}>
			<Header />
			<Container css={{ height: 'auto', paddingTop: 80 }}>
				<Navbar />
				<Container
					as="main"
					css={{ padding: '$6', width: '100%', maxWidth: 1145, gap: '$8' }}
					direction="column"
				>
					<Container justify="between" align="center" css={{ height: 48 }}>
						<Heading
							as="h3"
							variant="sm"
							css={{ color: '$gray450', fontWeight: '$regular' }}
						>
							Dados bancários
						</Heading>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Selecione um banco..." />
							</SelectTrigger>
							<SelectContent>
								<SelectViewport>
									<SelectGroup>
										<SelectLabel>Bancos</SelectLabel>
										<SelectItem value="Santander">
											<SelectItemText>Santander</SelectItemText>
										</SelectItem>
										<SelectItem value="Bradesco">
											<SelectItemText>Bradesco</SelectItemText>
										</SelectItem>
									</SelectGroup>
								</SelectViewport>
							</SelectContent>
						</Select>
					</Container>
					<Container direction="column" gap="3">
						<Container justify="between" css={{ width: 700 }}>
							<Card
								amount={dashboardData.amount}
								colorType="blue"
								label="Saldo"
							/>
							<Card
								amount={dashboardData.incoming}
								colorType="green"
								label="Entradas"
							/>
							<Card
								amount={dashboardData.withdraw}
								colorType="red"
								label="Saídas"
							/>
						</Container>
					</Container>
					<Container css={{ width: '100%', gap: '$8' }} justify="between">
						<Container direction="column" css={{ width: 700, gap: '$3' }}>
							<Container
								align="center"
								justify="between"
								css={{ width: '100%', height: 48 }}
							>
								<Heading
									as="h3"
									variant="sm"
									css={{ color: '$gray450', fontWeight: '$regular' }}
								>
									Fluxo de entradas e saídas
								</Heading>
								<Select>
									<SelectTrigger css={{ height: 'fit-content' }}>
										<SelectValue placeholder="Selecione um banco..." />
									</SelectTrigger>
									<SelectContent>
										<SelectViewport>
											<SelectGroup>
												<SelectLabel>Bancos</SelectLabel>
												<SelectItem value="Santander">
													<SelectItemText>Santander</SelectItemText>
												</SelectItem>
												<SelectItem value="Bradesco">
													<SelectItemText>Bradesco</SelectItemText>
												</SelectItem>
											</SelectGroup>
										</SelectViewport>
									</SelectContent>
								</Select>
							</Container>
							<Box
								css={{
									width: 700,
									height: 420,
									background: '$white',
									boxSizing: 'border-box',
								}}
							>
								<Chart />
							</Box>
						</Container>
						<Container direction="column" css={{ width: '100%', gap: '$3' }}>
							<Container
								align="center"
								justify="between"
								css={{ width: '100%', height: 48 }}
							>
								<Heading
									as="h3"
									variant="sm"
									css={{ color: '$gray450', fontWeight: '$regular' }}
								>
									Movimentações
								</Heading>

								<Link href="https://google.com">
									<Text>Ver todos</Text>
								</Link>
							</Container>
							<Box
								css={{
									background: '$white',
									boxSizing: 'border-box',
									height: 420,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
								}}
							>
								<Container align="center" justify="between">
									<Container direction="column">
										<Text>Janeiro</Text>
										<Progress defaultValue={[10]} />
									</Container>
									<Text>R$ 30,00</Text>
								</Container>
								<Container align="center" justify="between">
									<Container direction="column">
										<Text>Janeiro</Text>
										<Progress defaultValue={[70]} />
									</Container>
									<Text>R$ 30,00</Text>
								</Container>
								<Container align="center" justify="between">
									<Container direction="column">
										<Text>Janeiro</Text>
										<Progress defaultValue={[30]} />
									</Container>
									<Text>R$ 30,00</Text>
								</Container>
								<Container align="center" justify="between">
									<Container direction="column">
										<Text>Janeiro</Text>
										<Progress defaultValue={[90]} />
									</Container>
									<Text>R$ 30,00</Text>
								</Container>
								<Container align="center" justify="between">
									<Container direction="column">
										<Text>Janeiro</Text>
										<Progress defaultValue={[50]} />
									</Container>
									<Text>R$ 30,00</Text>
								</Container>
							</Box>
						</Container>
					</Container>
					<Container direction="column" css={{ width: '100%', gap: '$3' }}>
						<Container
							align="center"
							justify="between"
							css={{ width: '100%', height: 48 }}
						>
							<Heading
								as="h3"
								variant="sm"
								css={{ color: '$gray450', fontWeight: '$regular' }}
							>
								Histórico de transações
							</Heading>

							<Link href="https://google.com">
								<Text>Ver todos</Text>
							</Link>
						</Container>
						<Table
							cols={[
								{ field: 'date', title: 'Data', size: 'min-content' },
								{
									field: 'description',
									title: 'Descrição',
									size: 'min-content',
								},
								{ field: 'category', title: 'Categoria', size: 'min-content' },
								{ field: 'amount', title: 'Valor', size: 'min-content' },
							]}
							rows={dashboardData.transactions.map((transaction: any) => ({
								amount: transaction.amount,
								category: transaction.category,
								description: transaction.description,
								date: transaction.date,
								id: transaction.id,
							}))}
						/>
					</Container>
				</Container>
			</Container>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	query,
}) => {
	const token = getCookie('@horus-finance/contability-token', { req, res });
	const { cnpj } = query;

	try {
		const response = await apiContability({
			method: 'GET',
			url: `/auth/client/list/user?cnpj=${cnpj}`,
			headers: {
				Authorization: '',
			},
		});

		const { token: clientToken } = response.data;
		console.log(clientToken);
		return {
			props: {
				clientToken,
			},
		};
	} catch (error) {
		return {
			redirect: {
				destination: '/contability/home',
				permanent: false,
			},
		};
	}
	// if (!token) {
	// 	return {
	// 		redirect: {
	// 			destination: '/contability/login',
	// 			permanent: false,
	// 		},
	// 	};
	// }
};
