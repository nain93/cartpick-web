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
import { useMutation, useQueryClient } from 'react-query'
import { editUserProfile } from 'api/user'
import { useCookies } from 'react-cookie'
import { MarketErrorType } from 'types/market'

const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

function EditMypage() {
	const navigate = useNavigate()
	const location = useLocation()
	const { profileImage, nickname, household, job, market, otherMarket } = location.state as UserDataType
	const [nicknameInput, setNickNameInput] = useState(nickname)
	const [titleErrorMsg, setTitleErrorMsg] = useState("")
	const [inputErrorMsg, setInputErrorMsg] = useState("")

	const [signUpData, setSignUpData] = useState<SignUpType>({
		job,
		household,
		market: market.split("·"),
		otherMarket
	})
	const [cookie] = useCookies(["token"])
	const [marketOthers, setMarketOthers] = useState<Array<string>>([])

	const queryClient = useQueryClient()
	const userMutation = useMutation((userData: SignUpType) => editUserProfile(cookie.token, userData), {
		onSuccess: () => {
			queryClient.invalidateQueries("userData")
		}
	})

	useEffect(() => {
		if (!regex.test(nicknameInput)) {
			setTitleErrorMsg("한글, 영문, 숫자만 입력해주세요")
		}
		else {
			setTitleErrorMsg("")
		}
	}, [nicknameInput])

	const handleEditProfile = () => {
		if (nicknameInput === "") {
			setTitleErrorMsg("내용을 입력해주세요")
			return
		}

		if (signUpData.job === "" || signUpData.market.concat(marketOthers).length === 0) {
			setInputErrorMsg("비어있는 내용을 입력해주세요")
			return
		}

		userMutation.mutate({
			nickname: nicknameInput,
			job: signUpData.job,
			household: signUpData.household,
			market: signUpData.market.concat(marketOthers)
		})
	}

	return (
		<Container>
			<TopHeader backButton={() => navigate(-1)}>
				프로필 수정
			</TopHeader>
			<Title>
				<ProfileImg>
					<div style={{ position: "relative", zIndex: -1, width: 60, height: 60 }}>
						<img src={profileImage ? profileImage : defaultImg} style={{ borderRadius: 30 }} width={60} height={60} alt="defaultImg" />
						{/* todo profile사진 수정기능 추가후 주석해제 */}
						{/* <img src={plusIcon} style={{ bottom: 0, right: 0, position: "absolute" }} width={15} height={15} alt="plusIcon" /> */}
					</div>
				</ProfileImg>
				<Nickname errorMsg={titleErrorMsg}>
					<span style={{ fontSize: 12 }}>별명</span>
					<input value={nicknameInput} name={nicknameInput} onChange={e => setNickNameInput(e.target.value)} />
				</Nickname>
			</Title>
			<ErrorMsg>{titleErrorMsg}</ErrorMsg>
			<UserInputForm
				isEdit={true}
				marketOthers={marketOthers}
				setMarketOthers={(data: Array<string>) => setMarketOthers(data)}
				signUpData={signUpData}
				setSignUpData={(data: SignUpType) => setSignUpData(data)} />
			{inputErrorMsg &&
				<ErrorMsg>{inputErrorMsg}</ErrorMsg>}
			<div style={{ paddingBottom: 60 }}>
				<LongButton disabled={false} onClick={handleEditProfile} buttonStyle={{ marginTop: 60, backgroundColor: theme.color.main, color: theme.color.grayscale.FFFFF }} color={theme.color.main}>
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