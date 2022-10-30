import { Box, Text } from '@horus-finance/react';
import React from 'react';
import { styled } from '../../../stitches.config';
import { ClassNames } from '../../@types/global';

const StyledTable = styled('table', {
	width: '100%',
	fontFamily: '$default',
	borderSpacing: 0,
});

const Tbody = styled('tbody', {});

const Td = styled('td', {
	padding: '$3',
});

const Th = styled('th', {
	padding: '$3',
	position: 'relative',
	'&:after': {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(50%)',
		height: 12,
	},
});

const Thead = styled('thead', {
	backgroundColor: '$gray300',
});

const Tr = styled('tr', {
	'&:nth-child(even)': {
		backgroundColor: '$gray200',
	},
});

interface TableProps<Field extends string> {
	isInteractive?: boolean;
	cols: Array<Col<Field>>;
	rows: Array<Row<Field>>;
	classNames?: {
		col?: ClassNames<'lineClamp'>;
		row?: ClassNames<'lineClamp'>;
	};
}

interface Col<Field extends string> {
	field: Field;
	title: string;
	size: 'min-content' | { value: number; mode: 'grow' | 'fixed' };
	type?: 'number' | 'text';
	props?: React.ComponentPropsWithoutRef<'td'>;
}

export type Row<Field extends string> = Record<Field, React.ReactNode> & {
	id: React.Key;
	props?: React.ComponentPropsWithoutRef<'tr'>;
};

function Table<Field extends string>({
	cols,
	rows,
}: TableProps<Field>): JSX.Element {
	const getColumnStyle = ({ size }: Col<Field>) =>
		size === 'min-content'
			? { width: 0 }
			: {
					width: size.mode === 'fixed' ? size.value : undefined,
					minWidth: size.value,
					maxWidth: size.value,
			  };

	return (
		<Box
			css={{
				backgroundColor: '$white',
				padding: 0,
			}}
		>
			<StyledTable>
				<Thead>
					<Tr>
						{cols.map((col) => (
							<Th
								key={col.field}
								title={col.title}
								style={getColumnStyle(col)}
								{...col.props}
							>
								<Text variant="sm" css={{ textAlign: 'left' }}>
									{col.title}
								</Text>
							</Th>
						))}
					</Tr>
				</Thead>

				<Tbody>
					{rows.map((row) => (
						<Tr key={row.id} {...row.props}>
							{cols.map((col) => {
								const value = row[col.field];

								return (
									<Td
										key={col.field}
										title={typeof value === 'string' ? value : undefined}
										style={getColumnStyle(col)}
									>
										<div>{value == null ? '-' : value}</div>
									</Td>
								);
							})}
						</Tr>
					))}
				</Tbody>
			</StyledTable>
		</Box>
	);
}

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;

export default Table;
