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
import { modalState, tokenState } from "recoil/atoms";
import NotFound from "pages/notFound";
import { useEffect } from "react";
import ReactGA from 'react-ga';
import { getNewToken } from "api";

function App() {
	const [token, setToken] = useRecoilState(tokenState)
	const isModalOpen = useRecoilValue(modalState)
	const location = useLocation()

	useEffect(() => {
		// * 구글 애널리틱스 추적
		// if (process.env.NODE_ENV === "production") {
		// 	ReactGA.initialize("UA-199856178-3");
		// 	ReactGA.pageview(location.pathname + location.search)
		// }
	}, [location])

	useEffect(() => {
		const localToken = localStorage.getItem("token")
		if (localToken) {
			setToken(localToken)
		}


		// todo accessToken 새로 발급받아서 setToken에 넣어주기
		console.log('zz');
		const getToken = async () => {
			const accessToken = await getNewToken()
			if (accessToken) {
				setToken(accessToken)
			}
		}
		getToken()
	}, [])

	return (
		<>
			<GlobalStyles />
			<Container>
				<Routes>
					<Route path='*' element={<NotFound />} />
					<Route path="/" element={<Main />} />
					{!token ?
						<>
							<Route path="/login" element={<Login />} />
							<Route path="/onboarding" element={<Onboarding />} />
						</>
						:
						<>
							<Route path="/mypage" element={<Mypage />} />
							<Route path="/mypage/edit" element={<EditMypage />} />
							<Route path="/pastItemList" element={<PastItemList />} />
							<Route path="/pastItemList/:id" element={<PastDetail />} />
							<Route path="/search" element={<Search />} />
						</>
					}
				</Routes>
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
