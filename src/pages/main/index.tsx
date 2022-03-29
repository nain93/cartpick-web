import { useEffect, useState } from "react"
import styled from "styled-components"
import Slider from "react-slick";

import theme from "styles/theme"
import { dateSimpleFormat } from "utils"
import Marketbutton from "components/marketbutton"
import kurlyImage from "assets/image/kurlyImage.png"
import cookatImage from "assets/image/cookatImage.png"
import emartImage from "assets/image/emartImage.png"
import roketImage from "assets/image/roketImage.png"
import naverImage from "assets/image/naverImage.png"
import etcImage from "assets/image/etcImage.png"

function Main() {
	const [isClick, setIsClick] = useState<Array<{ isClick: boolean, image: string }>>([])
	const [dummy, setDummy] = useState([{
		id: 0,
		name: "마켓컬리"
	}, {
		id: 1,
		name: "SSG 이마트"
	}, {
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
	}])

	const settings = {
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};

	useEffect(() => {
		setIsClick(dummy.map((v) => {
			switch (v.name) {
				case "마켓컬리":
					return { isClick: false, image: kurlyImage }
				case "쿠팡 로켓프레시":
					return { isClick: false, image: roketImage }
				case "쿠캣마켓":
					return { isClick: false, image: cookatImage }
				case "네이버 쇼핑":
					return { isClick: false, image: naverImage }
				case "SSG 이마트":
					return { isClick: false, image: emartImage }
				case "기타(직접입력)":
					return { isClick: false, image: etcImage }
				default:
					return { isClick: false, image: etcImage }
			}
		}))
	}, [dummy])

	return (
		<Container>
			<Header>
				<TitleWrap>
					<h1 style={{ fontSize: 24, fontWeight: "700", marginBottom: 10 }}>오늘의 추천템</h1>
					<button style={{ color: theme.color.main }}>로그인</button>
				</TitleWrap>
				<span>
					<span style={{ fontWeight: "bold" }}>{dateSimpleFormat()}</span>
					에 나온 추천템이에요
				</span>
				<LastItemButton>{`지난 추천템 보기 >`}</LastItemButton>
			</Header>
			<Slider {...settings}>
				{dummy.map((v, i) =>
					<MarketButtonWrap key={v.id} onClick={() => {
						setIsClick(isClick.map((isClickV, isClickI) => {
							if (i === isClickI) {
								return { ...isClickV, isClick: true }
							}
							return { ...isClickV, isClick: false }
						}))
					}}>
						{isClick.length !== 0 &&
							<Marketbutton isClick={isClick[i].isClick} marketImage={isClick[i].image} marketColor={theme.color.marketColor.kurly} />}
					</MarketButtonWrap>
				)}
			</Slider>
		</Container>
	)
}

const Container = styled.section`
	padding: 20px;
`

const Header = styled.div`
	display: flex;
	flex-direction: column;
`

const TitleWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`

const LastItemButton = styled.span`
	font-size: 12px;
	margin-top: 5px;
	color: ${theme.color.grayscale.B7C3D4};
	text-decoration :underline ;
	cursor: pointer;
`

const MarketButtonWrap = styled.div`
`

export default Main