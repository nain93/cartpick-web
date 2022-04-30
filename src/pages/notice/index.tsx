import notice1 from "assets/image/notice/notice1.png"
import notice2 from "assets/image/notice/notice2.png"
import notice3 from "assets/image/notice/notice3.png"
import { useRecoilState } from "recoil"
import { noticeState } from "recoil/atoms"
import styled from 'styled-components'

function Notice() {
	const [notice, setNotice] = useRecoilState(noticeState)

	const handleImgClick = (clickImg: string) => {
		setNotice({ image: clickImg, isOpen: true })
	}

	return (
		<>
			{notice.isOpen &&
				<BackDrop onClick={() => {
					setNotice({ image: "", isOpen: false })
				}} />}
			<Container>
				안녕하세요, 밀링입니다.<br />
				<br /><br />
				상황을 모르고 계신분들께 상황 설명 먼저 드리겠습니다.<br />
				<br /><br />
				밀링은 집밥을 공유하는 서비스를 운영중이었습니다. 밀링이라는 서비스와 별개로, 팀에서 사람들이 서로 추천하는 공간이 있다면 어떨까?라는 개인적인 생각으로 오픈카톡을 만들었습니다. 창업팀인것을 따로 밝히지 않고 하나의 소비자로서 닉네임을 설정하고 카톡방을 운영하였습니다. 그러다 대화에서 나온 추천 정보를 더 편리하게 볼 수 있는 홈페이지를 만들게 되었고, 오픈카톡방의 닉네임과 추천내용을 기재하였습니다.<br />
				<br /><br />
				카톡방 내 추천 분위기가 활발해지도록 지인들에게 부탁해 여러 커뮤니티에 오픈카톡방을 홍보하였습니다. 추천 정보 공유가 활발해지는 것을 보고 밀링팀을 설득해서 팀이 전체적으로 운영을 하게 되었고, 새로운 서비스를 런칭하고자 하였습니다. 해당 과정 중 수익화 여부와 상관없이 명확하게 공지를 드렸어야 했는데 해당 부분에 소홀했습니다 죄송합니다.<br />
				<br /><br />
				이후 밀링 인스타그램을 카트픽으로 변경하여 카톡방에서 나온 추천 정보를 인스타그램 게시물로 올렸습니다. 창업팀에 속해있다면 카톡방을 오픈할때 명시했어야 됐는데 카톡방 내부에 있던 많은 분들을 기만한 행동은 경솔했습니다 죄송합니다. 특히 민감한 개인 정보에 대해 많이 무지했습니다.<br />
				<br /><br />
				이에 해명할 기회가 있었는데 정확하게 해명하지 않고 계속 거짓된 회피를 하려는 방식으로 문제를 해결하는 미성숙한 대처를 한 점에 사과드립니다. 지속적으로 미숙한 팀의 대응이 상황을 악화시켜 정리 후 말씀드리기 위해 방을 폭파시켰지만 그전에 정확한 공지와 사후 조치를 말씀드리지 않은 점 죄송합니다.
				<br />
				<br /><br />
				많은 분들이 우려하시는 개인정보데이터가 공유된 해당 사이트는 운영을 자체를 중단하였고 데이터 또한 영구적으로 말소했습니다 (아래 사진 첨부). 오픈카톡에서 나온 내용은 재사용하지 않겠습니다. 마케팅에 문제가 되었던 카트픽 sns와 밀링 sns 계정 모두 삭제 처리하였습니다. 홍보했던 모든 커뮤니티의 경우 카트픽 링크를 클릭하시면 사측 사과문을 확인하실 수 있게 조치하였습니다. <br />
				<br /><br />
				또한 지원사업이나 투자는 모두 2022년 2월 전에 받은것으로, 오픈카톡과 아무 관계가 없고, 투자나 지원사업과 관련해 이 데이터를 쓴적도 없습니다.
				<br /><br />
				이번 일을 통해 팀이 많이 부족했고 이번 일에 통해 사업에 대해 무게를 많이 느끼게 되었습니다.<br />
				<br />
				첫 창업인만큼 좋은 서비스를 만들어 보고 싶다는 욕심 때문에 톡방분들에게 많은 실수와 미숙한 점 보여드린 모습 진심으로 사과드립니다. 이후 이런 실수 없이 정직하고 절차에 맞게 서비스를 개발하도록 하겠습니다.<br />
				<br /><br />
				다시 한번 진심으로 사과드립니다.
				밀링팀 드림
				<NoticeImg>
					<img onClick={() => handleImgClick(notice1)} src={notice1} alt="notice" width={"30%"} />
					<img onClick={() => handleImgClick(notice2)} src={notice2} alt="notice" width={"30%"} />
					<img onClick={() => handleImgClick(notice3)} src={notice3} alt="notice" width={"30%"} />
				</NoticeImg>
			</Container>
		</>
	)
}

const BackDrop = styled.div`
	position: absolute;
	z-index: 1;
	top:0;
	left:0;
	width: 100%;
	height: 120vh;
	background-color: rgba(0,0,0,0.4);
`

const Container = styled.section`
	padding:20px;
	line-height: 1.2;
	position: relative;
`

const NoticeImg = styled.div`
	display: flex;
	margin-top: 20px;
	img{
		border:1px solid black;
		margin-right: 10px;
	}
`

export default Notice