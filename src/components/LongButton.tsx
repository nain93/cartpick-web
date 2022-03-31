import styled, { CSSProperties } from 'styled-components'
import theme from 'styles/theme';

interface LoginButtonProps {
	children: string;
	color: string;
	buttonStyle?: CSSProperties;
	onClick: () => void;
}

function LongButton({ children, color, buttonStyle, onClick }: LoginButtonProps) {
	return (
		<Container onClick={onClick} buttonStyle={buttonStyle} color={color}>{children}</Container>
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