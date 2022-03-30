import { useState } from "react"
import styled from "styled-components"

import theme from "styles/theme"
import LongButton from "components/longButton"
import leftarrowIcon from "assets/icon/leftarrowIcon.png"
import rightIcon from "assets/icon/rightIcon.png"

function Past() {


	return (
		<>
			<Container>
				<Header>
					<TitleWrap>
						<img className="icon0" alt="leftarrowIcon" src={leftarrowIcon} />
						<div className="label0 label1">추천템 더보기</div>
					</TitleWrap>
					<div className="text0 text1">{`지난 추천템 모음`}</div>
					<div className="text0 text2">카톡방의 후기를 매일 매일 모았어요.<br /><span className="font_bold">매일 밤 9시</span>, 새로운 추천템이 업데이트됩니다.</div>
				</Header>
				<MainWrap>
					<ListView>
						{
							Array.from([
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},
								{
									idx: 1,
									title: "2022-03-18 추천템 리스트",
									description: "",
									tag: 3
								},

							])
								.map((arrayItem, arrayIndex) => {
									return (
										<div key={`listitem_` + arrayIndex}>
											<ListItem
											>
												<div className="text1">
													<span
														style={{
															color: theme.color.grayscale.C_4C5463,
														}}
													>
														{arrayItem.title}
														<span className="font_active" style={{ marginLeft: 8 }}>NEW</span>
													</span>
												</div>
												<img src={rightIcon} style={{ objectFit: "cover", }} width={20} height={20} alt="rightIcon" />
											</ListItem>
										</div>

									)
								})
						}
					</ListView>
				</MainWrap>
				<div style={{ padding: "40px 0", }}>
					<LongButton
						onClick={() => console.log("click")}
						buttonStyle={{ color: theme.color.main }}
						color={theme.color.main}
					>
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
	.font_bold {
		font-weight : 700;
	}
	.font_active {
		color : #7857ff;
	}

`

const Header = styled.section`
	display: flex;
	flex-direction: column;
	padding: 20px;

    .text1 {
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.25;
        letter-spacing: -0.6px;
        text-align: left;
        color: #000;
        margin-top: 28.5px;
    }
    .text2 {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: -0.35px;
        text-align: left;
        color: #4c5463;
        margin-top: 6px;
    }
`

const TitleWrap = styled.div`
	display: flex;
	align-items: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #f2f3f6;
    position: relative;

    .icon0 {
        width: 18px;
        height: 18px;
        object-fit: contain;
        position: absolute;

        margin-left: 20px;
    }
    .label0 {
        margin-left: auto;
        margin-right: auto;
    }
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
	position: relative;

	>div:first-child{
		display: flex;
		align-items: center;
		width: calc(100% - 40px);
		word-break: break-word;
	}
	.text1 {
		width: calc(100% - 140px);
		margin-left: 20px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        text-align: left;
        color: #4c5463;
	}
	
	img{
		position: absolute;
		right: 20px;
		top: 20px;
	}
	
	flex-wrap: wrap;
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

export default Past