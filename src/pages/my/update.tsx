import { useState } from "react"
import styled from "styled-components"

import theme from "styles/theme"
import leftarrowIcon from "assets/icon/leftarrowIcon.png"

interface MarketInfoprops {
	isClick: boolean,
	image: string,
	color: string,
	name: string
}

function Past() {
	const [textNickname, setTextNickname] = useState("");


	return (
		<>
			<Container>
				<Header>
					<TitleWrap>
						<img className="icon0" alt="leftarrowIcon" src={leftarrowIcon} />
						<div className="label0 label1">내 프로필</div>
					</TitleWrap>
					<div className="profile_header_row0 profile_header_row1">
						<div className="image_wrapper0">
							<img className="select0" />
							<img className="plus0" />
						</div>
					</div>
				</Header>
				<MainWrap>
					<div className="text_label0">별명</div>
					<div className="text_input_wrapper0">
						<input
							type={`text`}
							placeholder={"e-mail"}
							value={textNickname}
							onChange={e => {
								setTextNickname(e.target.value);
							}}
						/>
					</div>
					<div className="text_label0">직업</div>
					<Slide>
						{Array.from([
							{
								icon: "&#9829;",
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
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
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
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
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
							},
							{
								icon: "&#9829;",
								title: "학생"
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
					<div className="bottom_button0 bottom_button1 ">프로필 저장</div>
					<div className="bottom_button0 bottom_button2 ">취소</div>
				</MainWrap>
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
    border-bottom: 1px solid #f2f3f6;
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