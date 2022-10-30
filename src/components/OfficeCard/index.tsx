import { Avatar, Button, Text } from '@horus-finance/react';
import { CircleNotch, LinkSimple, Trash } from 'phosphor-react';
import React from 'react';
import { Container, styled, keyframes } from '../../../stitches.config';
import { IOffice } from '../../@types/office';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../Dialog';
import { OfficeStatus } from '../OfficeStatus';
import { Tooltip } from '../Tooltip';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

interface OfficeProps {
	office: any;
}

const Spin = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' },
});

export const Loader = styled(CircleNotch, {
	animationName: `${Spin}`,
	animationDuration: '2000ms',
	animationIterationCount: 'infinite',
	animationTimingFunction: 'linear',
});

export const OfficeCard = ({ office }: OfficeProps) => {
	const [generatingLinkLoading, setGeneratingLinkLoading] =
		React.useState(false);

	function handleGenerateLink() {
		try {
			setGeneratingLinkLoading(true);
			const token = jwt.sign(
				office,
				process.env.NEXT_PUBLIC_TOKEN_SECRET as string
			);
			const href = window.location.href;
			const pathname = window.location.pathname;
			const url = href.split(pathname).join('');
			const destination = `${url}/contability/signup/${token}`;
			console.log(destination);
			navigator.clipboard.writeText(destination);
			setGeneratingLinkLoading(false);
		} catch (error) {
			setGeneratingLinkLoading(false);
			console.log(error);
		}
	}

	return (
		<Container align="center" justify="between" css={{ flex: 1 }}>
			<Container>
				<Avatar />
			</Container>
			<Text>{office.registered_name}</Text>
			<Container gap="2" align="center">
				<OfficeStatus isPending={!office.username} />
				{!office.username && (
					<Tooltip content="Gerar link de cadastro para o escritório">
						<Button
							variant="secondary"
							css={{ minWidth: 'fit-content' }}
							onClick={handleGenerateLink}
							disabled={generatingLinkLoading}
						>
							{generatingLinkLoading ? <Loader /> : <LinkSimple />}
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
						<DialogTitle variant="sm">Excluir escritório X?</DialogTitle>
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
