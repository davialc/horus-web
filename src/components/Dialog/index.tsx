import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { css, styled } from '../../../stitches.config';
import { CSS } from '@stitches/react';
import { Heading, Text } from '@horus-finance/react';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

export const overlayStyles = css({
	backgroundColor: 'rgba(0, 0, 0, 0.25)',
});

export const panelStyles = css({
	backgroundColor: '$gray100',
});

const StyledOverlay = styled(DialogPrimitive.Overlay, overlayStyles, {
	position: 'fixed',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
});

export const StyledContent = styled(DialogPrimitive.Content, panelStyles, {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: 200,
	maxHeight: '85vh',
	padding: '$4',
	marginTop: '-5vh',
	borderRadius: '$lg',
	display: 'flex',
	flexDirection: 'column',
	gap: '$4',

	'&:focus': {
		outline: 'none',
	},
});

type DialogContentPrimitiveProps = React.ComponentProps<
	typeof DialogPrimitive.Content
>;
type DialogContentProps = DialogContentPrimitiveProps & { css?: CSS };

// eslint-disable-next-line react/display-name
const DialogContent = React.forwardRef<
	React.ElementRef<typeof StyledContent>,
	DialogContentProps
>(({ children, ...props }, forwardedRef) => (
	<DialogPrimitive.Portal>
		<StyledOverlay />
		<StyledContent {...props} ref={forwardedRef}>
			{children}
		</StyledContent>
	</DialogPrimitive.Portal>
));

const DialogTitle = styled(Heading, DialogPrimitive.Title);
const DialogDescription = DialogPrimitive.Description;

export { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription };
