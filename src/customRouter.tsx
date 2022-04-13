import { useLayoutEffect, useState } from 'react'
import { Router } from 'react-router-dom';

// * jsx파일 외에서도 화면 navigate 하기위한 customRouter
function CustomRouter({ history, ...props }: any) {
	const [state, setState] = useState({
		action: history.action,
		location: history.location
	});

	useLayoutEffect(() => history.listen(setState), [history]);

	return (
		<Router
			{...props}
			location={state.location}
			navigationType={state.action}
			navigator={history}
		/>
	)
}

export default CustomRouter