import style from "App.module.scss"
import Main from "pages/main";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className={style.container}>
			<Routes>
				<Route path="/" element={<Main />} />
			</Routes>
		</div>
	);
}

export default App;
