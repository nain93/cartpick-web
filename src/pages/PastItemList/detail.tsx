import Marketbutton from 'components/marketbutton'
import TopHeader from 'components/topHeader'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'

import kurlyImage from "assets/image/kurlyImage.png"
import cookatImage from "assets/image/cookatImage.png"
import emartImage from "assets/image/emartImage.png"
import roketImage from "assets/image/roketImage.png"
import naverImage from "assets/image/naverImage.png"
import wingItImage from "assets/image/wingItImage.png"
import oasisImage from "assets/image/oasisImage.png"
import etcImage from "assets/image/etcImage.png"
import downIcon from "assets/icon/downIcon.png"
import grinningIcon from "assets/icon/grinningIcon.png"
import LongButton from 'components/longButton'
import { useQuery } from 'react-query'
import { getMarketList, getMarketProduct } from 'api/market'
import { MarketInfoprops, MarketProductType } from 'types/market'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const url = window.location.href

function PastDetail() {
	const navigation = useNavigate()
	const params = useParams()
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [marketInfo, setMarketInfo] = useState<Array<MarketInfoprops>>([])
	const [marketProduct, setMarketProduct] = useState<Array<MarketProductType>>([])
	const { data } = useQuery<Array<{ id: number, name: string }>, Error>("marketList", () => getMarketList())

	const month = Number(params.id?.slice(5, 7))
	const date = Number(params.id?.slice(8, 10))

	const paramDate = params.id?.replaceAll("-", "")
	const [cookie] = useCookies(["token"])

	useEffect(() => {
		if (data) {
			setMarketInfo(data.map((v) => {
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
	}, [data])

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
			if (data && paramDate) {
				try {
					const firstProductData = await getMarketProduct(data[0].id, paramDate, cookie.token)
					if (firstProductData) {
						setMarketProduct(firstProductData)
					}
				}
				catch (e) {
					if (axios.isAxiosError(e) && e.response) {
						console.log((e.response?.data));
					}
				}
			}
		}
		getMarket()
	}, [])

	return (
		<Cotainer>
			<TopHeader backButton={() => navigation(-1)}>
				{`${params.id} 추천템 리스트`}
			</TopHeader>
			<MainWrap>
				<div style={{ padding: 20 }}>
					<Title>{month}월 {date}일의 추천템</Title>
					<Desc>
						<span style={{ fontWeight: "bold" }}>{month}월 {date}일</span> 에 올라온 추천템이에요
					</Desc>
				</div>
				<Slide>
					{data?.map((v, i) =>
						<div key={v.id} onClick={async () => {
							setSelectedIndex(i)
							// * 마켓 클릭할때마다 새 데이터 호출
							if (paramDate) {
								const marketProduct = await getMarketProduct(data[selectedIndex].id, paramDate, cookie.token)
								if (marketProduct) {
									setMarketProduct(marketProduct)
								}
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
				{marketInfo.length !== 0 &&
					<h1 style={{ marginTop: 20, marginBottom: 30, marginLeft: 20, fontSize: 16, fontWeight: "bold", color: marketInfo[selectedIndex].color }}>
						{marketInfo[selectedIndex].name}
					</h1>
				}
				<ListView>
					{
						marketProduct.length === 0 ?
							<div style={{ border: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
								<img style={{ marginBottom: 10 }} src={grinningIcon} width={30} height={30} alt="grinningIcon" />
								<span style={{ color: theme.color.grayscale.C_4C5463 }}>지난 추천템이 없어요</span>
							</div> :
							React.Children.toArray(marketProduct.map((v) =>
								<div>
									<span>
										{v}
									</span>
									<img src={downIcon} alt="downIcon" width={20} height={20} />
								</div>
							))}
				</ListView>
				<div style={{ marginTop: "auto", padding: "40px 0", backgroundColor: theme.color.grayscale.F5F5F5 }}>
					<LongButton onClick={handleShareList} color={theme.color.grayscale.B7C3D4} buttonStyle={{ color: theme.color.grayscale.B7C3D4 }}>
						리스트 공유하기
					</LongButton>
				</div>
			</MainWrap>
		</Cotainer>
	)
}

const Cotainer = styled.section`
	width: 100%;
	padding-top: 50px;
`

const MainWrap = styled.div`
	display: flex;
	flex-direction: column;
	height: calc(100vh - 50px);
`

const Title = styled.h1`
	margin-top: 8.5px;
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 6px;
`

const Desc = styled.span`
  line-height: 1.43;
  color:${theme.color.grayscale.C_4C5463};
`

const Slide = styled.div`
	>div:first-child{
		margin-left: 20px;
	}
	>div:last-child{
		margin-right: 20px;
	}
	display: flex;
	overflow-x: scroll;
	margin-top: 20px;
`;

const ListView = styled.div`
	overflow: scroll;
	>div{
		padding:14.5px 0;
		margin:0 20px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid ${theme.color.grayscale.F2F3F6};
		span{
			color:${theme.color.grayscale.C_4C5463}
		}
	}
`

export default PastDetail