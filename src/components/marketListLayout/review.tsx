import { useEffect, useState } from 'react'
import styled from 'styled-components';
import theme from 'styles/theme';
import { ReviewType } from 'types/market';
import heartIcon from "assets/icon/reviewIcon/reviewHeartIcon.png"
import roundIcon from "assets/icon/reviewIcon/reviewRoundIcon.png"
import triangleIcon from "assets/icon/reviewIcon/reviewTriangleIcon.png"
import closeIcon from "assets/icon/reviewIcon/reviewCloseIcon.png"



function Review({ review }: { review: ReviewType }) {
	const [reviewIcon, setReviewIcon] = useState("")

	useEffect(() => {
		switch (review.satisfaction) {
			case "best": {
				setReviewIcon(heartIcon)
				break;
			}
			case "better": {
				setReviewIcon(roundIcon)
				break;
			}
			case "good": {
				setReviewIcon(triangleIcon)
				break;
			}
			case "bad": {
				setReviewIcon(closeIcon)
				break;
			}
			default: {
				setReviewIcon("")
				break;
			}
		}
	}, [])
	return (
		<ListMore>
			<div>
				<div style={{ display: "flex" }}>
					<img src={reviewIcon} width={15} height={15} alt="reviewIcon" />
					<div>
						<span style={{ fontSize: 12, color: theme.color.grayscale.C_4C5463 }}>
							<span style={{ fontWeight: "bold" }}>{review.author}</span> 님이
							<span style={{ color: theme.color.main }}> 처음 추천</span>하셨어요!</span>
					</div>
				</div>
				<MoreTextBox>
					<span>{review.content}</span>
				</MoreTextBox>
			</div>
		</ListMore>
	)
}

const ListMore = styled.div`
	display: flex;
	width: 100%;
	margin: 14.5px 20px 0 0px;
	padding: 20px 0px 5.5px 0px;
	border-top: 1px solid ${theme.color.grayscale.B7C3D4};
	img{
		margin-bottom: 2px;
		margin-right: 5px;
	}
	
`;

const MoreTextBox = styled.div`
	width:calc(100% - 20px) ;
	margin-left: 20px;
	margin-top: 10px;
	padding: 10px 15px;
	border-radius: 5px;
	box-shadow: 0 2px 5px 0 rgba(183, 195, 212, 0.4);
	border:1px solid ${theme.color.grayscale.DFE4EE};
	color:${theme.color.grayscale.C_4C5463};
	background-color: ${theme.color.grayscale.FFFFF};
	line-height: 1.29;
`

export default Review