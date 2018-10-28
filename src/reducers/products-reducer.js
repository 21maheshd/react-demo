import  { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SEARCH_PRODUCT, GET_PRODUCT_BY_ID } from '../actions/products-actions'

export default function productsReducer(state = [], { type, payload }){
    switch(type){
        case "PRODUCTS_RECEIVED":
            return payload;
        case UPDATE_PRODUCT:
        console.log('here', payload,state);
             var data1 = state.map(function(item){return (item.id === payload.id)? payload: item})
             var data = {...state,
                            data1
                          }
                          console.log(data);
                          return data1;
        case ADD_PRODUCT:
        console.log('add called', payload);
        return [
        ...state,
        payload
        ]
        case DELETE_PRODUCT:
        var d = state.filter(p => p.id !== payload.id);
            console.log('delete called', payload, d);
            return d
        case SEARCH_PRODUCT:
        console.log('search called', payload, d, state);    
        var d = payload.data.data.filter(x => x.phone.toLowerCase().includes(payload.searchText.toLowerCase()));
            return d
        case GET_PRODUCT_BY_ID: 
            var d = state.filter(x => x.id == payload);
            return d;
        default:
            return state
    }
}
