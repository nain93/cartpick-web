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
import { getSearchMarketData } from 'api/search'
import { useMutation, useQuery, useQueryClient } from 'react-query'

interface MarketListLayoutProps {
	marketData: Array<{ id: number, name: string }>,
	date?: string,
	isPastItem?: boolean,
	searchKeyword?: string
}

const url = window.location.href

function MarketListLayout({ marketData, date, isPastItem = false, searchKeyword }: MarketListLayoutProps) {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [selectedListIndex, setSelectedListIndex] = useState(-1)
	const [marketInfo, setMarketInfo] = useState<Array<MarketInfoprops>>([])
	const [cookie] = useCookies(["token"])

	const marketQuery = useQuery<Array<MarketProductType> | null, Error>("marketData", async () => {
		// * 검색후 나온 리스트 첫번째 데이터
		if (searchKeyword) {
			const queryData = await getSearchMarketData(marketData[0].id, searchKeyword, cookie.token)
			return queryData
		}

		// * 마켓 리스트를 불러오고 첫번째 마켓 상품데이터 
		else if (date) {
			const queryData = await getMarketProduct(marketData[0].id, date, isPastItem ? cookie.token : "")
			return queryData
		}

	})

	const queryClient = useQueryClient()
	const marketMutation = useMutation(async (marketIndex: number) => {
		// * 검색 후 각 마켓별 리스트
		if (searchKeyword) {
			const mutationData = await getSearchMarketData(marketData[marketIndex].id, searchKeyword, cookie.token)
			return mutationData
		}
		// * 요일별 각 마켓별 리스트
		else if (date) {
			const mutationData = await getMarketProduct(marketData[marketIndex].id, date, isPastItem ? cookie.token : "")
			return mutationData
		}
	}, {
		onSuccess: (data) => {
			queryClient.setQueryData("marketData", () => data)
		}
	})

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

	// * marketData 캐싱 데이터삭제 (ui상 문제)
	useEffect(() => {
		return () => queryClient.removeQueries("marketData", { exact: true })
	}, [queryClient])

	console.log(marketQuery.data, 'marketQuery.data');

	return (
		<>
			{marketQuery.isLoading ?
				<Slide>
					<EmptyDiv />
				</Slide>
				:
				<Slide>
					{React.Children.toArray(marketData?.map((v, i) =>
						<div onClick={async () => {
							setSelectedIndex(i)
							// * 마켓 클릭할때마다 새 데이터 호출
							marketMutation.mutate(i)
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
				</Slide>}
			{marketInfo.length !== 0 &&
				<h1 style={{ marginTop: 20, marginLeft: 20, fontSize: 16, fontWeight: "bold", color: marketInfo[selectedIndex].color }}>
					{marketInfo[selectedIndex].name}
				</h1>
			}
			<ListView isPastItem={isPastItem}>
				{(marketQuery.isLoading || !marketQuery.data) ?
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }} />
					:
					(marketQuery.data.length === 0 ?
						// * 빈 요일별 화면 (요일별 추천템 없을때)
						<div style={{ position: "absolute", top: "50%", width: "100%", maxWidth: 768, display: "flex", flexDirection: "column", alignItems: "center" }}>
							<img style={{ marginBottom: 10 }} src={grinningIcon} width={30} height={30} alt="grinningIcon" />
							<span style={{ color: theme.color.grayscale.C_4C5463 }}>
								{isPastItem ? `${date?.slice(4, 6)}월 ${date?.slice(6, 8)}일 추천템이 없어요` : "오늘은 추천템이 없어요"}
							</span>
						</div>
						:
						React.Children.toArray(marketQuery.data.map((arrayItem, arrayIndex) => {
							return (
								<div>
									<ListItem
										onClick={() => {
											if (arrayItem.reviewCount === 0) {
												// * 리뷰 없으면 열리는 ui 비활성화 처리
												return
											}
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
						})))
				}
			</ListView>
			{date &&
				<div style={{ position: "absolute", bottom: 0, width: "100%", maxWidth: 768, padding: "40px 0", backgroundColor: theme.color.grayscale.F5F5F5 }}>
					<LongButton onClick={handleShareList} buttonStyle={{ color: theme.color.grayscale.C_4C5463 }} color={theme.color.grayscale.B7C3D4}>
						리스트 공유하기
					</LongButton>
				</div>
			}
		</>
	)
}


const Slide = styled.div`
	>div:first-child{
		@media screen and (max-width: 768px) {
			margin-left: 20px;
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
	/* margin-right: 30px; */
`;

const ListView = styled.div<{ isPastItem: boolean }>`
	overflow: scroll;
	/* height: ${props => props.isPastItem ? "calc(100vh - 400px)" : "calc(100vh - 380px)"};  */
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


const EmptyDiv = styled.div`
	@media screen and (max-width: 768px) {
		height: 45px
	}
	height: 100px;
`

export default MarketListLayout