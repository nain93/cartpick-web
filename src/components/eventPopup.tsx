import React from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'
import partyIcon from "assets/icon/partyIcon.png"
import LongButton from 'components/longButton'

interface EventPopupType {
	isEventOpen: boolean;
	setIsEventOpen: (isOpen: boolean) => void;
}

function EventPopup({ isEventOpen, setIsEventOpen }: EventPopupType) {

	const handlePopupClose = () => {
		localStorage.setItem("eventpopup", JSON.stringify(false))
		setIsEventOpen(false)
	}

	return (
		<>
			<BackDrop />
			<Container>
				<ModalWrap>
					<ContentWrap>
						<h1>🎉 축하드려요!</h1>
						<Content>
							<span style={{ fontSize: 16 }}>오늘의 맛도리 당첨</span>
							<span style={{ fontSize: 30, marginTop: 5, fontWeight: "bold" }}>ㅇㅇㅇ님</span>
							<span style={{ fontSize: 12, marginTop: 16, color: theme.color.grayscale.C_4C5463 }}>오픈카톡방에서 방장에게 연락주세요!</span>
						</Content>
						<ButtonWrap>
							<span>오늘의 선물 : #감자빵 #촉촉 #존맛</span>
							<LongButton onClick={() => console.log("click")}
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