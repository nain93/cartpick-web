import GlobalStyles from "Globalstyles";
import { Route,  Routes } from "react-router-dom";
import styled from "styled-components";


import Main from "pages/main";
import Login from "pages/login";
import My from "pages/my";
import MyUpdate from "pages/my/update";
import Past from "pages/past";
import PastDetail from "pages/past/detail";
import Test from "pages/test";

function App() {
	return (
		<>
			<GlobalStyles />
			<Container>
				<Routes>
					<Route path="/"  element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="/my" element={<My />} />
					<Route path="/my/update" element={<MyUpdate />} />
					<Route path="/past"  element={<Past />} />
					<Route path="/past/detail/:id"  element={<PastDetail />} />
					<Route path="/test" element={<Test />} />
				</Routes>
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
