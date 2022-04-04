import Marketbutton from 'components/marketbutton'
import TopHeader from 'components/topHeader'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'

import kurlyImage from "assets/image/kurlyImage.png"
import cookatImage from "assets/image/cookatImage.png"
import emartImage from "assets/image/emartImage.png"
import roketImage from "assets/image/roketImage.png"
import naverImage from "assets/image/naverImage.png"
import etcImage from "assets/image/etcImage.png"
import downIcon from "assets/icon/downIcon.png"
import LongButton from 'components/longButton'

const url = window.location.href

function PastDetail() {
	const navigation = useNavigate()
	const params = useParams()

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

	const month = Number(params.id?.slice(5, 7))
	const date = Number(params.id?.slice(8, 10))

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
					{dummy.map((v, i) =>
						<div key={v.id} onClick={() => console.log("cc")}>
							<Marketbutton
								isClick={false}
								marketImage={kurlyImage}
								marketColor={theme.color.marketColor.kurly}
							/>
						</div>
					)}
				</Slide>
				<h1 style={{ marginTop: 20, marginBottom: 30, marginLeft: 20, fontSize: 16, fontWeight: "bold", color: theme.color.marketColor.cookat }}>
					쿠캣마켓
				</h1>
				<ListView>
					{["쿠캣마켓 명란젓"].map((v) =>
						<div key={v}>
							<span>
								{v}
							</span>
							<img src={downIcon} alt="downIcon" width={20} height={20} />
						</div>
					)}
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