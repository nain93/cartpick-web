import React from 'react'
import styled from 'styled-components'
import theme from 'styles/theme'
import loadingGif from "assets/gif/loading.gif"

function Loading() {
	return (
		<Container>
			<img src={loadingGif} style={{ marginBottom: 10 }} width={30} height={30} alt="loading" />
			<span style={{ color: theme.color.grayscale.C_4C5463 }}>추천템 잔뜩 불러오는 중</span>
		</Container>
	)
}

const Container = styled.section`
	position: absolute;
	width: 100%;
	max-width: 768px;
	top:50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export default Loading