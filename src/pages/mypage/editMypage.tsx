import TopHeader from 'components/topHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import defaultImg from "assets/image/defaultImage.png"
import plusIcon from "assets/icon/plusIcon.png"
import theme from 'styles/theme'
import UserInputForm from 'components/userInputForm'
import LongButton from 'components/longButton'
import { useEffect, useState } from 'react'
import { SignUpType, UserDataType } from 'types/user'

const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

function EditMypage() {
	const navigate = useNavigate()
	const location = useLocation()
	const { profileImage, nickname, household, job, market } = location.state as UserDataType
	const [input, setInput] = useState(nickname)
	const [titleErrorMsg, setTitleErrorMsg] = useState("")
	const [errorMsg, setErrorMsg] = useState({
		text: "",
		number: 0
	})
	const [signUpData, setSignUpData] = useState<SignUpType>({
		job,
		household,
		market: market.split("·")
	})
	const [marketOthers, setMarketOthers] = useState<Array<string>>([])


	useEffect(() => {
		if (!regex.test(input)) {
			setTitleErrorMsg("한글, 영문, 숫자만 입력해주세요")
		}
		else {
			setTitleErrorMsg("")
		}
	}, [input])

	return (
		<Container>
			<TopHeader backButton={() => navigate(-1)}>
				프로필 수정
			</TopHeader>
			<Title>
				<ProfileImg>
					<div style={{ position: "relative", zIndex: -1, width: 60, height: 60 }}>
						<img src={profileImage ? profileImage : defaultImg} style={{ borderRadius: 30 }} width={60} height={60} alt="defaultImg" />
						<img src={plusIcon} style={{ bottom: 0, right: 0, position: "absolute" }} width={15} height={15} alt="plusIcon" />
					</div>
				</ProfileImg>
				<Nickname errorMsg={titleErrorMsg}>
					<span style={{ fontSize: 12 }}>별명</span>
					<input value={input} name={input} onChange={e => setInput(e.target.value)} />
				</Nickname>
			</Title>
			<ErrorMsg>{titleErrorMsg}</ErrorMsg>
			<UserInputForm
				isEdit={true}
				errorMsg={errorMsg}
				marketOthers={marketOthers}
				setMarketOthers={(data: Array<string>) => setMarketOthers(data)}
				signUpData={signUpData}
				setSignUpData={(data: SignUpType) => setSignUpData(data)} />
			<div style={{ paddingBottom: 60 }}>
				<LongButton disabled={false} onClick={() => console.log("save")} buttonStyle={{ backgroundColor: theme.color.main, color: theme.color.grayscale.FFFFF }} color={theme.color.main}>
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
	padding: 20px 20px 0px 20px;
`

const ProfileImg = styled.div`
	display: flex;
	justify-content: center;
`

const Nickname = styled.div<{ errorMsg: string }>`
	margin-top: 40px;
	display: flex;
	flex-direction: column;
	input{
		padding:9.5px 0;
		color:${theme.color.grayscale.C_4C5463};
		margin-top: 24px;
		border-bottom:${props => `1px solid ${props.errorMsg ? theme.color.ErrorTextColor : theme.color.grayscale.DFE4EE}`} 
	}
`
const ErrorMsg = styled.span`
	position: absolute;
	left:20px;
	font-size: 12px;
	line-height: 2.33;
	color:${theme.color.ErrorTextColor}
`


export default EditMypage