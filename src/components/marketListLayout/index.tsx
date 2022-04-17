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
import bMartImage from "assets/image/bmartImage.jpg"
import natureImage from "assets/image/natureImage.jpg"
import { getSearchMarketData } from 'api/search'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { popupState, tokenState } from 'recoil/atoms'

interface MarketListLayoutProps {
	marketData: Array<{ id: number, name: string }>,
	date?: string,
	isPastItem?: boolean,
	searchKeyword?: string
}

function MarketListLayout({ marketData, date, isPastItem = false, searchKeyword }: MarketListLayoutProps) {
	const url = window.location.href
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [selectedListIndex, setSelectedListIndex] = useState(-1)
	const [marketInfo, setMarketInfo] = useState<Array<MarketInfoprops>>([])
	const token = useRecoilValue(tokenState)
	const [listViewHeight, setListViewHeight] = useState("")
	const setIspopupOpen = useSetRecoilState(popupState)

	const marketQuery = useQuery<Array<MarketProductType> | null, Error>("marketData", async () => {
		// * 검색후 나온 전체 리스트 데이터
		if (searchKeyword) {
			const queryData = await getSearchMarketData(null, searchKeyword, token)
			return queryData
		}

		// * 마켓 리스트를 전체 리스트 데이터 
		else if (date) {
			const queryData = await getMarketProduct(null, date, isPastItem ? token : "")
			return queryData
		}

	})
	const queryClient = useQueryClient()
	const marketMutation = useMutation(async (marketIndex: number | null) => {
		// * 검색 후 각 마켓별 리스트
		if (searchKeyword) {
			const mutationData = await getSearchMarketData((marketIndex || marketIndex === 0) ? marketData[marketIndex].id : null, searchKeyword, token)
			return mutationData
		}
		// * 요일별 각 마켓별 리스트
		else if (date) {
			const mutationData = await getMarketProduct((marketIndex || marketIndex === 0) ? marketData[marketIndex].id : null, date, isPastItem ? token : "")
			return mutationData
		}
	}, {
		onSuccess: (data) => {
			queryClient.setQueryData("marketData", () => data)
		}
	})

	useEffect(() => {
		if (marketData) {
			setMarketInfo([{ name: "전체", color: theme.color.marketColor.other, isClick: true, image: "" }, ...marketData.map((v) => {
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
					case "B마트":
						return { name: v.name, color: theme.color.marketColor.bmart, isClick: false, image: bMartImage }
					case "헬로네이처":
						return { name: v.name, color: theme.color.marketColor.nature, isClick: false, image: natureImage }
					case "기타":
						return { name: v.name, color: theme.color.marketColor.other, isClick: false, image: etcImage }
					default:
						return { name: v.name, color: theme.color.marketColor.other, isClick: false, image: etcImage }
				}
			})])
		}
	}, [marketData])
	// * 카카오 공유하기 로직
	const handleShareList = () => {
		//@ts-ignore
		const { Kakao } = window
		if (!marketQuery.data || marketQuery.data.length === 0) {
			setIspopupOpen({ isOpen: true, content: "공유할 리스트가 없습니다" })
			return
		}
		else {
			Kakao.Link.sendDefault({
				objectType: 'list', // 메시지 형식 : 피드 타입
				headerTitle: '카트픽',
				headerLink: {
					mobileWebUrl: url,
					webUrl: url,
				},
				contents: [
					{
						title: marketQuery.data[0].name,
						description: marketQuery.data[0]?.reviews.length > 0 ? marketQuery.data[0]?.reviews[0].content : "",
						imageUrl: '',
						link: {
							mobileWebUrl: url,
							webUrl: url,
						},
					},
					{
						title: marketQuery.data[1]?.name || "",
						description: marketQuery.data[1]?.reviews.length > 0 ? marketQuery.data[1]?.reviews[0].content : "",
						imageUrl: '',
						link: {
							mobileWebUrl: url,
							webUrl: url,
						},
					},
					{
						title: marketQuery.data[2]?.name || "",
						description: marketQuery.data[2]?.reviews.length > 0 ? marketQuery.data[2]?.reviews[0].content : "",
						imageUrl: '',
						link: {
							mobileWebUrl: url,
							webUrl: url,
						},
					},
				],
				buttons: [
					{
						title: '웹사이트로 이동', // 버튼 이름
						link: {
							webUrl: url,
							mobileWebUrl: url
						},
					},
				],
			});
		}
	}

	// * marketData 캐싱 데이터삭제 (ui상 문제)
	useEffect(() => {
		return () => queryClient.removeQueries("marketData", { exact: true })
	}, [queryClient])

	// * listView 화면마다 다르게 높이설정
	useEffect(() => {
		if (isPastItem) {
			setListViewHeight("calc(100vh - 400px)")
		}
		else if (!isPastItem && date) {
			setListViewHeight("calc(100vh - 380px)")
		}
		else {
			setListViewHeight("calc(100vh - 280px)")
		}
	}, [])


	return (
		<>
			{marketQuery.isLoading ?
				<Slide>
					<EmptyDiv />
				</Slide>
				:
				<Slide>
					{React.Children.toArray([{ id: null, name: "전체" }, ...marketData]?.map((v, i) =>
						<div onClick={async () => {
							setSelectedIndex(i)
							setSelectedListIndex(-1)
							// * 마켓 클릭할때마다 새 데이터 호출
							if (i === 0) {
								marketMutation.mutate(null)
							}
							else {
								marketMutation.mutate(i - 1)
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
									marketColor={theme.color.main}
									name={i === 0 ? marketInfo[i].name : ""}
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
			<ListView style={{ height: listViewHeight }}  >
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
											React.Children.toArray(arrayItem.reviews.map((review, reviewIndex) =>
												<Review review={review} reviewIndex={reviewIndex} />
											))
										}
									</ListItem>
								</div>
							)
						})))
				}
			</ListView>
			{date &&
				<div style={{ position: "fixed", bottom: 0, width: "100%", maxWidth: 768, padding: "40px 0", backgroundColor: theme.color.grayscale.F5F5F5 }}>
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
	>div:last-child{
		@media screen and (max-width: 768px){
			margin-right: 10px;
		}
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

const ListView = styled.div`
	overflow: scroll;
	margin-top: 20px;
	padding-bottom:83px ;
	@media screen and (max-width: 768px){
		padding-bottom:0 ;
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