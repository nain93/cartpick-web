import TopHeader from 'components/topHeader'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import defaultImg from "assets/image/defaultImage.png"
import theme from 'styles/theme'
import LongButton from 'components/longButton'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { modalState, tokenState } from 'recoil/atoms'
import { useQuery } from 'react-query'
import { getUserProfile } from 'api/user'
import { UserDataType } from 'types/user'

function Mypage() {
	const navigate = useNavigate()
	const setModal = useSetRecoilState(modalState)
	const [token, setToken] = useRecoilState(tokenState)
	const { data } = useQuery<UserDataType, Error>("userData", () => getUserProfile(token))

	const handleDeleteModal = () => {
		setModal({
			okText: "탈퇴하기",
			okButton: () => {
				// todo 탈퇴하기 api
				localStorage.removeItem("token")
				setToken("")
				navigate("/")
			},
			content: "탈퇴시 모든 정보는 저장되지 않습니다.\n정말 탈퇴하시겠어요?",
			isOpen: true
		})
	}

	const handleLogout = () => {
		setModal({
			okText: "로그아웃",
			okButton: () => {
				localStorage.removeItem("token")
				setToken("")
				navigate("/")
			},
			content: "정말 로그아웃 하시겠습니까?",
			isOpen: true
		})
	}

	return (
		<Container>
			<TopHeader backButton={() => navigate(-1)}>
				내 프로필
			</TopHeader>
			<MainWrap>
				<Title>
					<img src={data?.profileImage ? data.profileImage : defaultImg} style={{ marginRight: 20, borderRadius: 30 }} alt="defaultImg" width={60} height={60} />
					<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
						<span style={{ color: theme.color.grayscale.C_4C5463 }}>
							카카오계정으로 로그인하셨어요!
						</span>
						<button onClick={handleLogout} style={{ color: theme.color.grayscale.B7C3D4, marginTop: 5, textDecoration: "underline" }}>
							로그아웃
						</button>
					</div>
				</Title>
				<MyInfo>
					<li>
						<span>별명</span>
						<span>{data?.nickname}</span>
					</li>
					<li>
						<span>직업</span>
						<span>{data?.job}</span>
					</li>
					<li>
						<span>주거형태</span>
						<span>{data?.household}</span>
					</li>
					<li>
						<span>자주 이용하는 마켓</span>
						<span>{data?.market}</span>
					</li>
				</MyInfo>
			</MainWrap>
			<ButtonWrap>
				<LongButton buttonStyle={{ color: theme.color.main }} color={theme.color.main}
					onClick={() => navigate("/mypage/edit", { state: data })}>
					프로필 수정
				</LongButton>
				<div style={{ textAlign: "center", marginTop: 15 }}>
					<button onClick={handleDeleteModal} style={{ color: theme.color.grayscale.B7C3D4, textDecoration: "underline" }}>
						회원 탈퇴
					</button>
				</div>
				<div style={{ textAlign: "center", margin: "auto 0 14px 0", }}>
					<button style={{ color: theme.color.grayscale.B7C3D4, textDecoration: "underline" }}>
						이용약관 및 개인정보처리방침
					</button>
				</div>
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