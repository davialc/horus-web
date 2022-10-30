import { Text } from '@horus-finance/react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';
import { styled } from '../../../stitches.config';

type TooltipPrimitiveProps = React.ComponentProps<typeof TooltipPrimitive.Root>;
type TooltipProps = TooltipPrimitiveProps &
	React.ComponentProps<typeof TooltipPrimitive.Content> & {
		children: React.ReactElement;
		content: React.ReactNode;
		multiline?: boolean;
	};

const StyledContent = styled(TooltipPrimitive.Content, {
	backgroundColor: '$gray100',
	borderRadius: '$md',
	border: '1px solid $gray400',
	padding: '$1 $2',

	variants: {
		multiline: {
			true: {
				maxWidth: 250,
				pb: 7,
			},
		},
	},
});

export function Tooltip({
	children,
	content,
	open,
	defaultOpen,
	onOpenChange,
	delayDuration,
	disableHoverableContent,
	multiline,
	...props
}: TooltipProps) {
	const rootProps = {
		open,
		defaultOpen,
		onOpenChange,
		delayDuration,
		disableHoverableContent,
	};
	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root {...rootProps}>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<StyledContent
						side="top"
						align="center"
						sideOffset={5}
						{...props}
						multiline={multiline}
					>
						<Text>{content}</Text>
					</StyledContent>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}
