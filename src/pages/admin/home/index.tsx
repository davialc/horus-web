import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Heading, Text } from '@horus-finance/react';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Plus, SignOut, X } from 'phosphor-react';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import { Container, styled } from '../../../../stitches.config';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '../../../components/Dialog';
import { OfficeCard } from '../../../components/OfficeCard';
import { Tooltip } from '../../../components/Tooltip';
import { useAdmin } from '../../../providers/admin';
import { useAdminAuth } from '../../../providers/admin/auth';
import Mask, { StringUtil } from '../../../utils/mask';
yup.setLocale(pt);

const Form = styled('form', {
	width: '100%',
	maxWidth: 380,
	display: 'flex',
	flexDirection: 'column',
	gap: '$2',
});

const Label = styled('label', Text);

const Footer = styled('footer', Container);

const Input = styled('input', {
	backgroundColor: '$white',
	padding: '$3 $4',
	borderRadius: '$md',
	boxSizing: 'border-box',
	border: '2px solid $gray300',
	display: 'flex',
	alignItems: 'baseline',
	fontFamily: '$default',
	fontSize: '$sm',
	color: '$background',
	fontWeight: '$regular',
	width: '100%',

	'&:focus': {
		outline: 0,
		borderColor: '$blue300',
	},

	'&:disabled': {
		cursor: 'not-allowed',
		color: '$gray400',
		opacity: 0.5,
	},

	'&:placeholder': {
		color: '$gray200',
	},

	'&[data-state-error="true"]': {
		borderColor: '$red500',
	},
});

const Error = styled(Text, {
	color: '$red500',
});

const Alert = styled(Box, {
	boxSizing: 'border-box',
	width: '100%',
	backgroundColor: '$gray100',
	position: 'relative',
});

const AlertButton = styled('button', {
	all: 'unset',
	position: 'absolute',
	top: 0,
	right: 0,
	margin: '$2',
	cursor: 'pointer',

	svg: {
		width: '$4',
		height: '$4',
	},
});

const signUpSchema = yup.object({
	cnpj: yup.string().required('O CNPJ é obrigatório'),
	registered_name: yup.string().required('A razão social é obrigatória'),
});

export default function AdminHome() {
	const [hasAlert, setHasAlert] = React.useState(true);
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);

	const { offices, handleCreateOffice } = useAdmin();

	const { handleLogout, user } = useAdminAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		reset,
	} = useForm({
		resolver: yupResolver(signUpSchema),
	});

	async function handleRegisterOffice(formData: FieldValues) {
		const { cnpj, registered_name } = formData;
		await handleCreateOffice({ cnpj, registered_name });
		reset();
		setIsDialogOpen(false);
	}

	return (
		<>
			<Container
				as="main"
				direction="column"
				css={{
					flex: '1 1 0%',
					padding: '$4',
					height: '100%',
					backgroundImage: 'radial-gradient(rgb(0 179 255 / 8%), transparent)',
				}}
			>
				<Container
					justify="center"
					align="center"
					direction="column"
					css={{ padding: '$16', height: '100%', gap: '$8' }}
				>
					<Image
						src="/logos/blue-logo.png"
						alt="Horus Finance Logo"
						width={100}
						height={100}
					/>
					<Container align="center" gap="4">
						<Heading>Bem-vindo!</Heading>
						<Tooltip content="Sair">
							<Button
								variant="secondary"
								css={{ minWidth: 'fit-content' }}
								onClick={handleLogout}
							>
								<SignOut />
							</Button>
						</Tooltip>
					</Container>
					<Container
						gap="4"
						direction="column"
						align="center"
						css={{ width: 380 }}
					>
						{hasAlert && (
							<Alert>
								<Text>
									Olá! Comece cadastrando seu escritório de contabilidade
								</Text>
								<AlertButton onClick={() => setHasAlert(false)}>
									<X />
								</AlertButton>
							</Alert>
						)}
						<Container direction="column" gap="2" css={{ width: 380 }}>
							<Text>Escritórios de contabilidade</Text>
							{!!offices.length && (
								<Container css={{ margin: '$4 0' }} direction="column" gap="3">
									{offices.map((office) => (
										<OfficeCard office={office} key={office.id} />
									))}
								</Container>
							)}
							<Dialog open={isDialogOpen}>
								<DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
									<Button css={{ width: '100%' }}>
										Cadastrar escritório
										<Plus />
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle variant="sm">
										Cadastrar escritório de contabilidade
									</DialogTitle>
									<Form onSubmit={handleSubmit(handleRegisterOffice)}>
										<Container
											direction="column"
											css={{ minWidth: 380 }}
											gap="1"
										>
											<Label htmlFor="cnpj">CNPJ</Label>
											<Input
												id="cnpj"
												type="tel"
												autoComplete=""
												data-state-error={!!errors.cnpj}
												{...register('cnpj')}
												placeholder="__.___.___/____-__"
												onClick={() => clearErrors('cnpj')}
												onChange={(event) => {
													const { value } = event.target;
													event.target.value = Mask.cnpj(value);
												}}
											/>
											<Error variant="xs">
												{errors.cnpj?.message as string}
											</Error>
										</Container>
										<Container
											direction="column"
											css={{ minWidth: 380 }}
											gap="1"
										>
											<Label htmlFor="registered_name">Razão social</Label>
											<Input
												id="registered_name"
												type="text"
												{...register('registered_name')}
												data-state-error={!!errors.registered_name}
												onClick={() => clearErrors('registered_name')}
												autoComplete=""
											/>
											<Error variant="xs">
												{errors.registered_name?.message as string}
											</Error>
										</Container>
										<Button>Cadastrar escritório</Button>
									</Form>
								</DialogContent>
							</Dialog>
						</Container>
					</Container>
				</Container>
			</Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const token = getCookie('@horus-finance/admin-token', { req, res });

	if (!token) {
		return {
			redirect: {
				destination: '/admin/login',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
