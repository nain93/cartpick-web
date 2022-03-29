import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

	@font-face {
    font-family: 'NotoSansKR-Regular';
    font-style: normal;
    font-weight: 400;
    src: local(''),
        url("/styles/fonts/noto-sans-kr-v25-latin-regular.woff2") format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */
        url("/styles/fonts/noto-sans-kr-v25-latin-regular.woff") format('woff');
    /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
	}
	
    a{
        text-decoration:none;
        color:inherit
    }
    *{
        box-sizing:border-box;
    }
    body{
		font-size: 14px;
		font-family: "NotoSansKR-Regular";
    }
	button{
		padding: 0;
		background: none;
		color: inherit;
		cursor: pointer;
		border: none;
		outline: inherit;
	}
	input { 
		border: none;
		background-color:inherit ;
		outline: inherit;
	}
`;

export default GlobalStyles;
