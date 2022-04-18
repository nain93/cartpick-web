import styled, { CSSProperties } from 'styled-components'
import theme from 'styles/theme';

interface LoginButtonProps {
	children: string;
	color: string;
	buttonStyle?: CSSProperties;
	onClick: () => void;
	disabled?: boolean;
}

function LongButton({ children, color, buttonStyle, onClick, disabled }: LoginButtonProps) {
	return (
		<Container onClick={disabled ? () => null : onClick}
			buttonStyle={disabled ? { color: theme.color.grayscale.B7C3D4, backgroundColor: theme.color.grayscale.F2F3F6, border: "none" } : buttonStyle}
			color={color}>
			{children}
		</Container>
	)
}

const Container = styled.button<{ color: string, buttonStyle: CSSProperties | undefined }>`
	border: 1px solid ${props => props.color};
	display: flex;
	justify-content: center;
	align-items: center;
	width: calc(100% - 40px);
	margin :0 auto;
	height: 50px;
	border-radius: 10px;
	background-color: ${theme.color.grayscale.FFFFF};
	${props => ({ ...props.buttonStyle })}
`

export default LongButton