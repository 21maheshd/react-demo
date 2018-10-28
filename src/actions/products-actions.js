import axios from 'axios';
import thunk from 'redux-thunk';
export const ADD_PRODUCT = 'products:addProduct';
export const UPDATE_PRODUCT = 'products:updateProduct';
export const DELETE_PRODUCT = 'products:deleteProduct';
export const SEARCH_PRODUCT = 'products:searchProduct';
export const GET_PRODUCT_BY_ID = 'products:getProductById';

export function updateProduct(product){
    return dispatch => {
        axios.put('http://localhost:3000/products/'+ product.id, product)
            .then((response) => {
                console.log('update product response ', response);
                dispatch({
                    type: UPDATE_PRODUCT,
                    payload: product
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export function addProduct(product){
    return dispatch => {
        axios.post('http://localhost:3000/products', product)
            .then((response) => {
                console.log('add product response ', response);
                dispatch({
                    type: ADD_PRODUCT,
                    payload: product
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export function deleteProduct(product){
    return dispatch => {
        axios.delete('http://localhost:3000/products/' + product.id)
            .then((response) => {
                console.log('delete product response ', response);
                dispatch({
                    type: DELETE_PRODUCT,
                    payload: product
                })
            })
            .catch(err => {
                console.log(err);
            })
    }   
}
export function searchProduct(product){
    return dispatch => {
        axios.get('http://localhost:3000/products?q=' + product)
            .then((response) => {
                console.log('searching product response ', response);
                dispatch({
                    type: SEARCH_PRODUCT,
                    payload: { searchText : product, data : response}
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}


export function getProductByID(product){
    return dispatch => {
        dispatch({
            type: GET_PRODUCT_BY_ID,
            payload: product
        });
    }
}