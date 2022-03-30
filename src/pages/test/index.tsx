import { useEffect, useState } from "react"
import styled from "styled-components"

import theme from "styles/theme"
import { dateSimpleFormat } from "utils"
import Marketbutton from "components/marketbutton"
import kurlyImage from "assets/image/kurlyImage.png"
import cookatImage from "assets/image/cookatImage.png"
import emartImage from "assets/image/emartImage.png"
import roketImage from "assets/image/roketImage.png"
import naverImage from "assets/image/naverImage.png"
import etcImage from "assets/image/etcImage.png"
import LongButton from "components/longButton"
import downIcon from "assets/icon/downIcon.png"
import cameraIcon from "assets/icon/cameraIcon.png"


import PopupBlur1 from "components/Popup/PopupBlur1";
import PopupFull1 from "components/Popup/PopupFull1";
import PopupV1 from "components/Popup/PopupV1";



function Main() {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [boolOpenPopup1, setBoolOpenPopup1] = useState(true)

	return (
		<>
			<Container>
				<Header>
					<TitleWrap>
						<div style={{ fontSize: 24, fontWeight: "bold", lineHeight: 1.25 }}>테스트</div>
						<button style={{ color: theme.color.main }}>로그인</button>
					</TitleWrap>
				</Header>
				<MainWrap>
				</MainWrap>

				{boolOpenPopup1 == true && (
					<PopupFull1>
						<PopupBlur1
							paramObject={null}
							onClick={() => {
								setBoolOpenPopup1(false)
								// setBoolPopup1({ open: false, text: "" });
							}}
						></PopupBlur1>
						<PopupV1 setBoolPopup1={() => { }}>
							<div className="popup_container0">
								<div className="label0">
									로그인이 필요한 서비스입니다.<br />로그인 하시겠어요?
								</div>
								<div className="bottomrow0">
									<div className="button0 button1">취소</div>
									<div className="button0 button2">로그인 하기</div>
								</div>
							</div>
						</PopupV1>
					</PopupFull1>
				)
				}
			</Container>

		</>
	)
}

const Container = styled.section`
	position: relative;
	height: 100vh;

    .popup_container0 {

        width: calc(100% - 80px);
        margin-left: auto;
        margin-right: auto;
        min-width: 280px;

        height: 150px;
        border-radius: 10px;
        background-color: #fff;

        display: flex;
        flex-direction: column;
        position: relative;
    }
    .popup_container0 .label0 {

        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: center;
        color: #4c5463;

        margin-left: auto;
        margin-right: auto;
        margin-top: 35px;

        display: flex;
    }
    .bottomrow0 {
        display: flex;
        align-items: center;

        position: absolute;
        height: 44.5px;
        width: 100%;
        bottom: 0;

        border-top: 1px solid #f2f3f6;
    }
    .button1 {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: center;
        color: #ff6767;
        border-right: 1px solid #f2f3f6;
    }
    .button2 {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.71;
        letter-spacing: normal;
        text-align: center;
        color: #7857ff;
    }
`

const Header = styled.section`
	display: flex;
	flex-direction: column;
	padding: 20px;
`

const TitleWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`

const LastItemButton = styled.span`
	line-height: 2;
	font-size: 12px;
	margin-top: 5px;
	color: ${theme.color.grayscale.B7C3D4};
	text-decoration :underline ;
	cursor: pointer;
`

const Slide = styled.div`
	>div:first-child{
		margin-left: 10px;
	}
	display: flex;
	overflow: scroll;
	margin-top: 20px;
`


const MainWrap = styled.section`
	padding: 20px 20px 0px 20px;
`

const ListView = styled.div`
	overflow: scroll;
	height: calc(100vh - 370px);
	margin-top: 15.5px;
`

const ListItem = styled.div`
	cursor: pointer;
	min-height: 53px;
	border-bottom: 1px solid ${theme.color.grayscale.F2F3F6};
	display: flex;
	align-items: center;
	padding:14.5px 0;
	>div:first-child{
		display: flex;
		align-items: center;
		width: calc(100% - 40px);
		word-break: break-word;
	}
	
	img{
		margin-left: auto;
	}
`

const Tag = styled.span`
	height: 20px;
	border-radius: 10px;
	padding: 1px 10px;
	display: inline-flex;
	align-items: center;
	border:1px solid ${theme.color.grayscale.DFE4EE};
	margin-left: 5px;
	font-size: 12px;
`

export default Main