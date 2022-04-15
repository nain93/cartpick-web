import TopHeader from 'components/topHeader'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'

import { useQuery } from 'react-query'
import { getMarketList } from 'api/market'
import MarketListLayout from 'components/marketListLayout'
import { useRecoilValue } from 'recoil'
import { tokenState } from 'recoil/atoms'
import { useEffect } from 'react'

function PastDetail() {
	const navigate = useNavigate()
	const params = useParams()
	const location = useLocation()
	const token = useRecoilValue(tokenState)

	const { data } = useQuery<Array<{ id: number, name: string }>, Error>("marketList", () => getMarketList())

	const month = Number(params.id?.slice(5, 7))
	const date = Number(params.id?.slice(8, 10))
	const paramDate = params.id?.replaceAll("-", "")

	useEffect(() => {
		// * 토큰 없이 공유하기로 넘어왔을떄 로그인 화면으로 리다이렉팅
		if (!token) {
			navigate("/login")
		}
	}, [])

	return (
		<Cotainer>
			<TopHeader backButton={() => {
				if (!!location.state) {
					navigate(-1)
				}
				else {
					navigate("/")
				}
			}}>
				{`${params.id} 추천템 리스트`}
			</TopHeader>
			<div style={{ padding: 20 }}>
				<Title>{month}월 {date}일의 추천템</Title>
				<Desc>
					<span style={{ fontWeight: "bold" }}>{month}월 {date}일</span> 에 올라온 추천템이에요
				</Desc>
			</div>
			{(data && paramDate) &&
				<MarketListLayout date={paramDate} marketData={data} isPastItem={true} />}
		</Cotainer>
	)
}

const Cotainer = styled.section`
	width: 100%;
	padding-top: 50px;
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

export default PastDetail