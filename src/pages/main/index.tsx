import { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";

import theme from "styles/theme"
import { dateSimpleFormat } from "utils"
import Marketbutton from "components/marketbutton"
import LongButton from "components/longButton";
import kurlyImage from "assets/image/kurlyImage.png"
import cookatImage from "assets/image/cookatImage.png"
import emartImage from "assets/image/emartImage.png"
import roketImage from "assets/image/roketImage.png"
import naverImage from "assets/image/naverImage.png"
import etcImage from "assets/image/etcImage.png"
import downIcon from "assets/icon/downIcon.png"
import defaultImg from "assets/image/defaultImage.png"
import cameraIcon from "assets/icon/cameraIcon.png"
import reviewHeart from "assets/icon/reviewIcon/reviewHeartIcon.png"
import reviewRound from "assets/icon/reviewIcon/reviewRoundIcon.png"
import reviewTriangle from "assets/icon/reviewIcon/reviewTriangleIcon.png"
import reviewClose from "assets/icon/reviewIcon/reviewCloseIcon.png"

interface MarketInfoprops {
	isClick: boolean,
	image: string,
	color: string,
	name: string
}

const url = window.location.href

function Main() {
	const [marketInfo, setMarketInfo] = useState<Array<MarketInfoprops>>([])
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [selectedListIndex, setSelectedListIndex] = useState(-1)
	const [dummy, setDummy] = useState([
		{
			id: 0,
			name: "마켓컬리"
		},
		{
			id: 1,
			name: "SSG 이마트"
		},
		{
			id: 2,
			name: "쿠캣마켓"
		},
		{
			id: 3,
			name: "쿠캣마켓"
		},
		{
			id: 4,
			name: "쿠캣마켓"
		},
		{
			id: 5,
			name: "쿠캣마켓"
		}
	])

	useEffect(() => {
		setMarketInfo(dummy.map((v) => {
			switch (v.name) {
				case "마켓컬리":
					return { name: v.name, color: theme.color.marketColor.kurly, isClick: false, image: kurlyImage }
				case "쿠팡 로켓프레시":
					return { name: v.name, color: theme.color.marketColor.roket, isClick: false, image: roketImage }
				case "쿠캣마켓":
					return { name: v.name, color: theme.color.marketColor.cookat, isClick: false, image: cookatImage }
				case "네이버 쇼핑":
					return { name: v.name, color: theme.color.marketColor.naver, isClick: false, image: naverImage }
				case "SSG 이마트":
					return { name: v.name, color: theme.color.marketColor.emart, isClick: false, image: emartImage }
				case "기타(직접입력)":
					return { name: v.name, color: theme.color.marketColor.other, isClick: false, image: etcImage }
				default:
					return { name: v.name, color: theme.color.marketColor.other, isClick: false, image: etcImage }
			}
		}))
	}, [dummy])

	const handleShareList = () => {
		// ! https에서만 공유가능
		if (navigator.share) {
			navigator.share({
				title: "맛추픽추",
				text: "hello world",
				url
			})
		}
		else {
			alert("공유하기가 지원되지 않는 환경 입니다.")
		}
	}

	return (
		<>
			<Container>
				<Header>
					<TitleWrap>
						<div style={{ fontSize: 24, fontWeight: "bold", lineHeight: 1.25 }}>오늘의 추천템</div>
						{/* <Link to="/login" style={{ color: theme.color.main }}>로그인</Link> */}
						<Link to="/mypage">
							<img src={defaultImg} width={30} height={30} alt="defaultImg" />
						</Link>
					</TitleWrap>
					<span>
						<span style={{ fontWeight: "bold" }}>{dateSimpleFormat()}</span>
						에 나온 추천템이에요
					</span>
					<LastItemButton to="/pastItemList"
					>
						{`지난 추천템 보기 >`}
					</LastItemButton>
				</Header>
				<Slide>
					{dummy.map((v, i) =>
						<div key={v.id} onClick={() => {
							setSelectedIndex(i)
							setMarketInfo(marketInfo.map((marketInfoV, marketInfoI) => {
								if (i === marketInfoI) {
									return { ...marketInfoV, isClick: true }
								}
								return { ...marketInfoV, isClick: false }
							}))
						}}>
							{marketInfo.length !== 0 &&
								<Marketbutton
									isClick={marketInfo[i].isClick}
									marketImage={marketInfo[i].image}
									marketColor={theme.color.marketColor.kurly}
								/>
							}

						</div>
					)}
				</Slide>
				<MainWrap>
					{marketInfo.length !== 0 &&
						<h1 style={{ marginLeft: 20, fontSize: 16, fontWeight: "bold", color: marketInfo[selectedIndex].color }}>
							{marketInfo[selectedIndex].name}
						</h1>
					}
					<ListView>
						{
							Array.from([
								{
									idx: 1,
									title: "[단백질과자점] 단백질 쿠키 프로틴 사브레 충분히 길어졌을때3종",
									description: "",
									tag: 3
								},
								{
									idx: 2,
									title: "[창억]호박인절미",
									description: "",
									tag: 11
								},
								{
									idx: 3,
									title: "[네떼] 간편 양상추",
									description: "",
									tag: 3
								},
								{
									idx: 3,
									title: "[네떼] 간편 양상추",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "[단백질과자점] 단백질 쿠키 프로틴 사브레 충분히 길어졌을때3종",
									description: "",
									tag: 3
								},
							])
								.map((arrayItem, arrayIndex) => {
									return (
										<div key={arrayIndex}>
											<ListItem
												onClick={() => {
													if (selectedListIndex === arrayIndex) {
														setSelectedListIndex(-1);
													} else {
														setSelectedListIndex(arrayIndex);
													}
												}}
												style={{
													marginLeft: selectedListIndex === arrayIndex ? 0 : 20,
													paddingLeft: selectedListIndex === arrayIndex ? 20 : 0,
													backgroundColor: selectedListIndex === arrayIndex ? theme.color.grayscale.F5F5F5 : theme.color.grayscale.FFFFF,
												}}
											>
												<div>
													<span
														style={{
															fontSize: 16,
															lineHeight: 1.5,
															color: theme.color.grayscale.C_4C5463,
															fontWeight: selectedListIndex === arrayIndex ? 'bold' : 'normal',
														}}
													>
														{arrayItem.title}
														<Tag>{arrayItem.tag}</Tag>
													</span>
													<UpDownIcon src={downIcon}
														style={{ transform: selectedListIndex === arrayIndex ? "rotate(180deg)" : "", objectFit: "cover" }}
														width={20} height={20} alt="updownIcon" />
												</div>
												{
													selectedListIndex === arrayIndex &&
													<ListMore>
														<div>
															<div style={{ display: "flex" }}>
																<img src={reviewHeart} width={15} height={15} alt="reviewHeart" />
																<div>
																	<span style={{ fontSize: 12, color: theme.color.grayscale.C_4C5463 }}>
																		<span style={{ fontWeight: "bold" }}>33/직장인/마켓컬리</span> 님이
																		<span style={{ color: theme.color.main }}> 처음 추천</span>하셨어요!</span>
																</div>
															</div>
															<MoreTextBox>
																<span>단백질 맛 안나고 일반 밀가루 쿠키보다 맛있음 + 가격 부담 살짝</span>
															</MoreTextBox>
														</div>
													</ListMore>
												}
											</ListItem>
										</div>
									)
								})
						}
					</ListView>
				</MainWrap>
				<div style={{ padding: "40px 0", backgroundColor: theme.color.grayscale.F5F5F5 }}>
					<LongButton onClick={handleShareList} buttonStyle={{ color: theme.color.grayscale.C_4C5463 }} color={theme.color.grayscale.B7C3D4}>
						리스트 공유하기
					</LongButton>
				</div>
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

const LastItemButton = styled(Link)`
	line-height: 2;
	font-size: 12px;
	margin-top: 5px;
	max-width: 100px;
	color: ${theme.color.grayscale.B7C3D4};
	text-decoration :underline ;
	cursor: pointer;
`;

const Slide = styled.div`
	>div:first-child{
		margin-left: 10px;
	}
	display: flex;
	overflow: scroll;
	margin-top: 20px;
`;


const MainWrap = styled.section`
	padding-top: 20px;
	margin-bottom: auto;
`;

const ListView = styled.div`
	overflow: scroll;
	height: calc(100vh - 380px);
	margin-top: 20px;
`;

const ListItem = styled.div`
	cursor: pointer;
	min-height: 53px;
	border-bottom: 1px solid ${theme.color.grayscale.F2F3F6};
	display: flex;
	align-items: center;
	padding:14.5px 0;
	position: relative;
	>div:first-child{
		display: flex;
		align-items: center;
		width: calc(100% - 40px);
		word-break: break-word;
		padding-right: 20px;
	}
	flex-wrap: wrap;
`;

const UpDownIcon = styled.img`
	position: absolute;
	right: 20px;
`

const ListMore = styled.div`
	display: flex;
	width: 100%;
	margin: 14.5px 20px 0 0px;
	padding: 20px 0px 5.5px 0px;
	border-top: 1px solid ${theme.color.grayscale.B7C3D4};
	img{
		margin-bottom: 2px;
		margin-right: 5px;
	}
	
`;

const MoreTextBox = styled.div`
	width:calc(100% - 20px) ;
	margin-left: 20px;
	margin-top: 10px;
	padding: 10px 15px;
	border-radius: 5px;
	box-shadow: 0 2px 5px 0 rgba(183, 195, 212, 0.4);
	border:1px solid ${theme.color.grayscale.DFE4EE};
	color:${theme.color.grayscale.C_4C5463};
	background-color: ${theme.color.grayscale.FFFFF};
	line-height: 1.29;
`

const Tag = styled.span`
	height: 20px;
	border-radius: 10px;
	padding: 2.5px 10px 0 10px;
	display: inline-flex;
	align-items: center;
	border:1px solid ${theme.color.grayscale.DFE4EE};
	margin-left: 5px;
	font-size: 12px;
	font-weight:500;
`;

export default Main