import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const productListState = atom({
    key: 'productListState',
    default: [],
});


export const productListSelector = selector({
    key: 'productListSelector',
    get: ({ get }) => {
        let list = get(productListState);
        console.log(list)
        return list;
    },
});