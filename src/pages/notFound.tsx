import styled from "styled-components"
import grinningIcon from "assets/icon/grinningIcon.png"
import { useNavigate } from "react-router-dom"
import theme from "styles/theme"

function NotFound() {
	const navigate = useNavigate()
	return (
		<Container>
			<div>
				<span>문제가 발생했습니다</span>
				<img style={{ marginTop: 20, marginBottom: 20 }} src={grinningIcon} width={30} height={30} alt="grinningIcon" />
			</div>
			<div>
				<button onClick={() => navigate("/")} >홈으로 이동</button>
			</div>
		</Container>
	)
}

const Container = styled.section`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	>div{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	button{
		border-radius: 5px;
		padding: 5px 10px;
		background-color:${theme.color.main};
		color:white;
	}
`

export default NotFound