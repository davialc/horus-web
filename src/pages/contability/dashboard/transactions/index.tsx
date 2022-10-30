import { Button, Card, Heading, Text } from '@horus-finance/react';
import Link from 'next/link';
import { Container } from '../../../../../stitches.config';
import { Header } from '../../../../components/Header';
import { Navbar } from '../../../../components/Navbar';
import Table from '../../../../components/Table';
import { useContability } from '../../../../providers/contability';
// @ts-ignore

import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function Transactions() {
	const { setDashboardData, dashboardData } = useContability();

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
					<Container direction="column" gap="3">
						<Container justify="between" css={{ width: 700 }}>
							<Card amount={30} colorType="blue" label="Saldo" />
							<Card amount={30} colorType="green" label="Entradas" />
							<Card amount={30} colorType="red" label="Saídas" />
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
							<ExcelFile element={<Button>Exportar para Excel</Button>}>
								<ExcelSheet data={dashboardData.transactions} name="Employees">
									<ExcelColumn label="Data" value="date" />
									<ExcelColumn label="Tipo de operação" value="type" />
									<ExcelColumn label="Entrada ou saída" value="in_out" />
									<ExcelColumn label="CPF ou CNPJ" value="person_type" />
									<ExcelColumn label="Categoria" value="category" />
									<ExcelColumn label="Descrição" value="description" />
									<ExcelColumn label="Documento" value="document" />
									<ExcelColumn label="Valor da operação" value="amount" />
									<ExcelColumn label="Saldo" value="saldo" />
								</ExcelSheet>
							</ExcelFile>
							{/* <DownloadExcel
								data={dashboardData.transactions}
								filename="Consolidação bancária"
								name="emails-export"
								element={<Button>Exportar para Excel</Button>}
							>
								<ExcelColumn label="Data" value="date" />
								<ExcelColumn label="Tipo de operação" value="type" />
								<ExcelColumn label="Entrada ou saída" value="in_out" />
								<ExcelColumn label="CPF ou CNPJ" value="person_type" />
								<ExcelColumn label="Categoria" value="category" />
								<ExcelColumn label="Descrição" value="description" />
								<ExcelColumn label="Documento" value="document" />
								<ExcelColumn label="Valor da operação" value="amount" />
								<ExcelColumn label="Saldo" value="saldo" />
							</DownloadExcel> */}
						</Container>
						<Table
							cols={[
								{ field: 'date', title: 'Data', size: 'min-content' },
								{ field: 'type', title: 'Operação', size: 'min-content' },
								{
									field: 'in_out',
									title: 'Entrada ou saída',
									size: 'min-content',
								},
								{
									field: 'person_type',
									title: 'CPF ou CNPJ',
									size: 'min-content',
								},
								{
									field: 'description',
									title: 'Descrição',
									size: 'min-content',
								},
								{ field: 'document', title: 'Documento', size: 'min-content' },
								{ field: 'amount', title: 'Valor', size: 'min-content' },
								{ field: 'category', title: 'Categoria', size: 'min-content' },
								{ field: 'amount', title: 'Valor', size: 'min-content' },
								{ field: 'saldo', title: 'Saldo', size: 'min-content' },
							]}
							rows={dashboardData.transactions.map((transaction: any) => ({
								amount: transaction.amount,
								category: transaction.category,
								description: transaction.description,
								date: transaction.date,
								id: transaction.id,
								type: transaction.type,
								in_out: transaction.amount < 0 ? 'Saída' : 'Entrada',
								person_type: '',
								document: '',
								saldo: dashboardData.amount,
							}))}
						/>
					</Container>
				</Container>
			</Container>
		</Container>
	);
}
