import { atom } from "recoil";

// * 토큰여부에 따라서 로그인 여부 확인
export const loginState = atom<string>({
	key: "loginState",
	default: "",
});

interface modalStateProps {
	isOpen: boolean;
	content: string;
	okButton: () => void;
}

export const modalState = atom<modalStateProps>({
	key: "modalState",
	default: {
		isOpen: false,
		content: "",
		okButton: () => null
	}
})