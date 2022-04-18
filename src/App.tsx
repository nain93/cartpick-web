import GlobalStyles from "Globalstyles";
import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";

import Main from "pages/main";
import Login from "pages/login";
import Mypage from "pages/mypage";
import EditMypage from "pages/mypage/editMypage";
import PastItemList from "pages/PastItemList";
import PastDetail from "pages/PastItemList/detail";
import Onboarding from "pages/onboarding";
import Search from "pages/search";
import CustomModal from "components/customModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, popupState, tokenState } from "recoil/atoms";
import NotFound from "pages/notFound";
import { useEffect } from "react";
import ReactGA from 'react-ga';
import { getNewToken } from "api";
import AlertPopup from "components/alertPopup";

function App() {
	const [token, setToken] = useRecoilState(tokenState)
	const isModalOpen = useRecoilValue(modalState)
	const [isPopupOpen, setIsPopupOpen] = useRecoilState(popupState)
	const location = useLocation()

	useEffect(() => {
		// * 구글 애널리틱스 추적
		if (process.env.NODE_ENV === "production") {
			ReactGA.initialize("UA-199856178-3");
			ReactGA.pageview(location.pathname + location.search)
		}
	}, [location])

	useEffect(() => {
		// * 카카오 링크 공유하기
		//@ts-ignore
		const { Kakao } = window
		Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY)

		// * accessToken 새로 발급받아서 setToken에 넣어주기
		const getToken = async () => {
			const newToken = await getNewToken()
			if (newToken?.accessToken) {
				setToken(newToken.accessToken)
			}
		}
		getToken()
	}, [])

	// * 경고 팝업창 띄웠다 꺼지는 로직
	useEffect(() => {
		if (isPopupOpen.isOpen) {
			setTimeout(() => {
				setIsPopupOpen({ ...isPopupOpen, isOpen: false })
			}, 1500)
		}
	}, [isPopupOpen])

	return (
		<>
			<GlobalStyles />
			<Container>
				<Routes>
					<Route path='*' element={<NotFound />} />
					<Route path="/" element={<PastItemList />} />
					<Route path="/today" element={<Main />} />
					{!token ?
						<>
							<Route path="/login" element={<Login />} />
							<Route path="/onboarding" element={<Onboarding />} />
						</>
						:
						<>
							<Route path="/mypage" element={<Mypage />} />
							<Route path="/mypage/edit" element={<EditMypage />} />
							<Route path="/list/:id" element={<PastDetail />} />
							<Route path="/search" element={<Search />} />
						</>
					}
				</Routes>
				<AlertPopup popupStyle={isPopupOpen.isOpen ? { opacity: 1 } : { opacity: 0 }} >
					{isPopupOpen.content}
				</AlertPopup>
				{isModalOpen.isOpen &&
					<CustomModal />}
			</Container>
		</>
	);
}

const Container = styled.div`
    min-width: 360px;
	max-width: 768px;
    height: 100vh;
    margin: 0 auto;
`

export default App;
