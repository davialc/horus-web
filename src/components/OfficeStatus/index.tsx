import { Container } from '../../../stitches.config';
import { Tooltip } from '../Tooltip';

interface StatusProps {
	isPending: boolean;
}

export const OfficeStatus = ({ isPending }: StatusProps) => {
	const content = isPending
		? 'Status: Escritório pré-cadastrado'
		: 'Status: Escritório cadastrado';
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
