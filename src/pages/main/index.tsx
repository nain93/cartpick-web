import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";

import theme from "styles/theme"
import { dateFormatForSendBack, dateSimpleFormat } from "utils"
import defaultImg from "assets/image/defaultImage.png"

import { getUserProfile } from "api/user";
import { useCookies } from "react-cookie";
import { getMarketList } from "api/market";
import { useQuery } from "react-query"
import { UserDataType } from "types/user";
import { modalState } from "recoil/atoms";
import { useSetRecoilState } from "recoil";
import MarketListLayout from "components/marketListLayout";
import { useEffect } from "react";

const date = dateFormatForSendBack()

function Main() {
	const [cookies, setCookie, removeCookie] = useCookies(['token']);
	const navigate = useNavigate()
	const setModal = useSetRecoilState(modalState)
	// const [token, setToken] = useRecoilState(tokenState)
	const userQuery = useQuery<UserDataType | null, Error>("userData", () => cookies.token ? getUserProfile(cookies.token) : null)
	const { data } = useQuery<Array<{ id: number, name: string }>, Error>("marketList", () => getMarketList())


	const handleGotoPastItem = () => {
		if (cookies.token) {
			navigate("/pastItemList")
		}
		else {
			setModal({
				okText: "로그인 하기",
				okButton: () => navigate("/login"),
				content: "로그인이 필요한 서비스입니다.\n로그인 하시겠어요?",
				isOpen: true
			})
		}
	}

	// * 로그인상태에서 토큰 만료되거나 없을시 토큰 삭제시키고 로그인 페이지로 이동
	useEffect(() => {
		if (cookies.token && userQuery.data === undefined && !userQuery.isLoading) {
			removeCookie("token")
			navigate("/login")
		}
	}, [userQuery.data])

	// todo refresh token 대체 로직 (대체해서 받아온 토큰 setToken에 저장)

	// * 전역 로그인 설정
	// useEffect(() => {
	// 	if (cookies.token) {
	// 		setToken(cookies.token)
	// 	}
	// }, [])

	return (
		<>
			<Container>
				<Header>
					<TitleWrap>
						<div style={{ fontSize: 24, fontWeight: "bold", lineHeight: 1.25 }}>오늘의 추천템</div>
						{cookies.token ?
							<Link to="/mypage">
								<img style={{ borderRadius: 20 }}
									src={userQuery.data?.profileImage ? userQuery.data.profileImage : defaultImg}
									width={30} height={30} alt="defaultImg" />
							</Link>
							:
							<Link to="/login" style={{ color: theme.color.main }}>로그인</Link>
						}
					</TitleWrap>
					<span>
						<span style={{ fontWeight: "bold" }}>{dateSimpleFormat()}</span>
						에 나온 추천템이에요
					</span>
					<LastItemButton onClick={handleGotoPastItem}
					>
						{`지난 추천템 보기 >`}
					</LastItemButton>
				</Header>
				{data &&
					<MarketListLayout date={date} marketData={data} />}
			</Container>

		</>
	)
}

const Container = styled.section`
	position: relative;
	height: 100vh;
`;

const Header = styled.section`
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

const TitleWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;

const LastItemButton = styled.div`
	line-height: 2;
	font-size: 12px;
	margin-top: 5px;
	max-width: 180px;
	color: ${theme.color.grayscale.B7C3D4};
	text-decoration :underline ;
	cursor: pointer;
`;

export default Main