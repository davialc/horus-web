import { createStitches, defaultThemeMap } from '@stitches/react';
import {
	colors,
	fontSizes,
	fontWeights,
	fonts,
	lineHeights,
	radii,
	space,
} from '@horus-finance/tokens';

export const {
	styled,
	css,
	globalCss,
	keyframes,
	getCssText,
	theme,
	createTheme,
	config,
} = createStitches({
	themeMap: {
		...defaultThemeMap,
		height: 'space',
		width: 'space',
	},
	theme: {
		colors,
		fontWeights,
		fontSizes,
		radii,
		fonts,
		lineHeights,
		space,
	},
});

export const globalStyles = globalCss({
	'*': {
		padding: 0,
		margin: 0,
	},
	a: {
		textDecoration: 'none',
		color: 'inherit',
	},
	'html, body, body > div:first-child, div#__next, div#__next > div': {
		height: '100%',
		width: '100%',
	},
});

export const Container = styled('div', {
	boxSizing: 'border-box',
	display: 'flex',

	variants: {
		direction: {
			row: {
				flexDirection: 'row',
			},
			column: {
				flexDirection: 'column',
			},
			rowReverse: {
				flexDirection: 'row-reverse',
			},
			columnReverse: {
				flexDirection: 'column-reverse',
			},
		},
		align: {
			start: {
				alignItems: 'flex-start',
			},
			center: {
				alignItems: 'center',
			},
			end: {
				alignItems: 'flex-end',
			},
			stretch: {
				alignItems: 'stretch',
			},
			baseline: {
				alignItems: 'baseline',
			},
		},
		justify: {
			start: {
				justifyContent: 'flex-start',
			},
			center: {
				justifyContent: 'center',
			},
			end: {
				justifyContent: 'flex-end',
			},
			between: {
				justifyContent: 'space-between',
			},
		},
		wrap: {
			noWrap: {
				flexWrap: 'nowrap',
			},
			wrap: {
				flexWrap: 'wrap',
			},
			wrapReverse: {
				flexWrap: 'wrap-reverse',
			},
		},
		gap: {
			1: {
				gap: '$1',
			},
			2: {
				gap: '$2',
			},
			3: {
				gap: '$3',
			},
			4: {
				gap: '$4',
			},
			5: {
				gap: '$5',
			},
			6: {
				gap: '$6',
			},
			7: {
				gap: '$7',
			},
			8: {
				gap: '$8',
			},
			9: {
				gap: '$9',
			},
		},
	},
});
