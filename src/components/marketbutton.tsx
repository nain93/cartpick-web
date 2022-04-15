import styled from 'styled-components'
import theme from 'styles/theme';

interface MarketButtonProps {
	marketImage: string;
	marketColor: string;
	isClick: boolean;
	name?: string
}

function Marketbutton({ marketColor, marketImage, isClick, name }: MarketButtonProps) {
	return (
		<Container isClick={isClick} marketColor={marketColor}>
			{name ?
				<span>{name}</span>
				:
				<img src={marketImage} alt="marketImage" style={{ objectFit: "contain" }} width={68} height={38} />
			}
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
