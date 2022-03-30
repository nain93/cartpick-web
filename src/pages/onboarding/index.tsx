import TopHeader from 'components/topHeader'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'
import Marketbutton from 'components/marketbutton'

import backpackIcon from "assets/icon/backpackIcon.png"
import ringIcon from "assets/icon/ringIcon.png"
import laptopIcon from "assets/icon/laptopIcon.png"
import peopleIcon from "assets/icon/peopleIcon.png"
import personIcon from "assets/icon/personIcon.png"
import familyIcon from "assets/icon/familyIcon.png"
import smilingIcon from "assets/icon/smilingIcon.png"
import kurlyImage from "assets/image/kurlyImage.png"
import cookatImage from "assets/image/cookatImage.png"
import emartImage from "assets/image/emartImage.png"
import oasisImage from "assets/image/oasisImage.png"
import roketImage from "assets/image/roketImage.png"
import naverImage from "assets/image/naverImage.png"
import wingItImage from "assets/image/wingItImage.png"
import etcImage from "assets/image/etcImage.png"
import { useState } from 'react'
import LongButton from 'components/longButton'
import LoginLoading from './loginLoading'


function Onboarding() {
	const navigate = useNavigate()
	const [loginLoading, setLoginLoading] = useState(false)
	const [market, setMarket] = useState<Array<{ image: string, name: string, isClick: boolean }>>(
		[
			{
				image: kurlyImage,
				name: "마켓컬리",
				isClick: false
			},
			{
				image: roketImage,
				name: "쿠팡 로켓프레시",
				isClick: false
			},
			{
				image: emartImage,
				name: "SSG 이마트",
				isClick: false
			},
			{
				image: oasisImage,
				name: "오아시스마켓",
				isClick: false
			},
			{
				image: naverImage,
				name: "네이버 쇼핑",
				isClick: false
			},
			{
				image: cookatImage,
				name: "쿠캣마켓",
				isClick: false
			},
			{
				image: wingItImage,
				name: "윙잇",
				isClick: false
			},
			{
				image: etcImage,
				name: "기타",
				isClick: false
			}
		]
	)

	const handleSignIn = () => {
		// todo api 호출하고, 토큰 넣고 로그인
		setLoginLoading(true)

		setTimeout(() => {
			// setLoginLoading(false)
			navigate("/")
		}, 3000)
	}

	if (loginLoading) {
		return <LoginLoading />
	}


	return (
		<Container>
			<TopHeader children={"추가 정보 기입"} closeButton={() => navigate("/")} />
			<MainWrap>
				<h1 style={{ display: "inline-block", marginBottom: 20 }}>현재 카톡방의 닉네임처럼<br />본인을 소개해주세요!</h1>
				<InfoTitle>
					<h1>직업</h1>
				</InfoTitle>
				<Slide>
					<div>
						<img src={backpackIcon} width={18} height={18} alt="backpackIcon" />
						<span>학생</span>
					</div>
					<div>
						<img src={ringIcon} width={18} height={18} alt="ringIcon" />
						<span>주부</span>
					</div>
					<div>
						<img src={laptopIcon} width={18} height={18} alt="laptopIcon" />
						<span>직장인</span>
					</div>
					<div>
						<span>기타(직접입력)</span>
					</div>
				</Slide>
				<MarketInput style={{ marginBottom: 0 }} placeholder="직업을 입력해주세요" />
				<InfoTitle>
					<h1>주거형태</h1>
				</InfoTitle>
				<Slide>
					<div>
						<img src={peopleIcon} width={18} height={18} alt="peopleIcon" />
						<span>1인 가구</span>
					</div>
					<div>
						<img src={personIcon} width={18} height={18} alt="personIcon" />
						<span>2인 가구</span>
					</div>
					<div>
						<img src={familyIcon} width={18} height={18} alt="familyIcon" />
						<span>3~4인 가구</span>
					</div>
					<div>
						<img src={smilingIcon} width={18} height={18} alt="smilingIcon" />
						<span>5인 이상 대가구</span>
					</div>
				</Slide>
				<InfoTitle>
					<h1>자주 이용하는 마켓 <span style={{ fontWeight: "normal" }}>(복수선택 가능)</span></h1>
				</InfoTitle>
				<MarketSlide>
					{market.map(v =>
						<div key={v.image}>
							<Marketbutton
								isClick={false}
								marketImage={v.image}
								marketColor={""}
							/>
							<span>{v.name}</span>
						</div>
					)}
				</MarketSlide>
				<MarketInput placeholder="마켓명을 입력해주세요" />
				<LongButton onClick={handleSignIn} buttonStyle={{ color: theme.color.grayscale.FFFFF, backgroundColor: theme.color.main }} color={theme.color.main}>
					가입 완료
				</LongButton>
			</MainWrap>
		</Container>
	)
}

const Container = styled.section`
	width: 100%;
	padding-top: 50px;
	overflow: hidden;
	position: relative;
`

const MainWrap = styled.div`
	margin-top: 40px;
	padding-bottom: 60px;
	>h1{
		margin:0 20px;
		line-height: 1.25;
		font-size: 24px;
		font-weight: bold;
	}
`

const Slide = styled.div`
	display: flex;
	overflow-y: scroll;
	>div:first-child{
		margin-left: 20px;
	}
	>div{
		height: 40px;
		border-radius: 20px;
		border:1px solid ${theme.color.grayscale.F2F3F6};
		margin-right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 15px;
		img{
			margin:11px 0;
			margin-right: 5px;
		}
		span{
			white-space:nowrap;

			color:${theme.color.grayscale.B7C3D4};
			margin-top: 15px;
			margin-bottom: 10px;
		}
	}
`

const InfoTitle = styled.div`
	margin: 40px 20px 14px 20px;
	font-weight	:bold;
`


const MarketSlide = styled.div`
	>div{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	padding: 0 20px;
	display: flex;
	flex-wrap: wrap;
	span{
		margin-right: 10px;
		font-size: 12px;
		margin-top: 5px;
		margin-bottom: 11px;
		color: ${theme.color.grayscale.B7C3D4};
	}
`

const MarketInput = styled.input`
	border-bottom: 1px solid ${theme.color.grayscale.DFE4EE};
	::placeholder{
		color:${theme.color.grayscale.B7C3D4}
	};
	width: 100%;
	padding: 9.5px 0;
	margin: 15px 20px 60px 20px;
`

export default Onboarding