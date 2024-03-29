import styled from 'styled-components'
import partyIcon from "assets/icon/partyIcon.png"
import kakaoIcon from "assets/icon/kakaoIcon.png"
import theme from 'styles/theme'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string';
import { useEffect } from 'react'
import { baseURL } from 'api'
import { useSetRecoilState } from 'recoil'
import { tokenState } from 'recoil/atoms'
import { useQuery } from 'react-query'
import { getUserCount } from 'api/user'

const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_RESTAPI_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`

function Login() {
	const query = queryString.parse(window.location.search);
	const navigate = useNavigate()
	const setToken = useSetRecoilState(tokenState)
	const signCount = useQuery("signQuery", getUserCount)

	const getKakaoTokenHandler = async (code: string) => {
		const data: any = {
			grant_type: "authorization_code",
			client_id: process.env.REACT_APP_RESTAPI_KEY,
			redirect_uri: process.env.REACT_APP_REDIRECT_URI,
			code: code
		};
		const queryString = Object.keys(data)
			.map((k: any) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
			.join('&');

		// * 토큰 발급 REST API
		axios.post('https://kauth.kakao.com/oauth/token', queryString, {
			headers: {
				'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
		}).then(async (res) => {
			// * 서버에 토큰 전송
			sendKakaoTokenToServer(res.data.access_token)
		}).catch(error => {
			if (axios.isAxiosError(error) && error.response) {
				console.log(error.response.data);
			}
		})
	}

	const sendKakaoTokenToServer = async (token: string) => {
		try {
			const res = await axios.post(`${baseURL}auth/login/kakao/`, {}, {
				headers: {
					"Authorization": `${token}`
				},
				withCredentials: true
			})

			if (res.data.accessToken) {
				setToken(res.data.accessToken)
				navigate("/")
			}
			if (res.data.kakaoCode) {
				navigate("/onboarding", { state: res.data })
			}
		}
		catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				console.log(error.response.data);
			}
		}
	}

	useEffect(() => {
		if (query.code) {
			getKakaoTokenHandler(query.code.toString());
		}
	}, []);

	return (
		<Container>
			<Header>
				<img src={partyIcon} alt="partyIcon" style={{ marginRight: 5 }} width={25} height={25} />
				<span>지금 가입하면 <span style={{ fontWeight: "bold" }}>{signCount.data}번째!</span></span>
			</Header>
			<Main>
				<h1>여기서 <span>추천템</span><br />더 편하게 보세요! </h1>
			</Main>
			<Kakaobutton href={kakaoUrl}>
				<img src={kakaoIcon} style={{ objectFit: "contain", marginRight: "auto" }} width={18} height={16} alt="kakaoIcon" />
				<span style={{ marginRight: "auto" }}>
					카카오로 시작하기
				</span>
			</Kakaobutton>
			<Desc>
				오픈카톡 '마켓컬리,쿠팡 추천템 공유해요!' 방의<br />상품후기 정보를 기반으로 합니다.
			</Desc>
		</Container>
	)
}

const Container = styled.section`
	padding: 20px;
	height: 100%;
	display: flex;
	flex-direction: column;
`

const Header = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
`

const Main = styled.div`
	margin-top: 188px;
	font-size: 42px;
	font-weight: bold;
	line-height: 1.24;
	span{
		color:${theme.color.main}
	};
`

const Kakaobutton = styled.a`
	width: 100%;
	display: flex;
	padding:14.2px 25px;
	margin-top: 80px;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	height: 45px;
	background-color: #FEE500;
`

const Desc = styled.p`
	display: flex;
	flex-direction: column;
	line-height: 1.67;
	margin-top:auto;
	font-size: 12px;
	text-align: center;
	color:${theme.color.grayscale.B7C3D4};
`
export default Login