import React from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'
import LongButton from 'components/longButton'
import { useNavigate } from 'react-router-dom'
import { EventQueryType } from 'types/others'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { modalState, tokenState } from 'recoil/atoms'

interface EventPopupType {
	setIsEventOpen: (isOpen: boolean) => void;
}

function EventPopup({ setIsEventOpen, title, content, objectId, objectDate, winner, id }: EventPopupType & EventQueryType) {
	const navigate = useNavigate()
	const token = useRecoilValue(tokenState)
	const setModal = useSetRecoilState(modalState)

	const handlePopupClose = () => {
		localStorage.setItem("eventpopup", String(id))
		setIsEventOpen(false)
	}

	const handleGoItem = () => {
		if (!token) {
			setModal({
				okText: "로그인 하기",
				okButton: () => navigate("/login"),
				content: "로그인이 필요한 서비스입니다.\n로그인 하시겠어요?",
				isOpen: true
			})
		}
		else {
			navigate(`/list/${objectDate}?id=${objectId}`)
		}
		handlePopupClose()
	}

	return (
		<>
			<BackDrop />
			<Container>
				<ModalWrap>
					<ContentWrap>
						<h1>🎉 {title}</h1>
						<Content>
							<span style={{ fontSize: 16 }}>오늘의 맛도리 당첨</span>
							<span style={{ fontSize: 30, marginTop: 10, fontWeight: "bold" }}>{winner.replace((winner.slice(1, 2)), "*")}님</span>
							<span style={{ fontSize: 12, marginTop: 16, color: theme.color.grayscale.C_4C5463 }}>오픈카톡방에서 방장에게 연락주세요!</span>
						</Content>
						<ButtonWrap>
							<span>{content}</span>
							{/* {React.Children.toArray(tags?.map(v => <span>{v} </span>))} */}
							<LongButton onClick={handleGoItem}
								color={theme.color.main}
								buttonStyle={{ marginTop: 13, width: "100%", backgroundColor: theme.color.main, color: theme.color.grayscale.FFFFF }} >
								추천템 보러가기
							</LongButton>
						</ButtonWrap>
					</ContentWrap>
					<span onClick={handlePopupClose} style={{ color: theme.color.grayscale.F2F3F6, position: "absolute", bottom: -30, left: "calc(50% - 10px)" }}>닫기</span>
				</ModalWrap>
			</Container>
		</>
	)
}

const BackDrop = styled.div`
	position: absolute;
	z-index: 10;
	top:0;
	left:0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.4);
`

const Container = styled.div`
	position: absolute;
	top:0;
	display: flex;
	align-items: center;
	width: 100%;
	max-width: 768px;
	height: 100%;
`

const ModalWrap = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	z-index: 11;
	width: calc(100% - 40px);
	max-width:384px;
	margin: 0 auto;
	background-color: ${theme.color.grayscale.FFFFF};
	border-radius: 5px;
	padding: 20px 10px;
`

const ContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
	h1{
		margin-left: 3px;
		font-size: 26px;
		font-weight: bold;
	}
`

const Content = styled.div`
	margin-top: 15px;
	padding-bottom: 10px;
	display: flex;
	flex-direction: column;
	align-items:center;
	border-bottom: 1px solid ${theme.color.grayscale.DFE4EE};
	width: 100%;
`

const ButtonWrap = styled.div`
	width: 100%;
	text-align: center;
	padding-top: 20px;
`

export default EventPopup