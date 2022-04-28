import { getMarketProduct } from 'api/market'
import Review from 'components/marketListLayout/review'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import { modalState, popupState, tokenState } from 'recoil/atoms'
import ListItem from 'components/marketListLayout/listItem'
import axios from 'axios'
import { userLogout } from 'api/user'
import { useNavigate } from 'react-router-dom'
import Loading from 'components/loading'


interface MarketListLayoutProps {
	marketData: Array<{ id: number, name: string }>,
	date?: string,
	isPastItem?: boolean,
	searchKeyword?: string,
	isScroll?: boolean,
	setSearchLength?: (length: number) => void
}

function MarketListLayout({ isScroll, marketData, date, isPastItem = false, searchKeyword, setSearchLength }: MarketListLayoutProps) {
	const url = window.location.href
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [selectedListIndex, setSelectedListIndex] = useState(-1)
	const [marketInfo, setMarketInfo] = useState<Array<MarketInfoprops>>([])
	const token = useRecoilValue(tokenState)
	const setIspopupOpen = useSetRecoilState(popupState)
	const viewRef = useRef<HTMLDivElement>(null)
	const [topHeight, setTopHeight] = useState("")
	const [bottomPadding, setBottomPadding] = useState("")
	const [webBottomPadding, setWebBottomPadding] = useState("")
	const setToken = useSetRecoilState(tokenState)
	const userLogoutMutaion = useMutation(userLogout)
	const navigate = useNavigate()
	const setModal = useSetRecoilState(modalState)
	const slideWrapRef = useRef<HTMLDivElement>(null)

	const marketQuery = useQuery<Array<MarketProductType> | null, Error>("marketData", async () => {
		// * 검색후 나온 전체 리스트 데이터
		if (searchKeyword) {
			const queryData = await getSearchMarketData(null, searchKeyword, token)
			return queryData
		}

		// * 마켓 리스트 전체 리스트 데이터 
		else if (date) {
			const queryData = await getMarketProduct(null, date, isPastItem ? token : "")
			return queryData
		}

	}, {
		onSuccess: () => {

		},
		onError: (error) => {
			// * 로그인상태에서 토큰 만료되거나 없을시 토큰 삭제시키고 로그인 페이지로 이동
			if (axios.isAxiosError(error) && error.response) {
				console.log(error.response.data);
				if (error.response.data.detail === "Authentication credentials were not provided.") {
					setModal({
						okText: "로그인 하기",
						okButton: () => {
							navigate("/login")
							setToken("")
							userLogoutMutaion.mutate()
						},
						content: "로그인이 필요한 서비스입니다.\n로그인 하시겠어요?",
						isOpen: true
					})
				}
			}
		},
		// * 윈도우 포커스시 데이터가 전체리스트로 덮어씌우는거 방지
		refetchOnWindowFocus: false
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
		// * 지난 아이템
		if (isPastItem) {
			setTopHeight("140px")
			setBottomPadding("200px")
			setWebBottomPadding("280px")
		}
		// * 어제 아이템
		else if (!isPastItem && date) {
			setTopHeight("300px")
			setBottomPadding("410px")
			setWebBottomPadding("490px")
		}
		// * 검색 결과 아이템
		else {
			setTopHeight("200px")
			setBottomPadding("220px")
			setWebBottomPadding("295px")
		}
	}, [isScroll])

	// * 검색결과에서 상단 슬라이드 높이에따른 padding값 변경
	useLayoutEffect(() => {
		if (slideWrapRef.current?.clientHeight && !date) {
			setWebBottomPadding(`${slideWrapRef.current?.clientHeight + 129}px`)
		}
	}, [marketQuery.isLoading])

	useEffect(() => {
		if (setSearchLength && marketQuery.data) {
			setSearchLength(marketQuery.data.length)
		}
	}, [marketQuery.data])

	if (marketQuery.isLoading) {
		return (
			<Loading />
		)
	}

	return (
		<>
			<SlideWrap ref={slideWrapRef} topHeight={topHeight} style={isScroll ? { transform: "translateY(-180px)" } : {}}>
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
				</Slide>
				{marketInfo.length !== 0 &&
					<h1 style={{ paddingBottom: 10, marginTop: 20, marginLeft: 20, fontSize: 16, fontWeight: "bold", color: marketInfo[selectedIndex].color }}>
						{marketInfo[selectedIndex].name}
					</h1>
				}
			</SlideWrap>
			<ListView webBottom={webBottomPadding} bottom={bottomPadding} search={!isPastItem && !date} ref={viewRef}  >
				{(marketQuery.isLoading || !marketQuery.data) ?
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }} />
					:
					(marketQuery.data.length === 0 ?
						// * 빈 요일별 화면 (요일별 추천템 없을때)
						<div style={{ position: "absolute", top: isPastItem ? "50%" : "70%", width: "100%", maxWidth: 768, display: "flex", flexDirection: "column", alignItems: "center" }}>
							<img style={{ marginBottom: 10 }} src={grinningIcon} width={30} height={30} alt="grinningIcon" />
							<span style={{ color: theme.color.grayscale.C_4C5463 }}>
								{isPastItem ? `${date?.slice(4, 6)}월 ${date?.slice(6, 8)}일 추천템이 없어요` : "오늘은 추천템이 없어요"}
							</span>
						</div>
						:
						React.Children.toArray(marketQuery.data.map((arrayItem, arrayIndex) => {
							return (
								<ListItem

									list={arrayItem}
									listIndex={arrayIndex}
									selectedListIndex={selectedListIndex}
									setSelectedListIndex={(selectIndex: number) => setSelectedListIndex(selectIndex)} />
							)
						})))
				}
				{(date && marketQuery.data && marketQuery.data?.length !== 0) &&
					<div style={{ width: "100%", maxWidth: 768, padding: "40px 0", backgroundColor: theme.color.grayscale.F5F5F5 }}>
						<LongButton onClick={handleShareList} buttonStyle={{ color: theme.color.grayscale.C_4C5463 }} color={theme.color.grayscale.B7C3D4}>
							리스트 공유하기
						</LongButton>
					</div>
				}
			</ListView>
		</>
	)
}

const SlideWrap = styled.div<{ topHeight: string }>`
	position: fixed;
	width:100% ;
	top:${props => props.topHeight};
	@media screen and (max-width: 768px) {
		width: 100%;
	}
	max-width: 768px;
	z-index: 3;
	background-color: ${theme.color.grayscale.FFFFF};
	transition:all 0.3s ease-in-out;
`

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
`;

const ListView = styled.div<{ search: boolean, webBottom: string, bottom: string }>`
	padding-top:${props => props.webBottom};
	overflow: scroll;
	@media screen and (max-width: 768px){
		padding-top: ${props => props.bottom};
		padding-bottom:0 ;
	}
`;

export default MarketListLayout