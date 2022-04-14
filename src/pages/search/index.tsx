import TopHeader from 'components/topHeader'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import theme from 'styles/theme'
import inputSearchIcon from "assets/icon/inputSearchIcon.png"
import lightCloseIcon from "assets/icon/lightCloseIcon.png"
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { getSearchMarketList } from 'api/search'
import { useMutation } from 'react-query'
import MarketListLayout from 'components/marketListLayout'
import grinningIcon from "assets/icon/grinningIcon.png"
import { useRecoilValue } from 'recoil'
import { tokenState } from 'recoil/atoms'

function Search() {
	const navigate = useNavigate()
	const token = useRecoilValue(tokenState)
	const searchInputRef = useRef<HTMLInputElement>(null)
	const [keyword, setKeyWord] = useState("")
	const [inputKeyword, setInputKeyword] = useState("")
	const [recentKeywords, setRecentKeyWords] = useState<Array<string>>(JSON.parse(localStorage.getItem("recentKeywords") || "[]"))

	const searchMutation = useMutation((mutateKeyword: string) => getSearchMarketList(mutateKeyword, token))

	const handleSearch = async (searchText: string) => {
		if (inputKeyword === "" && searchText === "") {
			return
		}
		// * 최근검색어 중복일시 리스트에 넣지않음
		if (!recentKeywords.every(v => v !== searchText)) {
		}

		// * 최근검색어 갯수제한 5개, 5개 넘어가면 밀어내면서 5개 유지
		else if (recentKeywords.length === 5) {
			setRecentKeyWords([searchText, ...recentKeywords].slice(0, recentKeywords.length))
			localStorage.setItem("recentKeywords", JSON.stringify([searchText, ...recentKeywords].slice(0, recentKeywords.length)))
		}
		else {
			setRecentKeyWords([searchText, ...recentKeywords])
			localStorage.setItem("recentKeywords", JSON.stringify([searchText, ...recentKeywords]))
		}
		setKeyWord(inputKeyword)
		setInputKeyword("")
		searchMutation.mutate(searchText)
	}

	const searchEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		// ! onKeyDown 한글입력시 2번 이벤트 발생해서 !e.nativeEvent.isComposing 처리
		if (e.key === "Enter" && !e.nativeEvent.isComposing) {
			handleSearch(inputKeyword)
		}
	}

	const removeRecentKeywords = (recentIndex: number) => {
		setRecentKeyWords(recentKeywords.filter((_, filterI) => recentIndex !== filterI))
		localStorage.setItem("recentKeywords", JSON.stringify(recentKeywords.filter((_, filterI) => recentIndex !== filterI)))
	}

	useEffect(() => {
		searchInputRef.current?.focus()
	}, [])

	// * 로딩 화면
	if (searchMutation.isLoading) {
		return (
			<Container>
				<TopHeader backButton={() => navigate(-1)}>
					추천템 검색
				</TopHeader>
				<MainWrap>
					<InputWrap>
						<input value={inputKeyword} placeholder="어떤 후기를 찾아볼까요?" />
						<button>
							<img src={inputSearchIcon} width={19} height={19} alt="searchIcon" />
						</button>
					</InputWrap>
				</MainWrap>
			</Container>
		)
	}

	return (
		<Container>
			<TopHeader backButton={() => navigate(-1)}>
				추천템 검색
			</TopHeader>
			<MainWrap>
				<InputWrap>
					<input ref={searchInputRef} onKeyDown={searchEnter}
						onChange={(e) => setInputKeyword(e.target.value)}
						value={inputKeyword} placeholder="어떤 후기를 찾아볼까요?" />
					<button onClick={() => handleSearch(inputKeyword)}>
						<img src={inputSearchIcon} width={19} height={19} alt="searchIcon" />
					</button>
				</InputWrap>
				{searchMutation.data ?
					(
						// * 빈 검색 화면 (검색 결과 없을때)
						searchMutation.data.length === 0 ?
							<div style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: "calc(100vh - 135px)"
							}}>
								<img src={grinningIcon} style={{ marginBottom: 10 }} width={30} height={30} alt="grinningIcon" />
								<span style={{ color: theme.color.grayscale.C_4C5463 }}>검색 결과가 없습니다.</span>
							</div>
							:
							<MarketListLayout searchKeyword={keyword} marketData={searchMutation.data} />
					)
					:
					<div style={{ padding: "0 20px" }}>
						<Title>최근 검색어</Title>
						<Keywords>
							{recentKeywords.length === 0 ?
								<span style={{ fontSize: 14, color: theme.color.grayscale.C_4C5463 }}>최근 검색어가 없습니다.</span>
								:
								React.Children.toArray(recentKeywords.map((v, i) =>
									<li>
										<span onClick={() => {
											handleSearch(v)
											setKeyWord(v)
										}} style={{ cursor: "pointer", width: "80%" }}>{v}</span>
										<button onClick={() => removeRecentKeywords(i)}>
											<img src={lightCloseIcon} width={12} height={12} alt="lightCloseIcon" />
										</button>
									</li>
								))}
						</Keywords>
					</div>
				}
			</MainWrap>
		</Container>
	)
}

const Container = styled.section`
	padding-top: 50px;
`

const MainWrap = styled.div`
	padding-top: 40px;
`

const InputWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: calc(100% - 40px);
	height: 45px;
	border:1px solid ${theme.color.grayscale.DFE4EE};
	padding:13px 15px;
	margin: 0 20px;
	border-radius: 5px;
	input{
		width: 100%;
		padding-right: 15px;
		::placeholder{
			color:${theme.color.grayscale.B7C3D4}
		}
	}
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
			font-size:16px;
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