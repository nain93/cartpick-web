import TopHeader from 'components/topHeader'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'

import { useState } from 'react'
import LongButton from 'components/longButton'
import LoginLoading from './loginLoading'
import UserInputForm from 'components/userInputForm'


function Onboarding() {
	const navigate = useNavigate()
	const [loginLoading, setLoginLoading] = useState(false)

	const handleSignIn = async () => {
		// todo api 호출하고, 토큰 넣고 로그인
		setLoginLoading(true)

		setTimeout(() => {
			// setLoginLoading(false)
			navigate("/")
		}, 3000)
	}

	if (loginLoading) {
		return <LoginLoading />
	}


	return (
		<Container>
			<TopHeader closeButton={() => navigate("/")} >
				추가 정보 기입
			</TopHeader>
			<MainWrap>
				<h1 style={{ display: "inline-block", marginBottom: 20 }}>현재 카톡방의 닉네임처럼<br />본인을 소개해주세요!</h1>
				<UserInputForm />
				<LongButton onClick={handleSignIn} buttonStyle={{ color: theme.color.grayscale.FFFFF, backgroundColor: theme.color.main }} color={theme.color.main}>
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