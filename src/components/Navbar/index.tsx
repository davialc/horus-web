import { Navigation, NavigationButton } from '@horus-finance/react';
import Router, { useRouter } from 'next/router';
import { ArrowsDownUp, ChartPieSlice } from 'phosphor-react';
import { Container } from '../../../stitches.config';

export const Navbar = () => {
	const { asPath, basePath, pathname } = useRouter();
	console.log(pathname);
	return (
		<Container css={{ marginRight: 300 }}>
			<Navigation css={{ height: '100%', position: 'fixed' }}>
				<NavigationButton
					data-state-active={asPath === '/contability/dashboard'}
					css={{
						cursor: 'pointer',
						'&[data-state-active="true"]': {
							backgroundColor: '$blue100',
							color: '$blue300',
						},
					}}
				>
					<ChartPieSlice />
					Dashboard
				</NavigationButton>
				<NavigationButton
					data-state-active={asPath === '/contability/dashboard/transactions'}
					onClick={() => Router.push('/contability/dashboard/transactions')}
					css={{
						cursor: 'pointer',
						'&[data-state-active="true"]': {
							backgroundColor: '$blue100',
							color: '$blue300',
						},
					}}
				>
					<ArrowsDownUp />
					Transações
				</NavigationButton>
			</Navigation>
		</Container>
	);
};
