import { atom } from "recoil";

// * 토큰여부에 따라서 로그인 여부 확인
export const tokenState = atom<string>({
	key: "tokenState",
	default: "",
});

interface modalStateProps {
	isOpen: boolean;
	content: string;
	okButton: () => void;
	okText: string;
}

export const modalState = atom<modalStateProps>({
	key: "modalState",
	default: {
		isOpen: false,
		content: "",
		okButton: () => null,
		okText: ""
	}
})