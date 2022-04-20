import styled, { CSSProperties } from 'styled-components'

function AlertPopup({ popupStyle, children }: { popupStyle: CSSProperties, children: string }) {
	return (
		<Container style={{ ...popupStyle }}>
			<div>
				{children}
			</div>
		</Container>
	)
}

const Container = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	bottom:20%;
	max-width: 768px;
	width: 100%;
	z-index: 999;
	transition: all ease-in-out 0.3s;
	div{
		font-size: 12px;
		padding: 10px 40px;
		text-align: center;
		border-radius: 20px;
		background-color: rgba(0,0,0,0.8);
		color:white;
		margin: 0 auto;
	}
`

export default AlertPopup