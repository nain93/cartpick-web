import TopHeader from 'components/topHeader'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'
import inputSearchIcon from "assets/icon/inputSearchIcon.png"
import lightCloseIcon from "assets/icon/lightCloseIcon.png"
import React, { useState } from 'react'

function Search() {
	const navigate = useNavigate()
	const [recentKeywords, setRecentKeyWords] = useState<Array<string>>(
		[
			"베이글",
			"잼",
			"떡볶이"
		])
	return (
		<Container>
			<TopHeader backButton={() => navigate(-1)}>
				추천템 검색
			</TopHeader>
			<MainWrap>
				<InputWrap>
					<input placeholder="어떤 후기를 찾아볼까요?" />
					<button onClick={() => console.log("search")}>
						<img src={inputSearchIcon} width={19} height={19} alt="searchIcon" />
					</button>
				</InputWrap>
				<Title>최근 검색어</Title>
				<Keywords>
					{recentKeywords.length === 0 ?
						<span style={{ fontSize: 14, color: theme.color.grayscale.C_4C5463 }}>최근 검색어가 없습니다.</span>
						:
						React.Children.toArray(recentKeywords.map((v, i) =>
							<li>
								<span>{v}</span>
								<button onClick={() => setRecentKeyWords(recentKeywords.filter((_, filterI) => i !== filterI))}>
									<img src={lightCloseIcon} width={12} height={12} alt="lightCloseIcon" />
								</button>
							</li>
						))}
				</Keywords>
			</MainWrap>
		</Container>
	)
}

const Container = styled.section`
	padding-top: 50px;
`

const MainWrap = styled.div`
	padding: 40px 20px;
	input{
		width: 100%;
		padding-right: 15px;
		::placeholder{
			color:${theme.color.grayscale.B7C3D4}
		}
	}
`

const InputWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 45px;
	border:1px solid ${theme.color.grayscale.DFE4EE};
	padding:13px 15px;
	border-radius: 5px;
`

const Title = styled.h1`
	font-size: 12px;
	margin-top: 40px;
	margin-bottom: 30px;
`

const Keywords = styled.ul`
	li{
		min-height: 43px;
		span{
			font-size: 16px;
			color:${theme.color.grayscale.C_4C5463}
		}
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 9.5px 10px;
		border-bottom: 1px solid ${theme.color.grayscale.F2F3F6};
	}
`

export default Search