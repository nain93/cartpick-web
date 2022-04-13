import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from "react-cookie"
import CustomRouter from 'customRouter';
import history from 'api/history';

const queryClient = new QueryClient()

ReactDOM.render(
	<React.StrictMode>
		<CustomRouter history={history}>
			<QueryClientProvider client={queryClient}>
				<RecoilRoot>
					<CookiesProvider>
						<App />
					</CookiesProvider>
				</RecoilRoot>
			</QueryClientProvider>
		</CustomRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

