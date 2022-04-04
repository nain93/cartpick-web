import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
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

interface SignUpType {
	job: string,
	household: string,
	market: Array<string>
}

interface UserInputProps {
	signUpData: SignUpType;
	setSignUpData: (data: SignUpType) => void;
}

const jobs = [
	{ icon: backpackIcon, name: "학생" },
	{ icon: ringIcon, name: "주부" },
	{ icon: laptopIcon, name: "직장인" },
	{ icon: "", name: "기타(직접입력)" }]

const house = [
	{ icon: peopleIcon, name: "1인 가구" },
	{ icon: personIcon, name: "2인 가구" },
	{ icon: familyIcon, name: "3~4인 가구" },
	{ icon: smilingIcon, name: "5인 이상 대가구" }
]

function UserInputForm({ signUpData, setSignUpData }: UserInputProps) {
	//"해당하는 항목을 선택해주세요"
	const [errorMsg, setErrorMsg] = useState("")
	const [jobSelect, setJobSelect] = useState<number>()
	const [houseSelect, setHouseSelect] = useState<number>()
	const [marketText, setMarketText] = useState<string>("")
	const [marketOthers, setMarketOthers] = useState<Array<string>>([])
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

	const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && marketText) {
			setMarketOthers(marketOthers.concat(marketText))
			setMarketText("")
		}
	}

	return (
		<>
			<InfoTitle errorMsg={errorMsg}>
				<h1>직업</h1>
			</InfoTitle>
			<div style={{ position: "relative" }}>
				<Slide>
					{React.Children.toArray(jobs.map((v, i) =>
						<div onClick={() => {
							setJobSelect(i)
							if (i === jobs.length - 1) {
								setSignUpData({ ...signUpData, job: "" })
							}
							else {
								setSignUpData({ ...signUpData, job: v.name })
							}
						}}
							style={(jobSelect === i) ? { color: theme.color.main, border: `1px solid ${theme.color.main}` } :
								{ color: theme.color.grayscale.B7C3D4, border: `1px solid ${theme.color.grayscale.F2F3F6}` }
							}>
							{v.icon &&
								<img src={v.icon} width={18} height={18} alt={v.name} />
							}
							<span>{v.name}</span>
						</div>
					))}
					<ErrorMsg>{errorMsg}</ErrorMsg>
				</Slide>
			</div>
			{jobSelect === jobs.length - 1 &&
				<MarketInput value={signUpData.job} onChange={(e) => setSignUpData({ ...signUpData, job: e.target.value })} placeholder="직업을 입력해주세요" />}
			<InfoTitle errorMsg={errorMsg}>
				<h1>주거형태</h1>
			</InfoTitle>
			<div style={{ position: "relative" }}>
				<Slide>
					{React.Children.toArray(house.map((v, i) =>
						<div onClick={() => {
							setHouseSelect(i)
							setSignUpData({ ...signUpData, household: v.name })
						}}
							style={(houseSelect === i) ? { color: theme.color.main, border: `1px solid ${theme.color.main}` } :
								{ color: theme.color.grayscale.B7C3D4, border: `1px solid ${theme.color.grayscale.F2F3F6}` }
							}>
							<img src={v.icon} width={18} height={18} alt={v.name} />
							<span>{v.name}</span>
						</div>
					))}
				</Slide>
				<ErrorMsg>{errorMsg}</ErrorMsg>
			</div>
			<InfoTitle errorMsg={errorMsg}>
				<h1>자주 이용하는 마켓 <span style={{ fontWeight: "normal" }}>(복수선택 가능)</span></h1>
			</InfoTitle>
			<div style={{ position: "relative" }}>
				<MarketSlide>
					{market.map((v, i) =>
						<div key={v.image} onClick={() => setMarket(market.map((marketV, marketI) => {
							if (marketI === i) {
								return { ...marketV, isClick: !marketV.isClick }
							}
							else {
								return marketV
							}
						}))}>
							<Marketbutton
								isClick={v.isClick}
								marketImage={v.image}
								marketColor={theme.color.main}
							/>
							<span>{v.name}</span>
						</div>
					)}
				</MarketSlide>
				<ErrorMsg style={{ bottom: -20 }}>{errorMsg}</ErrorMsg>
			</div>
			{market[market.length - 1].isClick &&
				<>
					<MarketInput value={marketText} onChange={(e) => setMarketText(e.target.value)} onKeyDown={handleEnter} placeholder="마켓명을 입력해주세요" />
					<OtherMarket>
						{React.Children.toArray(marketOthers.map((v, i) =>
							<div>
								{v}
							</div>
						))}
					</OtherMarket>
				</>}
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
		cursor: pointer;
		height: 40px;
		border-radius: 20px;
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
	margin: 15px 20px 0 20px;
`

const ErrorMsg = styled.span`
	position: absolute;
	bottom:-30px;
	left:20px;
	font-size: 12px;
	line-height: 2.33;
	color:${theme.color.ErrorTextColor};
`

const OtherMarket = styled.div`
display: flex;
padding:0 20px;
margin-top: 10px;
flex-wrap: wrap;
>div{
	margin: 0 10px 10px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 100px;
	padding: 0 15px;
	height: 40px;
	border-radius: 10px;
	border:1px solid ${theme.color.grayscale.DFE4EE};
}

`


export default UserInputForm