import React, { useState } from 'react'
import TopHeader from 'components/topHeader'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'
import rightIcon from "assets/icon/rightIcon.png"
import { datebarFormat } from 'utils'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { modalState, popupState, tokenState } from 'recoil/atoms'
import LongButton from 'components/longButton'


function PastItemList() {
	const formatDate = new Date();
	let month: number = formatDate.getMonth() + 1;
	let hour: number = formatDate.getHours()
	const navigate = useNavigate()
	const setModal = useSetRecoilState(modalState)
	const token = useRecoilValue(tokenState)
	const setIspopupOpen = useSetRecoilState(popupState)
	const [lastList, setLastList] = useState<Array<string>>(datebarFormat())
	const [monthState, setMonthstate] = useState<number>(month)

	const handleGotoPastItem = ({ date, index }: { date: string, index?: number }) => {
		if (token || (index === 1 && hour > 18)) {
			navigate(`/list/${date}`, { state: { ispastItem: true } })
		}
		else {
			setModal({
				okText: "로그인 하기",
				okButton: () => navigate("/login"),
				content: "로그인이 필요한 서비스입니다.\n로그인 하시겠어요?",
				isOpen: true
			})
		}
	}

	// * 요일별 추천템 리스트 더 불러오기
	const handleLoadMoreDate = () => {
		if ((monthState - 1) === 1) {
			setIspopupOpen({ isOpen: true, content: "마지막 추천템 리스트입니다" })
			return
		}
		setMonthstate(prev => prev - 1)
		let day = 0

		if ((monthState - 1) % 2 === 1) {
			day = 31
		}
		else if ((monthState - 1) === 2) {
			day = 28
		}
		else {
			day = 30
		}

		const list = []
		while (day > 0) {
			list.push(formatDate.getFullYear() + '-' + ((monthState - 1) >= 10 ? (monthState - 1) : '0' + (monthState - 1)) + '-' + (day >= 10 ? day : '0' + day))
			day = day - 1
			if ((monthState - 1) === 2 && day === 22) {
				break;
			}
		}
		setLastList(lastList.concat(list))
	}

	return (
		<Container>
			<TopHeader searchButton={true}>
				추천템 더보기
			</TopHeader>
			<MainWrap>
				<Title>
					카톡방 추천템 모음
				</Title>
				<Desc>
					카톡방의 후기를 매일 매일 모았어요.<br /><span style={{ fontWeight: "bold" }}>매일 밤 9시 30분,</span> 새로운 추천템이 업데이트됩니다.
				</Desc>
				<ListView>
					{React.Children.toArray(lastList.map((listDate, i) => {
						if (i === 0) {
							return (
								<Link to={"/"}>
									<div style={{ display: "flex", position: "relative", minWidth: 155, justifyContent: "center" }}>
										<span>
											{listDate}
										</span>
										<span style={{ marginLeft: "auto" }}>
											추천템 리스트
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
								<div onClick={() => handleGotoPastItem({ date: listDate, index: i })} style={{ cursor: "pointer" }}>
									<div style={{ display: "flex", minWidth: 155, fontSize: 14 }}>
										<span>
											{listDate}
										</span>
										<span style={{ marginLeft: "auto" }}>
											추천템 리스트
										</span>
									</div>
									<img src={rightIcon} alt="rightIcon" width={20} height={20} />
								</div>
							)
						}
					})
					)}
					<LongButton onClick={handleLoadMoreDate} buttonStyle={{ color: theme.color.main, width: "100%", marginTop: 40 }} color={theme.color.main}>
						계속 보기
					</LongButton>
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
	padding:0 20px;
`

const MainWrap = styled.div`
	padding: 20px 0;
	display: flex;
	flex-direction: column;
	height: calc(100vh - 50px);
`

const Desc = styled.span`
 	line-height: 1.43;
	padding:0 20px;
	color:${theme.color.grayscale.C_4C5463};
`

const ListView = styled.div`
	overflow: scroll;
	margin-top: 35.5px;
	padding:0 20px;
	>a,>div:not(:last-child){
		padding:14.5px 0;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		border-bottom: 1px solid ${theme.color.grayscale.F2F3F6};
		span{
			color:${theme.color.grayscale.C_4C5463}
		}
	}
`

export default PastItemList