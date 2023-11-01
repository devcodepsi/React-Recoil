import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { productListState } from './store/products';
import { useEffect } from 'react';
import NewAppItem from './NewAppItem';

function NewApp() {

    const productListValue = useRecoilValue(productListState);
    
    return (
        <div style={{display: 'flex', gap: '10px', flexDirection: 'column', padding: '20px'}}>
        {productListValue ? productListValue.map( (productListItem, index) => (
            <NewAppItem key={productListItem.id} item={productListItem} productIndex={index + 1} />
        )).reverse() : <p>no data!</p> }
      </div>
    )
}

export default NewApp;