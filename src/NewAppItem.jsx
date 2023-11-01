import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProducts, postProduct, deleteProduct, putProduct } from './apis/products';

function NewAppItem({item, productIndex}) {

    const [title, setTitle] = useState(item.title);
    const [price, setPrice] = useState(item.price);
    
    const queryClient = useQueryClient();
    

    /* update product */
    const changeProductMutation = useMutation({
        mutationKey: ['updateProduct'],
        mutationFn: async () => {
        try {
            let res = await putProduct(item.id, title, price);
            return res.data;
        } catch (err) {
            console.log(err);
        }
        },
        onSuccess() {
            alert('수정 되었습니다.');
            queryClient.invalidateQueries(['products']);
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            console.log('executed post product.');
        }
    })
    const changeProduct = () => {
        changeProductMutation.mutate();
    }


    /* remove product */
    const removeProductMutation = useMutation({
        mutationKey: ['removeProduct'],
        mutationFn: async () => {
        try {
            let res = await deleteProduct(item.id);
            return res.data;
        } catch (err) {
            console.log(err);
        }
        },
        onSuccess() {
            alert('삭제 되었습니다.');
            queryClient.invalidateQueries(['products']);
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            console.log('executed post product.');
        }
    })

    const removeProduct = () => {
        removeProductMutation.mutate();
    }
    
    return(
        <div style={{border: '1px solid #eee', padding: '20px', width: '100%', textAlign:'left'}}>
            <div><strong>{productIndex}</strong></div>
            <div><input type="text" value={title} onChange={e=>setTitle(e.target.value)} /></div>
            <div><input type="number" value={price} onChange={e=>setPrice(e.target.value)} /></div>
            <div>{item.description}</div>
            <div>
                <button onClick={changeProduct}>수정</button>
                <button onClick={removeProduct}>삭제</button>
            </div>
        </div>
    )
}

export default NewAppItem;