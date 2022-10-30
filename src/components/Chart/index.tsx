import { colors, fonts } from '@horus-finance/tokens';
import { ComponentProps } from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { styled } from '../../../stitches.config';

const data = [
	{
		name: 'Jan',
		entradas: 4000,
		saidas: 2400,
		amt: 2400,
	},
	{
		name: 'Feb',
		entradas: 3000,
		saidas: 1398,
		amt: 2210,
	},
	{
		name: 'Mar',
		entradas: 2000,
		saidas: 9800,
		amt: 2290,
	},
	{
		name: 'Abr',
		entradas: 2780,
		saidas: 3908,
		amt: 2000,
	},
	{
		name: 'May',
		entradas: 1890,
		saidas: 4800,
		amt: 2181,
	},
	{
		name: 'Jun',
		entradas: 2390,
		saidas: 3800,
		amt: 2500,
	},
];

export interface ChartProps {}

const StyledContainer = styled(ResponsiveContainer, {
	width: '100%',
	height: '100%',
});

export const Chart = ({ ...props }: ChartProps) => {
	return (
		<StyledContainer {...props}>
			<AreaChart
				width={730}
				height={250}
				data={data}
				margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
			>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={colors.blue300} stopOpacity={0.8} />
						<stop offset="95%" stopColor={colors.blue300} stopOpacity={0} />
					</linearGradient>
					<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={colors.red500} stopOpacity={0.8} />
						<stop offset="95%" stopColor={colors.red500} stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis dataKey="name" fontFamily={fonts.default} />
				<YAxis fontFamily={fonts.default} />
				<Tooltip />
				<Area
					type="monotone"
					dataKey="entradas"
					stroke={colors.blue300}
					fillOpacity={1}
					fill="url(#colorUv)"
				/>
				<Area
					type="monotone"
					dataKey="saidas"
					stroke={colors.red500}
					fillOpacity={1}
					fill="url(#colorPv)"
				/>
			</AreaChart>
		</StyledContainer>
	);
};
