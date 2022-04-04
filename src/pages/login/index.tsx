import styled from 'styled-components'
import partyIcon from "assets/icon/partyIcon.png"
import kakaoIcon from "assets/icon/kakaoIcon.png"
import theme from 'styles/theme'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string';
import { useEffect } from 'react'
import { baseURL } from 'api'

const query = queryString.parse(window.location.search);
const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_RESTAPI_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`

function Login() {
	const navigate = useNavigate()

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

		//토큰 발급 REST API
		axios.post('https://kauth.kakao.com/oauth/token', queryString, {
			headers: {
				'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
			}
		}).then((res) => {
			//서버에 토큰 전송
			sendKakaoTokenToServer(res.data.access_token)
		});
	}

	const sendKakaoTokenToServer = async (token: string) => {
		try {
			const res = await axios.post(`${baseURL}auth/login/kakao/`, {}, {
				headers: {
					"Authorization": `${token}`
				}
			})
			if (res) {
				console.log(res.data, "data")
				navigate("/onboarding", { state: { userData: res.data } })
			}
			// todo data에 유저정보 받은후 유저정보로 회원가입 api post
			// todo 회원가입후 토큰을 받아서 쿠키에 저장 후 recoil로 isLogin설정
		}
		catch (e) {
			console.error(e)
		}
		finally {
			console.log("finally");
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
				<span>지금 가입하면 <span style={{ fontWeight: "bold" }}>200번째!</span></span>
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