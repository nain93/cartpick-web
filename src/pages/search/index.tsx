import TopHeader from 'components/topHeader'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'
import inputSearchIcon from "assets/icon/inputSearchIcon.png"
import lightCloseIcon from "assets/icon/lightCloseIcon.png"
import React, { KeyboardEvent, useState } from 'react'
import { getSearchMarketData, getSearchMarketList } from 'api/search'
import { useCookies } from 'react-cookie'

function Search() {
	const navigate = useNavigate()
	const [cookie] = useCookies(["token"])
	const [keyword, setKeyWord] = useState("")
	const [recentKeywords, setRecentKeyWords] = useState<Array<string>>(
		[
			"베이글",
			"잼",
			"떡볶이"
		])

	const handleSearch = async (searchText: string) => {
		console.log(searchText, 'searchText');
		const list = await getSearchMarketList(keyword, cookie.token)
		const market = await getSearchMarketData(1, keyword, cookie.token)
		console.log(list, 'list');
		setKeyWord("")
	}

	const searchEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		// ! onKeyDown 한글입력시 2번 이벤트 발생해서 !e.nativeEvent.isComposing 처리
		if (e.key === "Enter" && keyword && !e.nativeEvent.isComposing) {
			handleSearch(keyword)
		}
	}

	return (
		<Container>
			<TopHeader backButton={() => navigate(-1)}>
				추천템 검색
			</TopHeader>
			<MainWrap>
				<InputWrap>
					<input onKeyDown={searchEnter}
						onChange={(e) => setKeyWord(e.target.value)}
						value={keyword} placeholder="어떤 후기를 찾아볼까요?" />
					<button onClick={() => handleSearch(keyword)}>
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