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
import { useRecoilValue } from "recoil";
import { modalState } from "recoil/atoms";
import NotFound from "pages/notFound";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import ReactGA from 'react-ga';

function App() {
	// const isLogin = useRecoilValue(tokenState)
	const isModalOpen = useRecoilValue(modalState)
	const location = useLocation()
	const [cookies] = useCookies(["token"])

	// * 구글 애널리틱스 추적
	useEffect(() => {
		if (process.env.NODE_ENV === "production") {
			ReactGA.initialize("UA-199856178-3");
			ReactGA.pageview(location.pathname + location.search)
		}
	}, [location])

	return (
		<>
			<GlobalStyles />
			<Container>
				<Routes>
					<Route path='*' element={<NotFound />} />
					<Route path="/" element={<Main />} />
					{!cookies.token ?
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
