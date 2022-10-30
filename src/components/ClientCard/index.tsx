import { Avatar, Button, Text } from '@horus-finance/react';
import { useRouter } from 'next/router';
import { ArrowRight, Bell, LinkSimple, Trash } from 'phosphor-react';
import { Container } from '../../../stitches.config';
import { IClient } from '../../@types/client';
import { ClientStatus } from '../ClientStatus';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../Dialog';
import { Tooltip } from '../Tooltip';

interface ClientCardProps {
	client: any;
}

export const ClientCard = ({ client }: ClientCardProps) => {
	const router = useRouter();
	return (
		<Container align="center" justify="between" css={{ flex: 1 }}>
			<Container>
				<Avatar />
			</Container>
			<Text>{client.registered_name}</Text>
			<Container gap="2" align="center">
				<ClientStatus isPending={!client.username} />

				{!client.username ? (
					<Tooltip content="Solicitar autorização">
						<Button variant="secondary" css={{ minWidth: 'fit-content' }}>
							<Bell />
						</Button>
					</Tooltip>
				) : (
					<Tooltip content="Acessar dashboard">
						<Button
							variant="secondary"
							css={{ minWidth: 'fit-content' }}
							onClick={() =>
								router.push(`/contability/dashboard/${client.cnpj}`)
							}
						>
							<ArrowRight />
						</Button>
					</Tooltip>
				)}
				<Dialog>
					<Tooltip content="Excluir escritório">
						<DialogTrigger asChild>
							<Button
								variant="secondary"
								css={{
									minWidth: 'fit-content',
									color: '$red500',
									borderColor: '$red500',
									'&:not(:disabled):hover': {
										backgroundColor: '$red500',
									},
								}}
							>
								<Trash />
							</Button>
						</DialogTrigger>
					</Tooltip>
					<DialogContent css={{ width: 'fit-content' }}>
						<DialogTitle variant="sm">Excluir cliente?</DialogTitle>
						<Container gap="4">
							<Button variant="secondary">Cancelar</Button>
							<Button
								css={{
									minWidth: 'fit-content',
									backgroundColor: '$red500',
									color: '$white',
									borderColor: '$red500',
									'&:not(:disabled):hover': {
										filter: 'brightness(1.1)',
										backgroundColor: '$red500',
									},
								}}
							>
								Excluir
							</Button>
						</Container>
					</DialogContent>
				</Dialog>
			</Container>
		</Container>
	);
};
