import styled, { css, keyframes } from "styled-components"
import { Link, useNavigate } from "react-router-dom";

import theme from "styles/theme"
import { dateFormatForSendBack, dateSimpleFormat } from "utils"
import defaultImg from "assets/image/defaultImage.png"
import bannerImg from "assets/image/banner.png"
import searchIcon from "assets/icon/searchIcon.png"

import { getUserProfile, userLogout } from "api/user";
import { getMarketList } from "api/market";
import { useMutation, useQuery } from "react-query"
import { UserDataType } from "types/user";
import { modalState, tokenState } from "recoil/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import MarketListLayout from "components/marketListLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const date = dateFormatForSendBack()

function Main() {
	const navigate = useNavigate()
	const [token, setToken] = useRecoilState(tokenState)
	const userLogoutMutaion = useMutation(userLogout)
	const [isScroll, setIsScroll] = useState(false)
	const setModal = useSetRecoilState(modalState)
	const userQuery = useQuery<UserDataType, Error>(["userData", token], () => getUserProfile(token),
		{
			enabled: !!token,
			onError: (error) => {
				// * 로그인상태에서 토큰 만료되거나 없을시 토큰 삭제시키고 로그인 페이지로 이동
				if (axios.isAxiosError(error) && error.response) {
					console.log(error.response.data);
					if (error.response.data.detail === "Authentication credentials were not provided."
						|| error.response.data.messages[0].message === "Token is invalid or expired" ||
						error.response.data.code === "token_not_valid"
					) {
						setToken("")
						userLogoutMutaion.mutate()
						navigate("/login")
					}
				}
			}
		})

	const { data } = useQuery<Array<{ id: number, name: string }>, Error>("marketList", getMarketList)

	// * 스크롤 애니메이션 컨트롤
	const handleScroll = () => {
		if (window.scrollY >= 50) {
			setIsScroll(true)
		} else {
			setIsScroll(false)
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll); //clean up
		};
	}, [])

	return (
		<>
			<Container>
				<Header>
					<TitleWrap>
						<div style={{ fontSize: 24, fontWeight: "bold", lineHeight: 1.25 }}>지난 추천템</div>
						<div style={{ display: "flex" }}>
							<button style={{ marginRight: 30 }} onClick={() => {
								if (token) {
									navigate("/search")
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
								<img src={searchIcon} width={20} height={20} alt="searchIcon" />
							</button>
							{token ?
								<Link to="/mypage">
									<img style={{ borderRadius: 20 }}
										src={userQuery.data?.profileImage ? userQuery.data.profileImage : defaultImg}
										width={30} height={30} alt="defaultImg" />
								</Link>
								:
								<Link to="/login" style={{ color: theme.color.main }}>로그인</Link>
							}
						</div>
					</TitleWrap>
					<Banner isScroll={isScroll} href={"https://open.kakao.com/o/g59Bsmce"}>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<span style={{
								fontSize: 16,
								color: theme.color.grayscale.FFFFF,
								lineHeight: 1.25
							}}>나만 알기 아까운 <span style={{ fontWeight: "bold" }}>
									추천템</span><br />서로 오픈 카톡에서 공유해요!</span>
							<span
								style={{
									cursor: "pointer",
									fontSize: 12,
									color: theme.color.grayscale.FFFFF,
									marginTop: 10, lineHeight: 2, textDecoration: "underline"
								}}>
								{"추천템 공유방 입장하기 >"}</span>
						</div>
						<img style={{ position: "absolute", bottom: 0, right: 15, maxWidth: 110 }}
							src={bannerImg} alt="bannerImg" width={"30%"} height={86} />
					</Banner>
					<TextBox isScroll={isScroll}>
						<span>
							<span style={{ fontWeight: "bold" }}>{dateSimpleFormat()}</span>
							에 나온 추천템이에요
						</span>
						<LastItemButton onClick={() => navigate("/pastItemList")}
						>
							{`추천템 더 보러가기 >`}
						</LastItemButton>
					</TextBox>
				</Header>
				{data &&
					<MarketListLayout isScroll={isScroll} date={date} marketData={data} />}
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
	position: fixed;
	max-width: 768px;
	top:0px;
	background-color: ${theme.color.grayscale.FFFFF};
	width: 100%;
	height: 30%;
	padding-bottom: 40px;
	z-index: 2;
`;

const TitleWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const boxFade = keyframes`
  from {
    opacity: 1;
	visibility: visible
  }
  to {
    opacity: 0;
	visibility: hidden
  }
`
const Banner = styled.a<{ isScroll: boolean }>`
	position: relative;
	padding: 15px;
	background-color: ${theme.color.main};
	border-radius: 10px;
	width: 100%;
	height: 100px;
	margin:40px 0 50px 0;
	animation:${props => props.isScroll && css`${boxFade} 0.3s ease-in-out forwards`} ;
`

const TextBox = styled.div<{ isScroll: boolean }>`
	transform:${props => props.isScroll && "translateY(-180px)"} ;
	transition:all 0.3s ease-in-out ;
`

const LastItemButton = styled.div`
	line-height: 2;
	margin-top: 5px;
	max-width: 180px;
	font-weight: bold;
	color: ${theme.color.main};
	text-decoration :underline ;
	cursor: pointer;
`;

export default Main