import './app.css';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProducts, postProduct, deleteProduct } from './apis/products';

import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { productListState } from './store/products';
import NewApp from './NewApp';

function App() {

  
  /* title input */
  const titleState = atom({
    key: 'titleState',
    default: '',
  });

  const [title, setTitle] = useRecoilState(titleState);
  const [price, setPrice] = useState(100);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(1);

  const titleSelect = selector({
    key: 'titleSelect',
    get: ({ get }) => {
      let title = get( titleState );
      return title + ' is string';
    },
  })
  const titleValue = useRecoilValue(titleSelect);


  /* product list */
  const [productList, setProductList] = useRecoilState(productListState);
  const queryClient = useQueryClient();

  const {isLoading, isError, data} = useQuery({
    queryKey: ['products'],
    queryFn:  async () => {
      try {
        let res = await getProducts(0);
        setProductList(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  });

  const addProductMutation = useMutation({
    mutationKey: ['addProduct'],
    mutationFn: async () => {
      try {
        let res = await postProduct(title, price, description, categoryId);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess() {
      setTitle('');
      setDescription('');
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
        console.log('executed post product.');
    }
  })

  const addProduct = () => {
    addProductMutation.mutate();
  }

  if (isLoading ) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;
  
  return (
    <>
    <div style={{display: 'flex', gap: '5px', flexDirection: 'column', padding: '20px', position: 'sticky', top: '0', left: '0', width: '100%', background: '#eee', marginBottom: '40px'}}>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title' />
      <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='price' />
      <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description' />
      <input type='text' value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder='categiryId' />
      <button onClick={addProduct}>add</button>
      <p>{titleValue}</p> 
    </div>

    <NewApp />

    </>
  )
}

export default App