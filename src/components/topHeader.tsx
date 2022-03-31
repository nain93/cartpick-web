import styled from 'styled-components'
import leftarrowIcon from "assets/icon/leftarrowIcon.png"
import closeIcon from "assets/icon/closeIcon.png"
import theme from 'styles/theme';

interface TopHeaderProps {
	children: JSX.Element | string;
	backButton?: () => void;
	closeButton?: () => void;
}

function TopHeader({ children, backButton, closeButton }: TopHeaderProps) {
	return (
		<Container>
			{backButton ?
				<button onClick={backButton}>
					<img src={leftarrowIcon} width={18} height={18} alt="leftarrowIcon" />
				</button>
				:
				<div />
			}
			<h1>{children}</h1>
			{closeButton ?
				<button onClick={closeButton}>
					<img src={closeIcon} width={16} height={16} alt="closeIcon" />
				</button>
				:
				<div />
			}
		</Container>
	)
}

const Container = styled.div`
	position: fixed;
	top:0;
	background-color: ${theme.color.grayscale.FFFFF};
	display: flex;
	width: 100%;
	max-width: 768px;
	margin:0 auto;
	justify-content: space-between;
	align-items: center;
	padding:15px 20px;
	height: 50px;
	border-bottom: 1px solid ${theme.color.grayscale.F2F3F6};
`

export default TopHeader