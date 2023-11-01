import axios from "axios";

const apiUrlProducts = 'https://api.escuelajs.co/api/v1/products';

// get all products
export const getProducts = async (offset, limit) => {
    return await axios.get(`${apiUrlProducts}?offset=${offset}&limit=${limit ? limit : ''}`)
    .then( (response) =>  response)
    .catch( (error) => error);
}

// post product
export const postProduct = async (title, price, description, categoryId) => {
    const bodyPayload = {
        title,
        price: Number(price),
        description,
        categoryId : Number(categoryId),
        images: ["https://ko.vitejs.dev/logo.svg"]
    }
    return await axios.post(`${apiUrlProducts}/`, bodyPayload)
    .then( (response) =>  response)
    .catch( (error) => error);
}

// delete product
export const deleteProduct = async (id) => {
    return await axios.delete(`${apiUrlProducts}/${id}`)
    .then( (response) =>  response)
    .catch( (error) => error);
}

// put product
export const putProduct = async (id, title, price) => {
    const bodyPayload = {
        title,
        price: Number(price),
    }
    return await axios.put(`${apiUrlProducts}/${id}`, bodyPayload)
    .then( (response) =>  response)
    .catch( (error) => error);
}