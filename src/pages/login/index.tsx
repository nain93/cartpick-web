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
import LongButton from "components/LongButton"
import downIcon from "assets/icon/downIcon.png"
import cameraIcon from "assets/icon/cameraIcon.png"
import leftarrowIcon from "assets/icon/leftarrowIcon.png"
import rightIcon from "assets/icon/rightIcon.png"

interface MarketInfoprops {
	isClick: boolean,
	image: string,
	color: string,
	name: string
}

function Past() {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [intPageStep1, setIntPageStep1] = useState(0)
	const [textJob, setTextJob] = useState("");
	const [textNickname, setTextNickname] = useState("");
	const [textMarketname, setTextMarketname] = useState("");

    function __displayStep0 () {
        return (
            <div></div>
        )
    }
    function __displayStep1() {
        return (
            <div></div>
        )
    }
    function __displayStep2 () {
        return (
            <div></div>
        )
    }

	return (
		<>
			<Container>
				<Header>
					<TitleWrap 
                        style={{ 
                            borderBottom: intPageStep1 == 1 ? `1px solid #f2f3f6` : 'none'
                        }}
                    >
                        {
                            intPageStep1 == 0 && 
                            <>
                            &#9829; 지금 가입하면 200번째!
                            </>
                        }
                        {
                            intPageStep1 == 1 &&
                            <>
                            <div className="label0 label1">추가 정보 기입</div>
                            <img className="icon2" src={rightIcon} onClick={()=> { setIntPageStep1(intPageStep1 - 1)}}/>
                            </>
                        }
					</TitleWrap>
				</Header>

                {
                    intPageStep1 == 0 && 
                    <>
                        <div className="font_large">
                        여기서 <span className="font_active">추천템</span><br/>더 편하게 보세요!
                        </div>
                        <div className="button_kakao1">
                            {/* <img className="icon0"/> */}
                            카카오로 시작하기
                        </div>
                    </>
                }
                {
                    intPageStep1 == 1 &&

                    <MainWrap>
                    {/* <div className="text_label0">별명</div>
                    <div className="text_input_wrapper0">
                        <input
                            type={`text`}
                            placeholder={"e-mail"}
                            value={textNickname}
                            onChange={e => {
                                setTextNickname(e.target.value);
                            }}
                        />
                    </div> */}
                    <div className="text_label0">직업</div>
                    <Slide>
                        {Array.from([
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            
                        ]).map((slideItem, slideIndex) => {
                                return (
                                    <div className="container0 container1">
                                        <div className="icon0">{slideItem.icon}</div>
                                        &nbsp;
                                        <div className="title0">{slideItem.title}</div>
                                    </div>
                                )
                            }
                        )}
                    </Slide>
                    <div className="text_label0">주거형태</div>
                    <Slide>
                        {Array.from([
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            
                        ]).map((slideItem, slideIndex) => {
                                return (
                                    <div className="container0 container1">
                                        <div className="icon0">{slideItem.icon}</div>
                                        &nbsp;
                                        <div className="title0">{slideItem.title}</div>
                                    </div>
                                )
                            }
                        )}
                    </Slide>
                    <div className="text_label0">자주 이용하는 마켓 (복수선택 가능)</div><Slide>
                        {Array.from([
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            {
                                icon: "&#9829;",
                                title : "학생"
                            },
                            
                        ]).map((slideItem, slideIndex) => {
                                return (
                                    <div className="container0 container2">
                                        <div className="icon0">{slideItem.icon}</div>
                                        <div className="title0">{slideItem.title}</div>
                                    </div>
                                )
                            }
                        )}
                    </Slide>
                    <div className="bottom_button0 bottom_button1 "
                         onClick={()=> { setIntPageStep1(intPageStep1 + 1)}}
                    >가입 완료</div>
                    <div className="bottom_button0 bottom_button2 "
                         onClick={()=> { setIntPageStep1(intPageStep1 - 1)}}
                    >다음에 할래요</div>
				</MainWrap>

                }
			</Container>

		</>
	)
}

const Container = styled.section`
	position: relative;
	height: 100vh;
	.font_bold {
		font-weight : 700;
	}
	.font_active {
		color : #7857ff;
	}
    .font_large {

        font-size: 42px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.24;
        letter-spacing: normal;
        text-align: left;
        color: #000;

        width: calc(100% - 40px);
        margin-left: 20px;
        margin-top: 150px;
    }
    .font_underline {
        text-decoration: underline;
    }
    .bottom_wrapper0 {
        height: 50vh;
    }
    .bottom_wrapper0 .text1 {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 2;
        letter-spacing: normal;
        text-align: center;
        color: #b7c3d4;
    }
    .bottom_wrapper0 .text2 {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 2;
        letter-spacing: normal;
        text-align: center;
        color: #b7c3d4;
    }
    .text_label0 {
        width: calc(100% - 40px);
        margin-left: 20px;
        margin-top: 40px;
        
        font-size: 12px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 2.33;
        letter-spacing: -0.3px;
        text-align: left;
        color: #000;
    }
    .text_input_wrapper0 {
        width: calc(100% - 40px);
        margin-left: 20px;
        
        border-bottom: 1px solid  #dfe4ee;
        margin-top: 24px;
        padding-bottom: 8px;

    }
    .text_input_wrapper0 input {
        width : 100%;
        box-sizing: border-box;
        border: none !important;
        outline: none !important;
        background-color: transparent;

        padding: none;
    }
    ::placeholder {
        color: #aeaeae;
        font-weight: normal;
    }

    .container1 {

        min-width: 79px;
        height: 40px;
        margin-right: 10px;
        padding: 10px 15px;
        border-radius: 20px;
        border: solid 1px #f2f3f6;
        background-color: #fff;
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
        color: #b7c3d4;

    }
    .container2 {
        display: flex;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .container2 .icon0 {

        min-width: 79px;
        height: 40px;
        margin-right: 10px;
        border-radius: 20px;
        border: solid 1px #f2f3f6;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .container2 .title0 {
        text-align: center;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 2.5;
        letter-spacing: -0.3px;
        text-align: center;
        color: #b7c3d4;
    }
    .bottom_button0 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% - 40px);
        margin-left: 20px;
        
        height: 50px;
    }
    .bottom_button1 {
        border-radius: 10px;
        border: solid 1px #7857ff;
        background-color: #7857ff;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.71;
        letter-spacing: normal;
        text-align: center;
        color: #fff;

        margin-top: 40px;
    }
    .bottom_button2 {
        border-radius: 10px;
        border: solid 1px #b7c3d4;
        background-color: #fff;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.71;
        letter-spacing: normal;
        text-align: center;
        color: #4c5463;

        margin-top: 10px;
    }
    .button_kakao1 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% - 40px);
        margin-left: 20px;
        
        height: 45px;
        border-radius: 10px;

        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #3c1e1e;
        background-color: #FFE037;
        margin-top: 100px;

        position: relative;
    }
    .button_kakao1 .icon0 {

        width: 18px;
        height: 16.6px;
        object-fit: contain;
        position: absolute;
        left: 20px;

    }
`

const Header = styled.section`
	display: flex;
	flex-direction: column;
	padding: 20px;

    .profile_header_row0 {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
    }
    .profile_header_row0 .image_wrapper0 {
        width: 60px;
        height: 60px;
        margin-right: 20px;
        border-radius: 30px;
        overflow: hidden;
        background-color: #DAE0EB;

        display: flex;
        align-items: center;
        justify-content: center;

        position: relative;

        margin-left: auto;
        margin-right: auto;
    }   
    .profile_header_row0 .image_wrapper0 .select0 {
        width: 80px;
        height: 80px;
        object-fit : cover;
    }   
    .profile_header_row0 .image_wrapper0 .plus0 {
        width: 15px;
        height: 15px;
        object-fit: contain;

        position: absolute;
        right: 0;
        bottom: 0;
    }
    .text1 {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        text-align: left;
        color: #4c5463;
    }
    .text2 {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 2;
        letter-spacing: normal;
        text-align: left;
        color: #b7c3d4;
        margin-top: 5px;
        text-decoration: underline;
    }

    .profile_header_row0 {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: calc(100% - 40px);
        margin-left: 20px;
    }
`

const TitleWrap = styled.div`
	display: flex;
	align-items: center;
    width: 100%;
    height: 50px;
    position: relative;

    .icon0 {
        width: 18px;
        height: 18px;
        object-fit: contain;
        position: absolute;

        margin-left: 20px;
    }
    .label0 {
        margin-left: auto;
        margin-right: auto;
    }
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
	position: relative;

	>div:first-child{
		display: flex;
		align-items: center;
		width: calc(100% - 40px);
		word-break: break-word;
	}
	.text1 {
		margin-left: 20px;
        font-size: 12px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 2.33;
        letter-spacing: -0.3px;
        text-align: left;
        color: #000;
	}
	.text2 {
        min-width: 50%;
		margin-left: auto;
        margin-right: auto;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        text-align: right;
        color: #4c5463;
	}
	
	img{
		position: absolute;
		right: 20px;
		top: 20px;
	}
	
`;


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

export default Past