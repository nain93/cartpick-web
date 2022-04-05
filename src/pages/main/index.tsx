import { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";

import theme from "styles/theme"
import { dateFormatForSendBack, dateSimpleFormat } from "utils"
import Marketbutton from "components/marketbutton"
import LongButton from "components/longButton";
import kurlyImage from "assets/image/kurlyImage.png"
import cookatImage from "assets/image/cookatImage.png"
import emartImage from "assets/image/emartImage.png"
import roketImage from "assets/image/roketImage.png"
import wingItImage from "assets/image/wingItImage.png"
import naverImage from "assets/image/naverImage.png"
import oasisImage from "assets/image/oasisImage.png"
import etcImage from "assets/image/etcImage.png"
import downIcon from "assets/icon/downIcon.png"
import defaultImg from "assets/image/defaultImage.png"
import reviewHeart from "assets/icon/reviewIcon/reviewHeartIcon.png"
import grinningIcon from "assets/icon/grinningIcon.png"

import { getUserProfile } from "api/user";
import { useCookies } from "react-cookie";
import { getMarketList, getMarketProduct } from "api/market";
import { useQuery } from "react-query"
import { UserDataType } from "types/user";

interface MarketInfoprops {
	isClick: boolean,
	image: string,
	color: string,
	name: string
}

interface MarketProductType {
	id: number,
	name: string,
	reviews: Array<{
		id: number,
		author: string,
		content: string,
		images: Array<{
			id: number,
			priority: number,
			image: string
		}>,
		isPositive: boolean
	}>,
	reviewCount: number,
	created: string
}
const url = window.location.href
const date = dateFormatForSendBack()

function Main() {
	const [cookies] = useCookies(['token']);
	const [marketInfo, setMarketInfo] = useState<Array<MarketInfoprops>>([])
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [selectedListIndex, setSelectedListIndex] = useState(-1)
	const [marketProduct, setMarketProduct] = useState<Array<MarketProductType>>([])

	const userQuery = useQuery<UserDataType, Error>("userData", () => getUserProfile(cookies.token))
	const marketListQuery = useQuery<Array<{ id: number, name: string }>, Error>("marketList", () => getMarketList(cookies.token))


	useEffect(() => {
		if (marketListQuery.data) {
			setMarketInfo(marketListQuery.data.map((v) => {
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
					case "윙잇":
						return { name: v.name, color: theme.color.marketColor.wingIt, isClick: false, image: wingItImage }
					case "오아시스마켓":
						return { name: v.name, color: theme.color.marketColor.oasis, isClick: false, image: oasisImage }
					case "기타(직접입력)":
						return { name: v.name, color: theme.color.marketColor.other, isClick: false, image: etcImage }
					default:
						return { name: v.name, color: theme.color.marketColor.other, isClick: false, image: etcImage }
				}
			}).map((v, i) => {
				if (i === 0) {
					return { ...v, isClick: true }
				}
				return v
			}))
		}
	}, [marketListQuery.data])

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

	useEffect(() => {
		const getMarket = async () => {
			// * 마켓 리스트를 불러오고 첫번째 마켓 상품데이터 
			if (marketListQuery.data) {
				const firstProductData = await getMarketProduct(cookies.token, marketListQuery.data[0].id, date)
				if (firstProductData) {
					setMarketProduct(firstProductData)
				}
			}
		}
		getMarket()
	}, [])


	return (
		<>
			<Container>
				<Header>
					<TitleWrap>
						<div style={{ fontSize: 24, fontWeight: "bold", lineHeight: 1.25 }}>오늘의 추천템</div>
						{cookies.token ?
							<Link to="/mypage">
								<img style={{ borderRadius: 20 }} src={userQuery.data?.profileImage ? userQuery.data.profileImage : defaultImg} width={30} height={30} alt="defaultImg" />
							</Link>
							:
							<Link to="/login" style={{ color: theme.color.main }}>로그인</Link>
						}
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
					{marketListQuery.data?.map((v, i) =>
						<div key={v.id} onClick={async () => {
							setSelectedIndex(i)
							// * 마켓 클릭할때마다 새 데이터 호출
							const data = await getMarketProduct(cookies.token, marketListQuery.data[selectedIndex].id, date)
							if (data) {
								setMarketProduct(data)
							}
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
							marketProduct.length === 0 ?
								<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
									<img style={{ marginBottom: 10 }} src={grinningIcon} width={30} height={30} alt="grinningIcon" />
									<span style={{ color: theme.color.grayscale.C_4C5463 }}>오늘은 추천템이 없어요</span>
								</div> :
								marketProduct.map((arrayItem, arrayIndex) => {
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
														{arrayItem.name}
														<Tag>{arrayItem.reviewCount}</Tag>
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