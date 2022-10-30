import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@horus-finance/react';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Router from 'next/router';
import { ArrowRight } from 'phosphor-react';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import { Container, styled } from '../../../../stitches.config';
import { useContabilityAuth } from '../../../providers/contability/auth';
yup.setLocale(pt);

const Form = styled('form', {
	width: 380,
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

const loginSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

export default function ContabilityLogin() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	const { handleAuthenticate } = useContabilityAuth();

	function handleLogin(formData: FieldValues) {
		const { email, password } = formData;
		handleAuthenticate({
			email,
			password,
		});
	}

	return (
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
				<Form onSubmit={handleSubmit(handleLogin)}>
					<Container direction="column" gap="1">
						<Label htmlFor="email">Endereço de e-mail</Label>
						<Input
							id="email"
							type="email"
							{...register('email')}
							data-state-error={!!errors.email}
							onClick={() => clearErrors('email')}
							autoComplete=""
						/>
						<Error variant="xs">{errors.email?.message as string}</Error>
					</Container>
					<Container direction="column" gap="1">
						<Label htmlFor="password">Senha</Label>
						<Input
							id="password"
							type="password"
							{...register('password')}
							data-state-error={!!errors.password}
							onClick={() => clearErrors('password')}
							autoComplete=""
						/>
						<Error variant="xs">{errors.password?.message as string}</Error>
					</Container>
					<Button>Entrar no dashboard</Button>
				</Form>
			</Container>
			<Footer align="center" justify="center" gap="4">
				<Text>Não tem uma conta?</Text>
				<Button
					variant="secondary"
					size="sm"
					onClick={() => Router.push('/contability/signup')}
				>
					Obter acesso
					<ArrowRight />
				</Button>
			</Footer>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const token = getCookie('@horus-finance/contability-token', { req, res });

	if (token) {
		return {
			redirect: {
				destination: '/contability/home',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
