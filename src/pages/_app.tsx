import type { AppProps } from 'next/app';
import { globalStyles } from '../../stitches.config';
import ProgressBar from 'nextjs-progressbar';
import { colors } from '@horus-finance/tokens';
import { AdminAuthProvider } from '../providers/admin/auth';
import { AdminProvider } from '../providers/admin';
import { ContabilityAuthProvider } from '../providers/contability/auth';
import { ContabilityProvider } from '../providers/contability';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AdminAuthProvider>
			<AdminProvider>
				<ContabilityAuthProvider>
					<ContabilityProvider>
						<ProgressBar color={colors.blue300} />
						<Component {...pageProps} />
					</ContabilityProvider>
				</ContabilityAuthProvider>
			</AdminProvider>
		</AdminAuthProvider>
	);
}
