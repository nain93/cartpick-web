import styled from 'styled-components'
import leftarrowIcon from "assets/icon/leftarrowIcon.png"
import closeIcon from "assets/icon/closeIcon.png"
import searchIcon from "assets/icon/searchIcon.png"
import theme from 'styles/theme';
import { useNavigate } from 'react-router-dom';
import { modalState, tokenState } from 'recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface TopHeaderProps {
	children: JSX.Element | string;
	backButton?: () => void;
	closeButton?: () => void;
	searchButton?: boolean
}

function TopHeader({ children, backButton, closeButton, searchButton }: TopHeaderProps) {
	const navigate = useNavigate()
	const setModal = useSetRecoilState(modalState)
	const token = useRecoilValue(tokenState)
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
					<button onClick={() => {
						if (token) {
							navigate("/search", { state: { isSearch: true } })
						}
						else {
							setModal({
								okText: "로그인 하기",
								okButton: () => navigate("/login"),
								content: "로그인이 필요한 서비스입니다.\n로그인 하시겠어요?",
								isOpen: true
							})
						}
					}}>
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
	z-index: 9;
`

export default TopHeader