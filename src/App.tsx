import GlobalStyles from "Globalstyles";
import Main from "pages/main";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

function App() {
	return (
		<>
			<GlobalStyles />
			<Container>
				<Routes>
					<Route path="/" element={<Main />} />
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
