import TopHeader from 'components/topHeader'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import defaultImg from "assets/image/defaultImage.png"
import plusIcon from "assets/icon/plusIcon.png"
import theme from 'styles/theme'
import UserInputForm from 'components/userInputForm'
import LongButton from 'components/longButton'

function EditMypage() {
	const navigate = useNavigate()

	return (
		<Container>
			<TopHeader backButton={() => navigate(-1)}>
				프로필 수정
			</TopHeader>
			<Title>
				<ProfileImg>
					<div style={{ position: "relative", zIndex: -1, width: 60, height: 60 }}>
						<img src={defaultImg} width={60} height={60} alt="defaultImg" />
						<img src={plusIcon} style={{ bottom: 0, right: 0, position: "absolute" }} width={15} height={15} alt="plusIcon" />
					</div>
				</ProfileImg>
				<Nickname>
					<span style={{ fontSize: 12 }}>별명</span>
					<input value="배고픈강아지123" />
				</Nickname>
			</Title>
			<UserInputForm />
			<div style={{ paddingBottom: 60 }}>
				<LongButton onClick={() => console.log("save")} buttonStyle={{ backgroundColor: theme.color.main, color: theme.color.grayscale.FFFFF }} color={theme.color.main}>
					프로필 저장
				</LongButton>
				<LongButton onClick={() => navigate(-1)} buttonStyle={{ marginTop: 10, color: theme.color.grayscale.C_4C5463 }} color={theme.color.grayscale.B7C3D4}>
					취소
				</LongButton>
			</div>
		</Container>
	)
}

const Container = styled.section`
	padding-top: 50px;
	width: 100%;
`

const Title = styled.div`
	padding: 20px;
`

const ProfileImg = styled.div`
	display: flex;
	justify-content: center;
`

const Nickname = styled.div`
	margin-top: 40px;
	display: flex;
	flex-direction: column;
	input{
		padding:9.5px 0;
		color:${theme.color.grayscale.C_4C5463};
		margin-top: 24px;
		border-bottom: 1px solid ${theme.color.grayscale.DFE4EE};
	}
`

const MainWrap = styled.div`
`


export default EditMypage