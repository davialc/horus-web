import { Container } from '../../../stitches.config';
import { Tooltip } from '../Tooltip';

interface StatusProps {
	isPending: boolean;
}

export const ClientStatus = ({ isPending }: StatusProps) => {
	const content = isPending ? 'Status: Não autorizado' : 'Status: Autorizado';
	return (
		<Tooltip content={content}>
			<Container
				css={{
					width: '$3',
					height: '$3',
					borderRadius: '$full',
					backgroundColor: isPending ? '$red500' : '$green500',
					cursor: 'pointer',
				}}
			/>
		</Tooltip>
	);
};
