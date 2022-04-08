import { getMarketProduct } from 'api/market'
import Review from 'components/marketListLayout/review'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'
import { MarketInfoprops, MarketProductType } from 'types/market'
import LongButton from 'components/longButton'

import grinningIcon from "assets/icon/grinningIcon.png"
import downIcon from "assets/icon/downIcon.png"
import Marketbutton from "components/marketbutton"
import kurlyImage from "assets/image/kurlyImage.png"
import cookatImage from "assets/image/cookatImage.png"
import emartImage from "assets/image/emartImage.png"
import roketImage from "assets/image/roketImage.png"
import wingItImage from "assets/image/wingItImage.png"
import naverImage from "assets/image/naverImage.png"
import oasisImage from "assets/image/oasisImage.png"
import etcImage from "assets/image/etcImage.png"
import { useCookies } from 'react-cookie'

interface MarketListLayoutProps {
	marketData: Array<{ id: number, name: string }>,
	date: string,
	isPastItem?: boolean
}

const url = window.location.href

function MarketListLayout({ marketData, date, isPastItem = false }: MarketListLayoutProps) {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [selectedListIndex, setSelectedListIndex] = useState(-1)
	const [marketProduct, setMarketProduct] = useState<Array<MarketProductType>>([])
	const [marketInfo, setMarketInfo] = useState<Array<MarketInfoprops>>([])
	const [cookie] = useCookies(["token"])

	useEffect(() => {
		if (marketData) {
			setMarketInfo(marketData.map((v) => {
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
	}, [marketData])

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
			if (marketData && date) {
				const firstProductData = await getMarketProduct(marketData[0].id, date, isPastItem ? cookie.token : "")
				if (firstProductData) {
					setMarketProduct(firstProductData)
				}
			}
		}
		getMarket()
	}, [marketData, date])

	return (
		<>
			<Slide>
				{React.Children.toArray(marketData?.map((v, i) =>
					<div onClick={async () => {
						setSelectedIndex(i)
						// * 마켓 클릭할때마다 새 데이터 호출
						const data = await getMarketProduct(marketData[i].id, date, isPastItem ? cookie.token : "")
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
				))}
			</Slide>
			{marketInfo.length !== 0 &&
				<h1 style={{ marginTop: 20, marginLeft: 20, fontSize: 16, fontWeight: "bold", color: marketInfo[selectedIndex].color }}>
					{marketInfo[selectedIndex].name}
				</h1>
			}
			<ListView isPastItem={isPastItem}>
				{
					marketProduct.length === 0 ?
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
							<img style={{ marginBottom: 10 }} src={grinningIcon} width={30} height={30} alt="grinningIcon" />
							<span style={{ color: theme.color.grayscale.C_4C5463 }}>오늘은 추천템이 없어요</span>
						</div> :
						React.Children.toArray(marketProduct.map((arrayItem, arrayIndex) => {
							return (
								<div>
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
											(selectedListIndex === arrayIndex) &&
											React.Children.toArray(arrayItem.reviews.map(review =>
												<Review review={review} />
											))
										}
									</ListItem>
								</div>
							)
						}))
				}
			</ListView>
			<div style={{ padding: "40px 0", backgroundColor: theme.color.grayscale.F5F5F5 }}>
				<LongButton onClick={handleShareList} buttonStyle={{ color: theme.color.grayscale.C_4C5463 }} color={theme.color.grayscale.B7C3D4}>
					리스트 공유하기
				</LongButton>
			</div>
		</>
	)
}


const Slide = styled.div`
	>div:first-child{
		@media screen and (max-width: 768px) {
			margin-left: 10px;
			}
			margin-left: 0px;
	}
	>div{
		@media screen and (max-width: 768px) {
		margin-bottom: 0;
	}
		margin-bottom: 10px;
	}
	display: flex;
	margin-top: 20px;
	@media screen and (max-width: 768px) {
		overflow: scroll;
		margin-right: 0px;
		flex-wrap: nowrap;
		padding: 0;
	}
	padding: 0 20px;
	flex-wrap: wrap;
	overflow: scroll;
	margin-right: 30px;
`;

const ListView = styled.div<{ isPastItem: boolean }>`
	overflow: scroll;
	height: ${props => props.isPastItem ? "calc(100vh - 400px)" : "calc(100vh - 380px)"}; 
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


export default MarketListLayout