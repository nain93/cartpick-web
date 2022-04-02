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
import cameraIcon from "assets/icon/cameraIcon.png"

interface MarketInfoprops {
	isClick: boolean,
	image: string,
	color: string,
	name: string
}

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

	return (
		<>
			<Container>
				<Header>
					<TitleWrap>
						<div style={{ fontSize: 24, fontWeight: "bold", lineHeight: 1.25 }}>오늘의 추천템</div>
						<Link to="/login" style={{ color: theme.color.main }}>로그인</Link>
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
					{/* 없을때 */}
					{/* <EmptyView>
						<div className="icon0">	&#128514;</div>
						<div className="label0">오늘은 추천템이 없어요</div>
					</EmptyView> */}

					{/* 있을때 */}
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

							])
								.map((arrayItem, arrayIndex) => {
									return (
										<div key={`listitem_` + arrayIndex}>
											<ListItem
												onClick={() => {
													if (selectedListIndex === arrayIndex) {
														setSelectedListIndex(-1);
													} else {
														setSelectedListIndex(arrayIndex);
													}
												}}
												style={{
													backgroundColor: selectedListIndex === arrayIndex ? theme.color.grayscale.F5F5F5 : '#ffffff',
												}}
											>
												<div className="text1">
													<span
														style={{
															fontSize: 16,
															lineHeight: 1.5,
															color: theme.color.grayscale.C_4C5463,
															fontWeight: selectedListIndex === arrayIndex ? '900' : '500',
														}}
													>
														{arrayItem.title}
														<Tag>{arrayItem.tag}</Tag>
													</span>
													<img src={downIcon} style={{ objectFit: "cover", transform: selectedIndex === arrayIndex ? "rotate(180deg)" : "" }} width={20} height={20} alt="downIcon" />
												</div>
												{
													selectedListIndex === arrayIndex &&
													<ListMore>
														<div className="top_border"></div>
														<div className="chat_row0 chat_row1">
															<div className="icon0 icon1">&#9829;</div>
															<div className="label0 label1">
																<span className="font_bold">33/직장인/마켓컬리</span>&nbsp;님이&nbsp;<span className="font_active">처음 추천</span>&nbsp;하셨어요!
															</div>
														</div>
														<div className="chat_row0 chat_row2">
															<div className="balloon0 balloon1">
																단백질 맛 안나고 일반 밀가루 쿠키보다 맛있음 + 가격 부담 살짝
															</div>
														</div>
														<div className="chat_row0 chat_row1">
															<div className="icon0 icon1">&#9829;</div>
															<div className="label0 label1">
																<span className="font_bold">33/직장인/마켓컬리</span>&nbsp;님이&nbsp;<span className="font_active">처음 추천</span>&nbsp;하셨어요!
															</div>
														</div>
														<div className="chat_row0 chat_row2">
															<div className="balloon0 balloon1">
																다이어트 중에 부담없이 먹을 수 있음 일반 쿠키 느낌
															</div>
														</div>
														<div className="chat_row0 chat_row1">
															<div className="icon0 icon1">&#9829;</div>
															<div className="label0 label1">
																<span className="font_bold">33/직장인/마켓컬리</span>&nbsp;님이&nbsp;<span className="font_active">처음 추천</span>&nbsp;하셨어요!
															</div>
														</div>
														<div className="chat_row0 chat_row2">
															<div className="balloon0 balloon1">
																조금 느끼함, 먹고 나면 입안에 텁텁함이 오래감
															</div>
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
					<LongButton onClick={() => console.log("click")} buttonStyle={{ color: theme.color.grayscale.C_4C5463 }} color={theme.color.grayscale.B7C3D4}>
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
`;

const ListView = styled.div`
	overflow: scroll;
	height: calc(100vh - 370px);
	margin-top: 20px;
`;

const EmptyView = styled.div`
	overflow: hidden;
	height: calc(100vh - 370px);
	margin-top: 15.5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;


	.icon0 {
		width: 30px;
		height: 30px;
		object-fit : contain;
	}	
	.label0 {
		font-size: 14px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.29;
		letter-spacing: normal;
		text-align: center;
		color: #4c5463;
	}

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
		padding:0 20px;
	}
	img{
		position: absolute;
		right: 20px;
	}
	
	flex-wrap: wrap;
`;

const ListMore = styled.div`
	width: 100%;
    display: flex;
	flex-wrap: wrap;
    align-items: center;
	padding:0 20px;
	.top_border {
		width: 100%;
		height: 1px;
		background-color: ${theme.color.grayscale.B7C3D4};
		margin-top: 14.5px;
		margin-bottom: 14.5px;
	}
	.chat_row0 {
		display: flex;
		width: 100%;
	}
	.chat_row0 .label0 {
		display: flex;
		width: calc(100% - 20px);
		margin-left: 5px;
	}
	.chat_row0 .balloon0 {
		display: flex;
		width: calc(100% - 15px);
		margin-left: auto;
		padding: 10px 15px;
		border-radius: 5px;
		box-shadow: 0 2px 5px 0 rgba(183, 195, 212, 0.4);
		border: solid 1px ${theme.color.grayscale.DFE4EE};
		background-color:${theme.color.grayscale.FFFFF};
		margin-top: 9px;
		margin-bottom: 10px;
		line-height: 1.29;
		text-align: left;
		color: ${theme.color.grayscale.C_4C5463};
	}
	.chat_row0 .font_bold {
		font-weight : 700;
	}
	.chat_row0 .font_active {
		color : ${theme.color.main}
	}
		
	.chat_row1 {
		align-items: center;
		justify-content: flex-start;
		margin-top: 12px;
	}
	.chat_row2 {
		align-items: center;
		justify-content: flex-end;
		
	}


`;

const Tag = styled.span`
	height: 20px;
	border-radius: 10px;
	padding: 1px 10px;
	display: inline-flex;
	align-items: center;
	border:1px solid ${theme.color.grayscale.DFE4EE};
	margin-left: 5px;
	font-size: 12px;
`;

export default Main