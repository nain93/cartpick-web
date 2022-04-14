import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from "react-cookie"
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

// * react-query 에러 핸들러
const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				console.log(error.response.data);
			}
		}
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				console.log(error.response.data);
			}
		}
	})
})

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

