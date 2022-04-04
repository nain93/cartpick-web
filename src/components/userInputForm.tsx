import { useState } from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'
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
import Marketbutton from 'components/marketbutton'

function UserInputForm() {
	const [errorMsg, setErrorMsg] = useState("해당하는 항목을 선택해주세요")
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
	console.log(window.location.href, "location");
	return (
		<>
			<InfoTitle errorMsg={errorMsg}>
				<h1>직업</h1>
			</InfoTitle>
			<div style={{ position: "relative" }}>
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
					<ErrorMsg>{errorMsg}</ErrorMsg>
				</Slide>
			</div>
			{/* <MarketInput style={{ marginBottom: 0 }} placeholder="직업을 입력해주세요" /> */}
			<InfoTitle errorMsg={errorMsg}>
				<h1>주거형태</h1>
			</InfoTitle>
			<div style={{ position: "relative" }}>
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
				<ErrorMsg>{errorMsg}</ErrorMsg>
			</div>
			<InfoTitle errorMsg={errorMsg}>
				<h1>자주 이용하는 마켓 <span style={{ fontWeight: "normal" }}>(복수선택 가능)</span></h1>
			</InfoTitle>
			<div style={{ position: "relative" }}>
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
				<ErrorMsg style={{ bottom: -20 }}>{errorMsg}</ErrorMsg>
			</div>
			<MarketInput placeholder="마켓명을 입력해주세요" />
		</>
	)
}

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

const InfoTitle = styled.div<{ errorMsg: string }>`
	margin: 40px 20px 14px 20px;
	margin-top: ${props => props.errorMsg ? "60px" : "40px"};
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
	width: calc(100% - 40px);
	padding: 9.5px 0;
	margin: 15px 20px 60px 20px;
`

const ErrorMsg = styled.span`
	position: absolute;
	bottom:-30px;
	left:20px;
	font-size: 12px;
	line-height: 2.33;
	color:${theme.color.ErrorTextColor};
`


export default UserInputForm