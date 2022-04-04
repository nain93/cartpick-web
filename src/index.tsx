import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from "react-cookie"

const queryClient = new QueryClient()

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<RecoilRoot>
					<CookiesProvider>
						<App />
					</CookiesProvider>
				</RecoilRoot>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

