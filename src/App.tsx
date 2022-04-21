import GlobalStyles from "Globalstyles";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
import { useEffect, useState } from "react";
import ReactGA from 'react-ga';
import { getEventPopup, getNewToken } from "api";
import AlertPopup from "components/alertPopup";
import EventPopup from "components/eventPopup";
import { useQuery } from "react-query";
import Today from "pages/today";
import { EventQueryType } from "types/others";

function App() {
	const [token, setToken] = useRecoilState(tokenState)
	const isModalOpen = useRecoilValue(modalState)
	const [isPopupOpen, setIsPopupOpen] = useRecoilState(popupState)
	const [isEventOpen, setIsEventOpen] = useState(false)
	const location = useLocation()

	const eventQuery = useQuery<EventQueryType>("eventQuery", getEventPopup, {
		refetchOnWindowFocus: false
	})
	const loginQuery = useQuery("loginQuery", getNewToken)

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
	}, [])

	useEffect(() => {
		// * accessToken 새로 발급받아서 setToken에 넣어주기
		if (loginQuery.data) {
			setToken(loginQuery.data.accessToken)
		}
	}, [loginQuery.data])

	// * 경고 팝업창 띄웠다 꺼지는 로직
	useEffect(() => {
		if (isPopupOpen.isOpen) {
			setTimeout(() => {
				setIsPopupOpen({ ...isPopupOpen, isOpen: false })
			}, 1500)
		}
	}, [isPopupOpen])

	// * 이벤트 팝업 세팅
	useEffect(() => {
		const event = localStorage.getItem("eventpopup")
		if (event === "true") {
			setIsEventOpen(true)
		}
		else if (event === null) {
			setIsEventOpen(true)
			localStorage.setItem("eventpopup", JSON.stringify(true))
		}
		else if (event === "false") {
			setIsEventOpen(false)
		}
	}, [])


	return (
		<>
			<GlobalStyles />
			<Container>
				<Routes>
					<Route path='*' element={<NotFound />} />
					<Route path="/" element={<PastItemList />} />
					<Route path="/today" element={<Today />} />
					<Route path="/list/:id" element={<PastDetail />} />
					{!token ?
						<>
							<Route path="/login" element={<Login />} />
							<Route path="/onboarding" element={<Onboarding />} />
						</>
						:
						<>
							<Route path="/mypage" element={<Mypage />} />
							<Route path="/mypage/edit" element={<EditMypage />} />
							<Route path="/search" element={<Search />} />
						</>
					}
				</Routes>
				{(isEventOpen && eventQuery.data?.title) &&
					<EventPopup {...eventQuery.data} setIsEventOpen={(isOpen: boolean) => setIsEventOpen(isOpen)} />
				}
				<AlertPopup popupStyle={isPopupOpen.isOpen ? { opacity: 1, zIndex: 2 } : { opacity: 0, zIndex: -1 }} >
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
