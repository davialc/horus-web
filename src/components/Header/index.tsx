import {
	Avatar,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectItemText,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	SelectViewport,
} from '@horus-finance/react';
import { Container } from '../../../stitches.config';

export const Header = () => {
	return (
		<Container
			as="header"
			justify="between"
			align="center"
			css={{
				padding: '$4 50px $4 $4',
				boxShadow: '0px 1px 1px rgba(175, 175, 175, 0.2)',
				position: 'fixed',
				width: '100%',
				background: '$white',
				height: 80,
				zIndex: 3,
			}}
		>
			<Select>
				<SelectTrigger prefix="Cliente: ">
					<SelectValue placeholder="Selecione um cliente..." />
				</SelectTrigger>
				<SelectContent>
					<SelectViewport>
						<SelectGroup>
							<SelectLabel>Clientes</SelectLabel>
							<SelectItem value="Pedro">
								<SelectItemText>Pedro</SelectItemText>
							</SelectItem>
							<SelectItem value="Lucas">
								<SelectItemText>Lucas</SelectItemText>
							</SelectItem>
						</SelectGroup>
					</SelectViewport>
				</SelectContent>
			</Select>
			<Avatar src="https://github.com/davialc.png" />
		</Container>
	);
};
