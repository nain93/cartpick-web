import TopHeader from 'components/topHeader'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import defaultImg from "assets/image/defaultImage.png"
import theme from 'styles/theme'
import LongButton from 'components/longButton'

function Mypage() {
	const navigate = useNavigate()
	return (
		<Container>
			<TopHeader backButton={() => navigate(-1)}>
				내 프로필
			</TopHeader>
			<MainWrap>
				<Title>
					<img src={defaultImg} style={{ marginRight: 20 }} alt="defaultImg" width={60} height={60} />
					<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
						<span style={{ color: theme.color.grayscale.C_4C5463 }}>
							카카오계정으로 로그인하셨어요!
						</span>
						<button style={{ color: theme.color.grayscale.B7C3D4, marginTop: 5, textDecoration: "underline" }}>
							로그아웃
						</button>
					</div>
				</Title>
				<MyInfo>
					<li>
						<span>별명</span>
						<span>배고픈강아지123</span>
					</li>
					<li>
						<span>직업</span>
						<span>직장인</span>
					</li>
					<li>
						<span>주거형태</span>
						<span>1인 가구</span>
					</li>
					<li>
						<span>자주 이용하는 마켓</span>
						<span>마켓컬리 · 쿠캣마켓</span>
					</li>
				</MyInfo>
			</MainWrap>
			<ButtonWrap>
				<LongButton buttonStyle={{ color: theme.color.main }} color={theme.color.main} onClick={() => navigate("/mypage/edit")}>
					프로필 수정
				</LongButton>
				<button style={{ color: theme.color.grayscale.B7C3D4, marginTop: 15, textDecoration: "underline" }}>
					회원 탈퇴</button>
				<button style={{ color: theme.color.grayscale.B7C3D4, margin: "auto 0 14px 0", textDecoration: "underline" }}>
					이용약관 및 개인정보처리방침
				</button>
			</ButtonWrap>
		</Container>
	)
}

const Container = styled.section`
	padding-top: 50px;
	height: calc(100vh - 320px);
`

const MainWrap = styled.div`
	padding: 20px;
`

const Title = styled.div`
	display: flex;
	align-items: center;
`

const MyInfo = styled.ul`
	margin-top: 40px;
	li{
		margin-bottom: 30px;
		span:first-child{
			min-width: 100px;
			font-size: 12px;
			font-weight: bold;
			margin-right:20px
		}
		span:last-child{
			text-align: right;
			color:${theme.color.grayscale.C_4C5463}
		}
		display: flex;
		justify-content: space-between;
	}
`

const ButtonWrap = styled.div`
	background-color: ${theme.color.grayscale.F5F5F5};
	padding-top: 40px;
	display: flex;
	flex-direction: column;
	height: 100%;
`

export default Mypage