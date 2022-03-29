import { useEffect, useState } from "react"
import styled from "styled-components"

import theme from "styles/theme"
import { dateSimpleFormat } from "utils"
import Marketbutton from "components/marketbutton"
import kurlyImage from "assets/image/kurlyImage.png"
import cookatImage from "assets/image/cookatImage.png"
import emartImage from "assets/image/emartImage.png"
import roketImage from "assets/image/roketImage.png"
import naverImage from "assets/image/naverImage.png"
import etcImage from "assets/image/etcImage.png"
import LongButton from "components/LongButton"
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
						<div style={{ fontSize: 24, fontWeight: "bold", lineHeight: 1.25 }}>로그인</div>
						<button style={{ color: theme.color.main }}>로그인</button>
					</TitleWrap>
					<span>
						<span style={{ fontWeight: "bold" }}>{dateSimpleFormat()}</span>
						에 나온 추천템이에요
					</span>
					<LastItemButton>{`지난 추천템 보기 >`}</LastItemButton>
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
						<h1 style={{ fontSize: 16, fontWeight: "bold", color: marketInfo[selectedIndex].color }}>{marketInfo[selectedIndex].name}</h1>}
					<ListView>
                        {
                            Array.from([
                                {
                                    idx: 1,
                                    title: "[단백질과자점] 단백질 쿠키 프로틴 사브레 충분히 길어졌을때3종",
                                    description: "",
                                    tag : 3
                                },
                                {
                                    idx: 2,
                                    title: "[창억]호박인절미",
                                    description: "",
                                    tag : 11
                                },
                                {
                                    idx: 3,
                                    title: "[네떼] 간편 양상추",
                                    description: "",
                                    tag : 3
                                },
                                
                            ])
                            .map((arrayItem, arrayIndex)=> {
                                return (
                                    <div key={`listitem_` + arrayIndex}>
                                        <ListItem
                                            onClick={()=> {
                                                setSelectedListIndex(arrayIndex);
                                            }}
                                        >
                                        <div>
                                            <span style={{ fontSize: 16, lineHeight: 1.5, color: theme.color.grayscale.C_4C5463 }}>
                                                {arrayItem.title}
                                                <Tag>{arrayItem.tag}</Tag>
                                            </span>
                                        </div>
                                        <img src={downIcon} style={{ objectFit: "cover", }} width={20} height={20} alt="downIcon" />
                                        </ListItem>
                                        {
                                            selectedListIndex == arrayIndex &&

                                            <ListMore>
                                            </ListMore>
                                        }
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
`

const Header = styled.section`
	display: flex;
	flex-direction: column;
	padding: 20px;
`

const TitleWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`

const LastItemButton = styled.span`
	line-height: 2;
	font-size: 12px;
	margin-top: 5px;
	color: ${theme.color.grayscale.B7C3D4};
	text-decoration :underline ;
	cursor: pointer;
`

const Slide = styled.div`
	>div:first-child{
		margin-left: 10px;
	}
	display: flex;
	overflow: scroll;
	margin-top: 20px;
`


const MainWrap = styled.section`
	padding: 20px 20px 0px 20px;
`

const ListView = styled.div`
	overflow: scroll;
	height: calc(100vh - 370px);
	margin-top: 15.5px;
`


const ListItem = styled.div`
	cursor: pointer;
	min-height: 53px;
	border-bottom: 1px solid ${theme.color.grayscale.F2F3F6};
	display: flex;
	align-items: center;
	padding:14.5px 0;
	>div:first-child{
		display: flex;
		align-items: center;
		width: calc(100% - 40px);
		word-break: break-word;
	}
	
	img{
		margin-left: auto;
	}
`
const ListMore = styled.div`
    display: flex;
    align-items: center;

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
`

export default Main