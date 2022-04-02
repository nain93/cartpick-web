import { atom, selector } from "recoil";

// * 전역 myId
export const myIdState = atom({ key: "myIDState", default: 0 });

// * api 호출 막기 위한 state
export const userDummyState = atom({ key: "userDummyState", default: -1 });

// * 리프레시를 위한 state
export const userDataRefreshState = atom({ key: "userDataRefreshState", default: 1 });

export const userDataState = selector({
	key: "userDataState",
	get: async ({ get }) => {
		if (get(userDummyState) === -1) {
			return true;
		}
		get(userDataRefreshState);
	},
	set: ({ set }) => {
		set(userDataRefreshState, (id) => id + 1);
	}
});

// ! testcode