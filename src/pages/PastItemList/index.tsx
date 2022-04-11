import React from 'react'
import TopHeader from 'components/topHeader'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'
import rightIcon from "assets/icon/rightIcon.png"
import { datebarFormat } from 'utils'

const lastList = datebarFormat()

function PastItemList() {
	const navigate = useNavigate()

	return (
		<Container>
			<TopHeader backButton={() => navigate(-1)} searchButton={true}>
				추천템 더보기
			</TopHeader>
			<MainWrap>
				<Title>
					지난 추천템 모음
				</Title>
				<Desc>
					카톡방의 후기를 매일 매일 모았어요.<br /><span style={{ fontWeight: "bold" }}>매일 밤 9시,</span> 새로운 추천템이 업데이트됩니다.
				</Desc>
				<ListView>
					{React.Children.toArray(lastList.map((v, i) => {
						if (i === 0) {
							return (
								<Link to={"/"}>
									<div style={{ display: "flex", position: "relative", minWidth: 155, justifyContent: "center" }}>
										<span>
											{v}
										</span>
										<span style={{ marginLeft: "auto" }}>
											&nbsp;추천템 리스트
										</span>
										<span
											style={{ position: "absolute", right: -40, fontWeight: "bold", marginLeft: 5, color: theme.color.main }}>
											NEW</span>
									</div>
									<img src={rightIcon} alt="rightIcon" width={20} height={20} />
								</Link>
							)
						}
						else {
							return (
								<Link to={`/pastItemList/${v}`}>
									<div style={{ display: "flex", minWidth: 155 }}>
										<span>
											{v}
										</span>
										<span style={{ marginLeft: "auto" }}>
											&nbsp;추천템 리스트
											{i === 0 &&
												<span
													style={{ fontWeight: "bold", marginLeft: 5, color: theme.color.main }}>
													NEW</span>
											}
										</span>
									</div>
									<img src={rightIcon} alt="rightIcon" width={20} height={20} />
								</Link>
							)
						}
					})
					)}
				</ListView>
			</MainWrap>
		</Container >
	)
}

const Container = styled.section`
	width: 100%;
	padding-top: 50px;
`

const Title = styled.h1`
	font-size: 24px;
	line-height: 1.25;
	font-weight: bold;
	margin-top: 8.5px;
	margin-bottom: 6px;
`

const MainWrap = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	height: calc(100vh - 50px);
`

const Desc = styled.span`
 	line-height: 1.43;
	color:${theme.color.grayscale.C_4C5463};
`

const ListView = styled.div`
	overflow: scroll;
	margin-top: 35.5px;
	>a{
		padding:14.5px 0;
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

export default PastItemList