import styled from 'styled-components'
import theme from 'styles/theme';

interface MarketButtonProps {
	marketImage: string;
	marketColor: string;
	isClick: boolean;
}

function Marketbutton({ marketColor, marketImage, isClick }: MarketButtonProps) {
	return (
		<Container isClick={isClick} marketColor={marketColor}>
			<img src={marketImage} alt="kurlyImage" width={68} height={38} />
		</Container>
	)
}

const Container = styled.button<{ marketColor: string, isClick: boolean }>`
	width: 100px;
	height: 45px;
	border: solid 1px ${props => props.isClick ? props.marketColor : theme.color.grayscale.F2F3F6};
	border-radius: 22.5px;
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
`

export default Marketbutton
