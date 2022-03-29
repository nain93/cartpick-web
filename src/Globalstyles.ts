import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

	
    a{
        text-decoration:none;
        color:inherit
    }
	
    *{
        box-sizing:border-box;
		::-webkit-scrollbar{
		display: none;
		}
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
