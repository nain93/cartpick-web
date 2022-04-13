import TopHeader from 'components/topHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'

import { useState } from 'react'
import LongButton from 'components/longButton'
import LoginLoading from './loginLoading'
import UserInputForm from 'components/userInputForm'
import axios from 'axios'
import { baseURL } from 'api'
import { useCookies } from 'react-cookie'
import { useSetRecoilState } from 'recoil'
import { tokenState } from 'recoil/atoms'
import { useQuery } from 'react-query'
import { getUserProfile } from 'api/user'
import { SignUpType } from 'types/user'
import { MarketErrorType } from 'types/market'


interface UserDataProps {
	email: string,
	kakaoCode: number,
	nickname: string,
	profileImage: string
}


function Onboarding() {
	const location = useLocation()
	const navigate = useNavigate()
	const [cookies, setCookie] = useCookies(['token']);
	const [errorMsg, setErrorMsg] = useState<MarketErrorType>({
		text: "",
		type: "job"
	})
	const [loginLoading, setLoginLoading] = useState(false)
	const [signUpData, setSignUpData] = useState<SignUpType>({
		job: "",
		household: "",
		market: []
	})
	const [marketOthers, setMarketOthers] = useState<Array<string>>([])
	const setToken = useSetRecoilState(tokenState)
	const userQuery = useQuery<UserDataProps, Error>("userData", () => getUserProfile(cookies.token))

	const handleSignIn = async () => {
		if (signUpData.job === "") {
			setErrorMsg({
				text: "해당하는 항목을 선택해주세요",
				type: "job"
			})
			return
		}
		if (signUpData.household === "") {
			setErrorMsg({
				text: "해당하는 항목을 선택해주세요",
				type: "household"
			})
			return
		}
		if (signUpData.market.concat(marketOthers).length === 0) {
			setErrorMsg({
				text: "해당하는 항목을 선택해주세요",
				type: "market"
			})
			return
		}

		const state = location.state as UserDataProps

		const { email, kakaoCode, nickname, profileImage } = state

		try {
			const res = await axios.post(`${baseURL}auth/signup/`, {
				email,
				kakaoCode,
				nickname,
				profileImage,
				job: signUpData.job,
				household: signUpData.household,
				market: signUpData.market.concat(marketOthers)
			})
			if (res.headers.accesstoken) {
				setToken(res.headers.accesstoken)
				setCookie("token", res.headers.accesstoken,
					{ httpOnly: true, secure: process.env.NODE_ENV === "development" ? false : true })
			}
		}
		catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				console.log((err.response?.data));
			}
		}
		setLoginLoading(true)
		setTimeout(() => {
			setLoginLoading(false)
			navigate("/")
		}, 3000)
	}

	if (loginLoading) {
		return <LoginLoading nickname={userQuery.data?.nickname} />
	}

	return (
		<Container>
			<TopHeader closeButton={() => navigate("/")} >
				추가 정보 기입
			</TopHeader>
			<MainWrap>
				<h1 style={{ display: "inline-block" }}>현재 카톡방의 닉네임처럼<br />본인을 소개해주세요!</h1>
				<UserInputForm
					errorMsg={errorMsg}
					marketOthers={marketOthers}
					setMarketOthers={(data: Array<string>) => setMarketOthers(data)}
					signUpData={signUpData}
					setSignUpData={(data: SignUpType) => setSignUpData(data)} />
				<LongButton onClick={handleSignIn} buttonStyle={{ marginTop: 60, color: theme.color.grayscale.FFFFF, backgroundColor: theme.color.main }} color={theme.color.main}>
					가입 완료
				</LongButton>
			</MainWrap>
		</Container>
	)
}

const Container = styled.section`
	width: 100%;
	padding-top: 50px;
	overflow: hidden;
	position: relative;
`

const MainWrap = styled.div`
	margin-top: 40px;
	padding-bottom: 60px;
	>h1{
		margin:0 20px;
		line-height: 1.25;
		font-size: 24px;
		font-weight: bold;
	}
`

export default Onboarding