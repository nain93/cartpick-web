import styled from 'styled-components'
import leftarrowIcon from "assets/icon/leftarrowIcon.png"
import closeIcon from "assets/icon/closeIcon.png"
import searchIcon from "assets/icon/searchIcon.png"
import theme from 'styles/theme';
import { useNavigate } from 'react-router-dom';

interface TopHeaderProps {
	children: JSX.Element | string;
	backButton?: () => void;
	closeButton?: () => void;
	searchButton?: boolean
}

function TopHeader({ children, backButton, closeButton, searchButton }: TopHeaderProps) {
	const navigate = useNavigate()
	return (
		<Container>
			{backButton ?
				<button onClick={backButton}>
					<img src={leftarrowIcon} width={18} height={18} alt="leftarrowIcon" />
				</button>
				:
				<div />
			}
			<h1 style={{
				marginRight: (backButton && !closeButton && !searchButton) ? 18 : 0,
				marginLeft: (!backButton && closeButton && !searchButton) ? 16 : 0,
			}}>{children}</h1>
			{closeButton ?
				<button onClick={closeButton}>
					<img src={closeIcon} width={16} height={16} alt="closeIcon" />
				</button>
				:
				searchButton ?
					<button onClick={() => navigate("/search")}>
						<img src={searchIcon} width={19} height={19} alt="searchIcon" />
					</button>
					:
					<div />
			}
		</Container>
	)
}

const Container = styled.header`
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