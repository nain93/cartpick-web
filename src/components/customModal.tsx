import { useRecoilState, useSetRecoilState } from 'recoil'
import { modalState } from 'recoil/atoms'
import styled from 'styled-components'
import theme from 'styles/theme'

function CustomModal() {
	const [modal, setModal] = useRecoilState(modalState)
	return (
		<>
			<BackDrop onClick={() => setModal({ ...modal, isOpen: false })} />
			<Container>
				<ModalWrap>
					<Content>
						{modal.content}
					</Content>
					<div style={{ height: "100%" }}>
						<button style={{ color: theme.color.NegativeRed, height: "100%", width: "50%", borderRight: `1px solid ${theme.color.grayscale.F2F3F6}` }}>
							취소</button>
						<button style={{ color: theme.color.main, height: "100%", width: "50%", }}>
							탈퇴하기</button>
					</div>
				</ModalWrap>
			</Container>

		</>

	)
}

const BackDrop = styled.div`
	position: absolute;
	z-index: 1;
	top:0;
	left:0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.4);
`

const Container = styled.div`
	position: absolute;
	top:0;
	left:0;
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
`

const ModalWrap = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 2;
	width: calc(100% - 80px);
	margin: 0 40px;
	height: 150px;
	background-color: ${theme.color.grayscale.FFFFF};
	border-radius: 10px;
`

const Content = styled.div`
	text-align: center;
	border-bottom: 1px solid ${theme.color.grayscale.F2F3F6};
	padding: 30px; 
	color: ${theme.color.grayscale.C_4C5463};
	line-height: 1.43
`

export default CustomModal