import { useState } from "react"
import styled from "styled-components"

import theme from "styles/theme"
import LongButton from "components/longButton"
import leftarrowIcon from "assets/icon/leftarrowIcon.png"

function Past() {
	const [selectedIndex, setSelectedIndex] = useState(0)


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
							<img />
						</div>
						<div className="text_wrapper0">
							<div className="text0 text1">카카오계정으로 로그인하셨어요!</div>
							<div className="text0 text2">로그아웃</div>
						</div>
					</div>
				</Header>
				<MainWrap>
					<ListView>
						{
							Array.from([
								{
									idx: 1,
									title: "별명",
									value: "배고픈강아지123"
								},
								{
									idx: 2,
									title: "직업 ",
									value: "직장인"
								},
								{
									idx: 3,
									title: "주거형태 ",
									value: "1인 가구"
								},
								{
									idx: 3,
									title: "자주 이용하는 마켓 ",
									value: "마켓컬리"
								},
							])
								.map((arrayItem, arrayIndex) => {
									return (
										<div key={`listitem_` + arrayIndex}>
											<ListItem
											>
												<div className="text0 text1">
													<span
														style={{
															color: theme.color.grayscale.C_4C5463,
														}}
													>
														{arrayItem.title}
													</span>
												</div>
												<div className="text0 text2">
													{arrayItem.value}
												</div>
											</ListItem>
										</div>

									)
								})
						}
					</ListView>
				</MainWrap>
				<div style={{ padding: "40px 0", backgroundColor: theme.color.grayscale.F5F5F5, }}>
					<LongButton onClick={() => console.log("click")} buttonStyle={{ color: theme.color.main }} color={theme.color.main}>
						프로필 수정
					</LongButton>
					<div className="bottom_wrapper0">
						<div className="text0 text1 font_underline">회원 탈퇴</div>
						<div className="text0 text2"><span className="font_underline">이용약관</span>&nbsp;및&nbsp;<span className="font_underline">개인정보처리방침</span></div>
					</div>
				</div>
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
    }   
    .profile_header_row0 .image_wrapper0 img {
        width: 80px;
        height: 80px;
        object-fit : cover;
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