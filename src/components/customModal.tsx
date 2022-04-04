import React from 'react'
import { useRecoilState } from 'recoil'
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
						{React.Children.toArray(modal.content.split("\n").map(text => (
							<>
								{text}
								<br />
							</>
						)))}
					</Content>
					<div style={{ height: "100%" }}>
						<button
							onClick={() => setModal({ ...modal, isOpen: false })}
							style={{ color: theme.color.NegativeRed, height: "100%", width: "50%", borderRight: `1px solid ${theme.color.grayscale.F2F3F6}` }}>
							취소</button>
						<button
							onClick={modal.okButton}
							style={{ color: theme.color.main, height: "100%", width: "50%", }}>
							{modal.okText}</button>
					</div>
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
	flex-direction: column;
	z-index: 11;
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