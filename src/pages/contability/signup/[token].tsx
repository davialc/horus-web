import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text } from '@horus-finance/react';
import jwt from 'jsonwebtoken';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import { Container, styled } from '../../../../stitches.config';
import { useContabilityAuth } from '../../../providers/contability/auth';
import Mask from '../../../utils/mask';
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

const contabilitySchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password'), null], 'As senhas não conferem'),
});

export default function ContabilitySignUp({ cnpj, registered_name }: any) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm({
		resolver: yupResolver(contabilitySchema),
	});

	const { handleCreateContability } = useContabilityAuth();

	async function handleConfirmContability(formData: FieldValues) {
		const { email, password, cnpj, counter_name, crc, registered_name } =
			formData;
		console.log(formData);
		handleCreateContability({
			email,
			password,
			cnpj,
			counter_name,
			crc,
			registered_name,
		});
	}

	return (
		<Container
			as="main"
			direction="column"
			css={{
				padding: '$4',
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
				<Form onSubmit={handleSubmit(handleConfirmContability)}>
					<Container direction="column" css={{ minWidth: 380 }} gap="1">
						<Label htmlFor="cnpj">CNPJ</Label>
						<Input
							id="cnpj"
							type="tel"
							autoComplete=""
							defaultValue={cnpj}
							data-state-error={!!errors.cnpj}
							{...register('cnpj')}
							placeholder="__.___.___/____-__"
							onClick={() => clearErrors('cnpj')}
							onChange={(event) => {
								const { value } = event.target;
								event.target.value = Mask.cnpj(value);
							}}
						/>
						<Error variant="xs">{errors.cnpj?.message as string}</Error>
					</Container>
					<Container direction="column" css={{ minWidth: 380 }} gap="1">
						<Label htmlFor="registered_name">Razão social</Label>
						<Input
							id="registered_name"
							defaultValue={registered_name}
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
					<Container direction="column" css={{ minWidth: 380 }} gap="1">
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
					<Container direction="column" css={{ minWidth: 380 }} gap="1">
						<Label htmlFor="crc">CRC</Label>
						<Input
							id="crc"
							type="text"
							{...register('crc')}
							data-state-error={!!errors.crc}
							onClick={() => clearErrors('crc')}
							autoComplete=""
						/>
						<Error variant="xs">{errors.crc?.message as string}</Error>
					</Container>
					<Container direction="column" css={{ minWidth: 380 }} gap="1">
						<Label htmlFor="counter_name">Nome do contador</Label>
						<Input
							id="counter_name"
							type="text"
							{...register('counter_name')}
							data-state-error={!!errors.counter_name}
							onClick={() => clearErrors('counter_name')}
							autoComplete=""
						/>
						<Error variant="xs">{errors.counter_name?.message as string}</Error>
					</Container>
					<Container direction="column" css={{ minWidth: 380 }} gap="1">
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
					<Container direction="column" css={{ minWidth: 380 }} gap="1">
						<Label htmlFor="passwordConfirmation">Confirmação da senha</Label>
						<Input
							id="passwordConfirmation"
							type="password"
							{...register('passwordConfirmation')}
							data-state-error={!!errors.passwordConfirmation}
							onClick={() => clearErrors('passwordConfirmation')}
							autoComplete=""
						/>
						<Error variant="xs">
							{errors.passwordConfirmation?.message as string}
						</Error>
					</Container>
					<Button>Obter acesso</Button>
				</Form>
			</Container>
			{/* <Footer
				align="center"
				justify="center"
				gap="4"
				css={{ paddingBottom: '$4' }}
			>
				<Text>Já tem uma conta?</Text>
				<Button
					variant="secondary"
					size="sm"
					onClick={() => Router.push('/login/admin')}
				>
					Fazer login
					<ArrowRight />
				</Button>
			</Footer> */}
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { token } = query;
	const { cnpj, registered_name }: any = jwt.verify(
		token as string,
		process.env.NEXT_PUBLIC_TOKEN_SECRET as string
	);
	return {
		props: {
			cnpj,
			registered_name,
		},
	};
};
