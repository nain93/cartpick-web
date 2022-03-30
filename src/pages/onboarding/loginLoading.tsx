import styled from 'styled-components'
import theme from 'styles/theme'
import loadingGif from "assets/gif/loading.gif"

function LoginLoading() {
	return (
		<Container>
			<span>가입이 완료되었습니다.</span>
			<h1><span>배고픈강아지</span>님<br />환영해요!</h1>
			<img src={loadingGif} style={{ marginBottom: 10 }} width={30} height={30} alt="loading" />
			<span style={{ color: theme.color.grayscale.C_4C5463 }}>추천템 잔뜩 불러오는 중</span>
		</Container>
	)
}

const Container = styled.section`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	h1{
		letter-spacing: normal;
		margin-top: 30px;
		margin-bottom: 100px;
		line-height: 1.39;
		font-weight: bold;
		font-size: 36px;
		span{
			color:${theme.color.main}
		}
	}
`

export default LoginLoading