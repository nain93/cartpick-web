import React from 'react'
import styled from 'styled-components'

function EventPopup() {
	return (
		<Container>EventPopup</Container>
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

export default EventPopup