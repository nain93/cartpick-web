import Review from 'components/marketListLayout/review'
import React, { useEffect, useRef } from 'react'

import heartIcon from "assets/icon/reviewIcon/reviewHeartIcon.png"
import roundIcon from "assets/icon/reviewIcon/reviewRoundIcon.png"
import triangleIcon from "assets/icon/reviewIcon/reviewTriangleIcon.png"
import closeIcon from "assets/icon/reviewIcon/reviewCloseIcon.png"
import commentIcon from "assets/icon/reviewIcon/reviewCommentIcon.png"
import shareIcon from "assets/icon/shareIcon.png"

import styled from 'styled-components'
import theme from 'styles/theme'
import downIcon from "assets/icon/downIcon.png"
import { MarketProductType } from 'types/market'
import { useLocation, useNavigate } from 'react-router-dom'

interface ListItemPropType {
	list: MarketProductType;
	listIndex: number;
	selectedListIndex: number
	setSelectedListIndex: (selectIndex: number) => void;
}

function ListItem({ list, listIndex, selectedListIndex, setSelectedListIndex }: ListItemPropType) {
	const url = window.location.href
	const location = useLocation()
	const navigate = useNavigate()
	const listRef = useRef<HTMLDivElement>(null)

	// * 리뷰 만족도별 아이콘처리
	const handleFilterIcon = (satisfaction: string) => {
		switch (satisfaction) {
			case "best": {
				return heartIcon
			}
			case "better": {
				return roundIcon
			}
			case "good": {
				return triangleIcon
			}
			case "bad": {
				return closeIcon
			}
			case "comment": {
				return commentIcon
			}
			default: {
				return ""
			}
		}
	}

	const handleShareItem = (marketItem: MarketProductType) => {
		//@ts-ignore
		const { Kakao } = window
		Kakao.Link.sendDefault({
			objectType: 'feed', // 메시지 형식 : 피드 타입
			content: {
				title: marketItem.market,
				description: marketItem.name,
				imageUrl: '이미지 주소', // 메인으로 보여질 이미지 주소
				link: {
					webUrl: url,
					mobileWebUrl: url,
				},
			},
			itemContent: {
				profileText: "카트픽",
				items: [
					{
						item: marketItem.reviews[0].author,
						itemOp: marketItem.reviews[0].content
					},
					{
						item: marketItem.reviews[1]?.author ? marketItem.reviews[1].author : "",
						itemOp: marketItem.reviews[1]?.content ? marketItem.reviews[1].content : ""
					},
					{
						item: marketItem.reviews[2]?.author ? marketItem.reviews[2].author : "",
						itemOp: marketItem.reviews[2]?.content ? marketItem.reviews[2].content : ""
					}
				]
			},
			buttons: [
				{
					title: '웹 사이트로 이동', // 버튼 이름
					link: {
						webUrl: `${url}?id=${list.id}`,
						mobileWebUrl: `${url}?id=${list.id}`,
					},
				},
			],
		});
	}
	// * 해당 아이템으로 포커싱
	useEffect(() => {
		if (list.id === Number(location.search.replace("?id=", ""))) {
			setSelectedListIndex(listIndex)
			listRef.current?.scrollIntoView({ behavior: 'smooth', block: "center" })
			setTimeout(() => {
				navigate(location.pathname, { replace: true })
			}, 500)
		}
	}, [selectedListIndex, list.id])

	return (
		<Container
			style={{
				marginLeft: selectedListIndex === listIndex ? 0 : 20,
				paddingLeft: selectedListIndex === listIndex ? 20 : 0,
				backgroundColor: selectedListIndex === listIndex ? theme.color.grayscale.F5F5F5 : theme.color.grayscale.FFFFF,
			}}
		>
			<div style={{ display: "flex", flexDirection: "column" }}
				ref={listRef}
				onClick={() => {
					if (list.reviewCount === 0) {
						// * 리뷰 없으면 열리는 ui 비활성화 처리
						return
					}
					if (selectedListIndex === listIndex) {
						setSelectedListIndex(-1);
					} else {
						setSelectedListIndex(listIndex);
					}
				}}>
				<div style={{ display: "flex", alignSelf: "flex-start" }}>
					{list.reviews.length > 0 &&
						<img style={{ marginRight: 5, marginBottom: 3 }} src={handleFilterIcon(list.reviews[0]?.satisfaction)}
							width={15} height={15} alt="reviewIcon" />
					}
					<div
						style={{
							fontSize: 16,
							lineHeight: 1.5,
							color: theme.color.grayscale.C_4C5463,
							fontWeight: selectedListIndex === listIndex ? 'bold' : 'normal',
						}}
					>
						{list.name}
						<Tag>{list.reviewCount}</Tag>
					</div>
					<UpDownIcon src={downIcon}
						style={{ transform: selectedListIndex === listIndex ? "rotate(180deg)" : "", objectFit: "cover" }}
						width={20} height={20} alt="updownIcon" />
				</div>
				<div style={{
					// overflow: "hidden",
					// textOverflow: "ellipsis",
					// whiteSpace: "nowrap",
					lineHeight: 1.1,
					textAlign: "left", width: "100%", padding: "0 20px",
					color: theme.color.grayscale.B7C3D4, marginTop: 5
				}}>
					<span>{list.reviews[0].content}</span>
				</div>
			</div>
			{
				(selectedListIndex === listIndex) &&
				React.Children.toArray(list.reviews.map((review, reviewIndex) =>
					<Review isFirstReview={reviewIndex === 0} review={review} reviewIndex={reviewIndex} />
				))
			}{
				selectedListIndex === listIndex &&
				<ShareButton top={listRef.current?.offsetHeight} onClick={() => handleShareItem(list)}>
					<img width={20} height={20} src={shareIcon} alt="shareIcon" />
				</ShareButton>
			}
		</Container>
	)
}

const Container = styled.section`
	cursor: pointer;
	position: relative;
	min-height: 53px;
	border-bottom: 1px solid ${theme.color.grayscale.F2F3F6};
	display: flex;
	align-items: center;
	>div:first-child{
		padding: 14.5px 0;
		display: flex;
		align-items: center;
		width: calc(100% - 40px);
		word-break: break-word;
		padding-right: 20px;
	}
	flex-wrap: wrap;
`

const UpDownIcon = styled.img`
	position: absolute;
	right: 20px;
`

const ShareButton = styled.button<{ top?: number }>`
	position: absolute;
	border-radius: 5px;
	border:1px solid ${theme.color.grayscale.DFE4EE};
	background-color: ${theme.color.grayscale.FFFFF};
	top:${props => `calc(${props.top}px + 10px)`};
	right: 20px; 
	margin-left: 5px;
	img{
		padding-top: 5px;
		object-fit: cover;
	}
`

const Tag = styled.span`
	height: 20px;
	border-radius: 10px;
	padding: 2.5px 10px 0 10px;
	display: inline-flex;
	align-items: center;
	border:1px solid ${theme.color.grayscale.DFE4EE};
	margin-left: 5px;
	font-size: 12px;
	font-weight:500;
`;

export default ListItem